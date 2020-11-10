# Stripe Terminal Backend

This is a simple Fastify webapp that you can use to run the Stripe Terminal example apps. It is the [example-terminal-backend](https://github.com/stripe/example-terminal-backend) app from Stripe translated to node.

## Running the app

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

| SDK | Example App |
|  :---  |  :---  |
| iOS | https://github.com/stripe/stripe-terminal-ios |
| JavaScript | https://github.com/stripe/stripe-terminal-js-demo |
| Android | https://github.com/stripe/stripe-terminal-android |

⚠️ **Note that this backend is intended for example purposes only**. Because endpoints are not authenticated, you should not use this backend in production.
