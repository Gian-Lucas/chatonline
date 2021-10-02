const { httpServer } = require("./http");
require("./websocket");

httpServer.listen(3000, () => console.log("running..."));
