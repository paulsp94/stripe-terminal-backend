const {env} = process;
const apiKey =
  env["STRIPE_ENV"] === "production"
    ? env["STRIPE_SECRET_KEY"]
    : env["STRIPE_TEST_SECRET_KEY"];

const stripe = require("stripe")(apiKey);

const {
  validateApiKey,
  lookupOrCreateExampleCustomer,
} = require("./utils");

exports.preHandler = (request, reply, done) => {
  const validationError = validateApiKey(apiKey);
  if (validationError) {
    reply.code(400).send(validationError);
  }
  done();
};

exports.registerReaderController = async (request, reply) => {
  const {registrationCode, label} = request.body;
  const reader = await stripe.terminal.readers.create({
    registration_code: registrationCode,
    label: label,
  });
  console.info(`Reader registered: ${reader.id}`);
  return reader.toJSON();
};

exports.connectionTokenController = async (request, reply) => {
  const token = await stripe.terminal.connectionTokens.create();
  return {secret: token.secret};
};

exports.createPaymentIntentController = async (request, reply) => {
  const {amount, description} = request.body;
  const paymentIntent = await stripe.paymentIntents.create({
    payment_method_types: ["card_present"],
    capture_method: "manual",
    amount,
    currency: "eur",
    description,
  });
  console.info(`PaymentIntent successfully created: ${payment_intent.id}`);
  return {intent: paymentIntent.id, secret: paymentIntent.client_secret};
};

exports.capturePaymentIntentController = async (request, reply) => {
  const {payment_intent_id} = request.body;
  const paymentIntent = await stripe.paymentIntents.capture(
    payment_intent_id
  );
  console.info(`PaymentIntent successfully created: ${payment_intent_id}`);
  return {intent: paymentIntent.id, secret: paymentIntent.client_secret};
};

exports.attachPaymentMethodToCustomerController = async (request, reply) => {
  const {payment_method_id} = request.body;
  const customer = lookupOrCreateExampleCustomer();
  const paymentIntent = await stripe.paymentMethods.attach(
    payment_method_id,
    {
      customer: customer.id,
    }
  );
  console.info(`"Attached PaymentMethod to Customer: ${customer.id}`);
  return paymentIntent.toJSON();
};
