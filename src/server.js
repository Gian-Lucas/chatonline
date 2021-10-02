const { httpServer } = require("./http");
require("./websocket");

httpServer.listen(process.env.PORT, () => console.log("running..."));
