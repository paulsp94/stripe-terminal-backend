const fastify = require("fastify")({logger: true});
fastify.register(require("fastify-formbody"));

const dotenv = require("dotenv");
dotenv.config();

const {stripeRoutes} = require("./stripe");

fastify.register(stripeRoutes, {prefix: "/stripe"})

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
