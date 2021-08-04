const express = require('express');

/**Utilit�rios para trabalhar com caminhos de arquivos e diret�rios */

const dotenv = require("dotenv-safe");
const path = require('path');
const cors = require('cors');

/**Defini��o da porta para START da API */

const PORT = process.env.PORT || 5000;

/**Iniciando o express */

const applicationServer = express();

/**Iniciando a API */

dotenv.config();

applicationServer.use(express.static(path.join(__dirname, 'public')));
applicationServer.set('views', path.join(__dirname, 'views'));
applicationServer.set('view engine', 'ejs');
applicationServer.use(cors());

applicationServer.use(express.json());
applicationServer.use(express.urlencoded({ extended: true }));

/**Routes */

const UserRoutes = require('./routes/usuario_routes');
const AuthenticationRoutes = require('./routes/authenticarion_routes');

applicationServer.use(AuthenticationRoutes);
applicationServer.use(UserRoutes);

/**Start da API */

applicationServer.listen(PORT, () => console.log(`Listening on ${ PORT }`));