const {schema, controller} = require('.');

module.exports = (fastify, opts, done) => {
  fastify.addHook("preHandler", controller.preHandler);

  // This endpoint registers a WisePay 3 reader to your Stripe account.
  fastify.post(
    "/register_readers",
    schema.registerReaderSchema,
    controller.registerReaderController
  );

  //  This endpoint creates a ConnectionToken, which gives the SDK permission
  //  to use a reader with your Stripe account.
  fastify.post(
    "/connection_token",
    schema.connectionTokenSchema,
    controller.connectionTokenController
  );

  // This endpoint creates a PaymentIntent.
  fastify.post(
    "/create_payment_intent",
    schema.createPaymentIntentSchema,
    controller.createPaymentIntentController
  );

  // This endpoint captures a PaymentIntent.
  fastify.post(
    "/capture_payment_intent",
    schema.capturePaymentIntentSchema,
    controller.capturePaymentIntentController
  );

  // This endpoint attaches a PaymentMethod to a Customer.
  fastify.post(
    "/attach_payment_method_to_customer",
    schema.attachPaymentMethodToCustomerSchema,
    controller.attachPaymentMethodToCustomerController
  );

  done();
}
