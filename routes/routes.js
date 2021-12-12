const { Router } = require('express');
const router = Router();
const path = require('path')
const messageHandler = require('../components/handlers/messageHandlers')

module.exports = (app)=> {

  app.use("/api", router);

  router.get('/', messageHandler.getMessagesForm)
}