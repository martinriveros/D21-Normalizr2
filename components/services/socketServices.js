const messageHandlers = require('../handlers/messageHandlers')

module.exports = (io) =>{

    io.on('connection', async (socket) => {
        console.log('conexion websocket establecida')

        let response = await messageHandlers.readMessages()
        io.sockets.emit('messageNotification', response)
        
        socket.on('messageNotification', async socket => {
          await messageHandlers.writeMessages(socket)
          let response = await messageHandlers.readMessages()
          io.sockets.emit('messageNotification', response)
        })
      })
}


