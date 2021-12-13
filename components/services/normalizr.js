let {schema, normalize} = require ('normalizr')
let compression = require ('../../utils/compression')

module.exports = (denormalizedData) =>{

let autorSchema = new schema.Entity('author', {}, {idAttribute:'id_author'})

let mensajeSchema = new schema.Entity('mensaje',{author: autorSchema}, {idAttribute:'_id'})

let mensajesSchema = new schema.Entity('mensajes',{mensajes: [mensajeSchema]}, {idAttribute:'_id'})


let normalizedData = normalize({_id:'mensajesNormalizados', denormalizedData}, mensajesSchema)

let compressedPercentage = compression(normalizedData, denormalizedData)
return {normalizedData, denormalizedData, mensajesSchema, compressedPercentage } // devuelvo la data normalizada, desnormalizada y el schema para enviar al front via socket

}