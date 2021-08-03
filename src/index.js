require("dotenv-safe").config();

const express = require('express')
const routes = require('./routes');

/**Utilit�rios para trabalhar com caminhos de arquivos e diret�rios */

const path = require('path')

/**Defini��o da porta para START da API */

const PORT = process.env.PORT || 5000

/**Iniciando o express */

const applicationServer = express()

/**Iniciando a API */

applicationServer.use(express.static(path.join(__dirname, 'public')))
applicationServer.set('views', path.join(__dirname, 'views'))
applicationServer.set('view engine', 'ejs')

applicationServer.use(express.json());
applicationServer.use(express.urlencoded({ extended: true }));
applicationServer.use(routes);


/**Start da API */

applicationServer.listen(PORT, () => console.log(`Listening on ${ PORT }`))