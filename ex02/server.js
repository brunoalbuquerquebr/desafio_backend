require('dotenv').config()
const config = require('./src/config')
const app = require('./src/app')

app.listen(config.app.port, (err) => {
    if(err) {
        return console.log('erro');
    }
    console.log(`Servidor Iniciado em http://localhost:${config.app.port}`)
});