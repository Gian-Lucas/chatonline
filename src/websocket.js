const { io } = require("./http");

const users = Array(0);
const messages = Array(0);

io.on("connection", (socket) => {
  socket.on("select_room", (data, callback) => {
    socket.join(data.room);

    const userInRoom = users.find(
      (user) => user.username === data.username && user.room === data.room
    );

    if (userInRoom) {
      userInRoom.socketid = socket.id;
    } else {
      console.log(data.username + " entrou!");
      users.push({
        username: data.username,
        room: data.room,
        colorUsername: data.colorUsername,
        socketid: socket.id,
      });
      console.log(users);
      const usersOfRoom = users.filter((user) => user.room === data.room);
      io.to(data.room).emit("users", usersOfRoom);
    }

    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom);
  });

  socket.on("message", (data) => {
    const message = {
      username: data.username,
      room: data.room,
      colorUsername: data.colorUsername,
      text: data.message,
      hours: getDate(),
      socketId: socket.id,
    };

    messages.push(message);

    io.to(data.room).emit("message", message);
  });

  socket.on("disconnect", () => {
    const userDisconnected = users.find((user) => user.socketid === socket.id);

    console.log(userDisconnected.username + " saiu!");

    for (let i = 0; i < users.length; i++) {
      if (users[i].socketid === userDisconnected.socketid) {
        users.splice(i, 1);

        const usersOfRoom = users.filter(
          (user) => user.room === userDisconnected.room
        );

        io.to(userDisconnected.room).emit("users", usersOfRoom);
      }
    }

    console.log(users);
  });
});

function getMessagesRoom(room) {
  const messagesRoom = messages.filter((message) => message.room === room);

  return messagesRoom;
}

function getDate() {
  const dateBrazil = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
  const hours = dateBrazil[11] + dateBrazil[12];
  const minutes = dateBrazil[14] + dateBrazil[15];
  const hoursAndMinutes = `${hours}:${minutes}`;

  return hoursAndMinutes;
}
