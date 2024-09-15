const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  fecha: { type: Date },
  servicio: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estado: {
    type: String,
    enum: ["reservado", "cancelado"],
    default: "reservado",
  }
});

const ReservationModel = mongoose.model('Reservation', reservationSchema);
module.exports = ReservationModel;



