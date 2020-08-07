const ServiceBroker = require("../src/service-broker");

const broker = new ServiceBroker({
});

broker.createService({
	name: "test",
	events: {
		async "some.thing"(ctx) {
			this.logger.info("  ---- event triggered", ctx.eventName);
			await this.Promise.delay(1000);
			this.logger.info("  ---- event finished", ctx.eventName);
		}
	}
});

broker.start().then(async () => {
	broker.repl();

	broker.logger.info("Emitting event");
	await broker.broadcast("some.thing");
	broker.logger.info("Emitted event");
});
