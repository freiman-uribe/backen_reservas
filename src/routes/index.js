const auth = require('../controllers/auth.controller');
const service = require("../controllers/service.controller");
const reservation = require("../controllers/reservation.controller");

const routes = function (server) { 
    server.use('/auth', auth);
    server.use('/service', service);
    server.use("/reservation", reservation);
}

module.exports = routes;