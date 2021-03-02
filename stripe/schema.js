exports.registerReaderSchema = {
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
};

exports.connectionTokenSchema = {
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
};

exports.createPaymentIntentSchema = {
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
};

exports.capturePaymentIntentSchema = {
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
};

exports.attachPaymentMethodToCustomerSchema = {
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
};
