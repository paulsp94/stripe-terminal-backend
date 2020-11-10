# Stripe Terminal Backend

This is a simple Fastify webapp that you can use to run the Stripe Terminal example apps. It is the [example-terminal-backend](https://github.com/stripe/example-terminal-backend) app from Stripe translated to node.

1. [Run it on a free Heroku account](#running-on-heroku)
2. [Run it locally on your machine](#running-locally-on-your-machine)

ℹ️ You also need to obtain your Stripe **secret, test mode** API Key, available in the [Dashboard](https://dashboard.stripe.com/account/apikeys). Note that you must use your secret key, not your publishable key, to set up the backend. For more information on the differences between **secret** and publishable keys, see [API Keys](https://stripe.com/docs/keys). For more information on **test mode**, see [Test and live modes](https://stripe.com/docs/keys#test-live-modes).

## Running the app

### Running on Heroku

1. Set up a free [Heroku account](https://signup.heroku.com).
2. Click the button below to deploy the example backend. You'll be prompted to enter a name for the Heroku application as well as your Stripe API key.
3. Go to the [next steps](#next-steps) in this README for how to use this app

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Running locally on your machine

If you prefer running the backend locally, ensure you have Node installed.

Clone down this repo to your computer, and then follow the steps below:

1. Create a file named `.env` within the newly cloned repo directory and add the following line:

```
STRIPE_TEST_SECRET_KEY={YOUR_API_KEY}
```

2. In your terminal, run `yarn` or `npm install`
3. Run `yarn start` or `npm start`
4. The example backend should now be running at `http://localhost:3000`
5. Go to the [next steps](#next-steps) in this README for how to use this app

---

## Next steps

Next, navigate to one of our example apps. Follow the instructions in the README to set up and run the app. You'll provide the URL of the example backend you just deployed.

| SDK        | Example App                                       |
| :--------- | :------------------------------------------------ |
| iOS        | https://github.com/stripe/stripe-terminal-ios     |
| JavaScript | https://github.com/stripe/stripe-terminal-js-demo |
| Android    | https://github.com/stripe/stripe-terminal-android |

⚠️ **Note that this backend is intended for example purposes only**. Because endpoints are not authenticated, you should not use this backend in production.
