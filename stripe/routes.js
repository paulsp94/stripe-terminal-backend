const {stripeSchema, stripeController} = require('.');

module.exports = (fastify, opts, done) => {
  fastify.addHook("preHandler", stripeController.preHandler);

  // This endpoint registers a WisePay 3 reader to your Stripe account.
  fastify.post(
    "/register_readers",
    stripeSchema.registerReaderSchema,
    stripeController.registerReaderController
  );

  //  This endpoint creates a ConnectionToken, which gives the SDK permission
  //  to use a reader with your Stripe account.
  fastify.post(
    "/connection_token",
    stripeSchema.connectionTokenSchema,
    stripeController.connectionTokenController
  );

  // This endpoint creates a PaymentIntent.
  fastify.post(
    "/create_payment_intent",
    stripeSchema.createPaymentIntentSchema,
    stripeController.createPaymentIntentController
  );

  // This endpoint captures a PaymentIntent.
  fastify.post(
    "/capture_payment_intent",
    stripeSchema.capturePaymentIntentSchema,
    stripeController.capturePaymentIntentController
  );

  // This endpoint attaches a PaymentMethod to a Customer.
  fastify.post(
    "/attach_payment_method_to_customer",
    stripeSchema.attachPaymentMethodToCustomerSchema,
    stripeController.attachPaymentMethodToCustomerController
  );

  done();
}
