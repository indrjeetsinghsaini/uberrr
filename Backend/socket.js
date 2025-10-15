const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL || '*', // Secure for production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // User or captain joins the socket connection
    socket.on('join', async (data) => {
      try {
        const { userId, userType } = data;

        if (!userId || !userType) {
          return socket.emit('error', { message: 'Invalid join data' });
        }

        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }

        socket.emit('joined', { message: 'Joined successfully', socketId: socket.id });
        console.log(`Socket joined: ${socket.id} as ${userType}`);
      } catch (err) {
        console.error('Join event error:', err.message);
      }
    });

    // Captain updates live location
    socket.on('update-location-captain', async (data) => {
      try {
        const { userId, location } = data;

        if (!userId || !location || !location.lat || !location.lng) {
          return socket.emit('error', { message: 'Invalid location data' });
        }

        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.lat,
            lng: location.lng,
          },
        });

        console.log(`Updated location for captain ${userId}`);
      } catch (err) {
        console.error('Update location error:', err.message);
      }
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// Function to send data to a specific socket
const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io not initialized.');
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
