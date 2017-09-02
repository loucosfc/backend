const exitAllRooms = (socket) => {
  Object.keys(socket.rooms).forEach((v) => {
    const room = socket.rooms[v];
    socket.leave(room);
  });
};

module.exports = exitAllRooms;
