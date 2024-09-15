const authMiddleware = require('../adapters/inbound/authMiddleware')
const auth = require('../controllers/auth.controller');
const service = require("../controllers/service.controller");
const reservation = require("../controllers/reservation.controller");

const routes = function (server) { 
    server.use('/auth', auth);
    server.use("/service", authMiddleware, service);
    server.use("/reservation", authMiddleware, reservation);
}

module.exports = routes;