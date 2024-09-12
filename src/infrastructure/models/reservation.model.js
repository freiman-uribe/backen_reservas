const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  fecha: { type: Date },
  servicio: { type: String, required: true },
  cliente: { type: String, required: true },
  estado: {
    type: String,
    enum: ["reservado", "cancelado"],
    default: "reservado",
  },
});

const ReservationModel = mongoose.model('Reservation', reservationSchema);
module.exports = ReservationModel;



