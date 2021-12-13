const socket = io();
let form = document.querySelector('#messageForm')
form.addEventListener("submit", messageSend);

let injectedMessages = document.querySelector('#injectedMessages')
let compression = document.querySelector('.compression')

function messageSend(e) {
  e.preventDefault()
  let now = new Date()
  let messageNotification = {

    author: {
    id_author: e.srcElement[0].value,
    nombre: e.srcElement[1].value,
    apellido: e.srcElement[2].value,
    edad: e.srcElement[3].value,
    alias: e.srcElement[4].value,
    avatar: e.srcElement[5].value
  },
    text: e.srcElement[6].value,
    moment: { 
      day:now.getDate(),
      month:now.getMonth()+1,
      year:now.getFullYear(),
      hour:now.getHours(),
      minute:now.getMinutes()+1,
      second:now.getSeconds()+1
    }
  }
  socket.emit('messageNotification', messageNotification)
};

socket.on('messageNotification', socket => { // en el socket vienen tres objetos: "data" normalizada desde el back, el "mensajesSchema" para desnormalizar y "dataSinNormalizar" para poder mostrar la lista, porque no me funciona la desnormalizacion

      
      // como no me funciona la desnormalizacion y para poder mostrar los datos originales sin normalizar, hago esto:
      
      let {normalizedData, denormalizedData, mensajesSchema, compressedPercentage} = {...socket}

      // let denormalizedData = normalizr.denormalize(socket.data.result, socket.mensajesSchema, socket.data.entities)
            
      let messageList=''
      denormalizedData.forEach(message=>{
          messageList += `<span class="author">${message.author.id_author}</span><span class="moment">${message.moment.day}/${message.moment.month}/${message.moment.year}--${message.moment.hour}:${message.moment.minute}:${message.moment.second}</span> <span class="text"> ${message.text}</span> <img src="${message.author.avatar}" alt="missing" width="30" height="30"/></br>
      `
  })
  injectedMessages.innerHTML = messageList
  compression.innerHTML = `${Math.floor(compressedPercentage,2)} %`


})

