exports.validateApiKey = (apiKey) => {
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

// Looks up or creates a Customer on your stripe account
// with email "example@test.com".
exports.lookupOrCreateExampleCustomer = async () => {
  const customerEmail = "example@test.com";
  const customerList = await stripe.customers.list({
    email: customerEmail,
    limit: 1,
  });
  if (customerList.length == 1) {
    return customerList[0];
  } else {
    return await stripe.customers.create({email: customerEmail});
  }
};
