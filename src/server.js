const { httpServer } = require("./http");
require("./websocket");

httpServer.listen(process.env.PORT || 3000, () => console.log("running..."));
