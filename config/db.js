let mongoose = require('mongoose')
let {Schema} = mongoose


const CONNECT = process.env.DB_URL || process.env.MONGO_DB_URI

let connection = null;

(async ()=>{
    try {
        console.log(`Conexion de mongo creada en ${CONNECT}`)
        connection = await mongoose.connect(`${CONNECT}`)
    } catch (error) {
        console.log('error al conectarse a Mongo')
        
    }
})()

const mensajesSchema = new Schema({

    author: {
            id_author: String,
            nombre: String,
            apellido: String,
            edad: Number,
            alias: String,
            avatar: String
            },
    text:   String,
    moment: {}       
})

const messagesModel = mongoose.model(process.env.T_NAME_MENSAJES, mensajesSchema)
module.exports = { messagesModel }