const util = require('util')

module.exports = (objeto)=>{
        console.log(util.inspect(objeto, false, 12, true))
}
