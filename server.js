const fastify = require("fastify")({ logger: true });
fastify.register(require("fastify-formbody"));

const dotenv = require("dotenv");
dotenv.config();

const { env } = process;
const apiKey =
  env["STRIPE_ENV"] === "production"
    ? env["STRIPE_SECRET_KEY"]
    : env["STRIPE_TEST_SECRET_KEY"];

const stripe = require("stripe")(apiKey);

const validateApiKey = () => {
  if (!apiKey) {
    return "Error: you provided an empty secret key. Please provide your test mode secret key. For more information, see https://stripe.com/docs/keys";
  }
  if (apiKey.startsWith("pk")) {
    return "Error: you used a publishable key to set up the example backend. Please use your test mode secret key. For more information, see https://stripe.com/docs/keys";
  }
  if (apiKey.startsWith("sk_live")) {
    return "Error: you used a live mode secret key to set up the example backend. Please use your test mode secret key. For more information, see https://stripe.com/docs/keys#test-live-modes";
  }
  return null;
};

// This endpoint registers a WisePay 3 reader to your Stripe account.
fastify.route({
  method: "POST",
  url: "/register_readers",
  schema: {
    body: {
      registrationCode: { type: "string" },
      label: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          id: { type: "string" },
          object: { type: "string" },
          device_sw_version: { type: "string" },
          device_type: { type: "string" },
          ip_address: { type: "string" },
          label: { type: "string" },
          livemode: { type: "boolean" },
          location: { type: "string" },
          metadata: { type: "object" },
          serial_number: { type: "string" },
          status: { type: "string" },
          registration_code: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const validationError = validateApiKey();
    if (validationError) {
      reply.code(400).send(validationError);
    }
    const { registrationCode, label } = request.body;
    const reader = await stripe.terminal.readers.create({
      registration_code: registrationCode,
      label: label,
    });
    console.info(`Reader registered: ${reader.id}`);
    return reader.toJSON();
  },
});

//  This endpoint creates a ConnectionToken, which gives the SDK permission
//  to use a reader with your Stripe account.
fastify.route({
  method: "POST",
  url: "/connection_token",
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          secret: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const validationError = validateApiKey();
    if (validationError) {
      reply.code(400).send(validationError);
    }
    const token = await stripe.terminal.connectionTokens.create();
    return { secret: token.secret };
  },
});

// This endpoint creates a PaymentIntent.
fastify.route({
  method: "POST",
  url: "/create_payment_intent",
  schema: {
    body: {
      amount: { type: "integer" },
      description: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          intent: { type: "string" },
          secret: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const validationError = validateApiKey();
    if (validationError) {
      reply.code(400).send(validationError);
    }
    const { amount, description } = request.body;
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method_types: ["card_present"],
      capture_method: "manual",
      amount,
      currency: "eur",
      description,
    });
    console.info(`PaymentIntent successfully created: ${payment_intent.id}`);
    return { intent: paymentIntent.id, secret: paymentIntent.client_secret };
  },
});

// This endpoint captures a PaymentIntent.
fastify.route({
  method: "POST",
  url: "/capture_payment_intent",
  schema: {
    body: {
      payment_intent_id: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          intent: { type: "string" },
          secret: { type: "string" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const validationError = validateApiKey();
    if (validationError) {
      reply.code(400).send(validationError);
    }
    const { payment_intent_id } = request.body;
    const paymentIntent = await stripe.paymentIntents.capture(
      payment_intent_id
    );
    console.info(`PaymentIntent successfully created: ${payment_intent_id}`);
    return { intent: paymentIntent.id, secret: paymentIntent.client_secret };
  },
});

// Looks up or creates a Customer on your stripe account
// with email "example@test.com".
const lookupOrCreateExampleCustomer = async () => {
  const customerEmail = "example@test.com";
  customerList = await stripe.customers.list({
    email: customerEmail,
    limit: 1,
  });
  if (customerList.length == 1) {
    return customerList[0];
  } else {
    return await stripe.customers.create({ email: customerEmail });
  }
};

// This endpoint attaches a PaymentMethod to a Customer.
fastify.route({
  method: "POST",
  url: "/attach_payment_method_to_customer",
  schema: {
    body: {
      payment_method_id: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties: {
          intent: { type: "object" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const validationError = validateApiKey();
    if (validationError) {
      reply.code(400).send(validationError);
    }
    const { payment_method_id } = request.body;
    const customer = lookupOrCreateExampleCustomer();
    const paymentIntent = await stripe.paymentMethods.attach(
      payment_method_id,
      {
        customer: customer.id,
      }
    );
    console.info(`"Attached PaymentMethod to Customer: ${customer.id}`);
    return paymentIntent.toJSON();
  },
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
