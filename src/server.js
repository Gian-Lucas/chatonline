const { httpServer } = require("./http");
require("./websocket");

// httpServer.listen(process.env.PORT, () => console.log("running..."));
httpServer.listen(3000, () => console.log("running..."));
