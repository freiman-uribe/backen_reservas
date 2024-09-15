const ReservationRepository = require('../../domain/repository/reservation.repository');
const ReservationModel = require('../../infrastructure/models/reservation.model');
const ReservationEntity = require("../../domain/entity/reservation.entity");

class MongoReservationRepository extends ReservationRepository {
  async create(serviceData) {
    const reservation = new ReservationEntity({
      servicio: serviceData.servicio,
      cliente: serviceData.cliente,
    });
    const newSevice = new ReservationModel(reservation);
    return await newSevice.save();
  }

  async findAll() {
    return await ReservationModel.find()
      .populate("servicio", ["nombre"])
      .populate("cliente", ["nombre"]);
  }

  async findAllActive() {
    return await ReservationModel.find({ estado: "activo" });
  }

  async findById(id) {
    const reservationId = new ReservationEntity({ id });
    return await ReservationModel.findById(reservationId.id);
  }

  async update(reservationId, serviceData) {
    const reservation = new ReservationEntity({
      id: reservationId,
      servicio: serviceData.servicio,
      cliente: serviceData.cliente,
    });

    const { id, servicio, cliente } = reservation;

    return await ReservationModel.findByIdAndUpdate(
      id,
      { servicio, cliente },
      {
        new: true,
      }
    );
  }

  async delete(reservationId) {
    const reservation = new ReservationEntity({
      id: reservationId,
      estado: "cancelado",
    });

    const { id, estado } = reservation;

    return await ReservationModel.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
  }
}

module.exports = MongoReservationRepository;
