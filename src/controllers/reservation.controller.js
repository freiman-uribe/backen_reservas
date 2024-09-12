const express = require("express");
const ReservationService = require("../application/reservation");
const MongoReservationRepository = require("../adapters/outbound/reservation.repository");
const responseHandler = require("../utils/responseHandler");

const router = express.Router();
const reservationRepository = new MongoReservationRepository();
const reservationService = new ReservationService(reservationRepository);

router.get("/", async (req, res) => {
  try {
    const reservation = await reservationService.getAllItems();
    await responseHandler.success(req, res, reservation, 201);
  } catch (error) {
    await responseHandler.error(req, res, "Error al obtener servicios", 500);
  }
});

router.post("/", async (req, res) => {
  try {
       const { body } = req;
        const newReservation = await reservationService.createItem(body);
        await responseHandler.error(req, res, newReservation, 201);
  } catch (error) {
    await responseHandler.error(req, res, "Error al crear el servicio", 500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationService.getItem(id);
    await responseHandler.success(req, res, reservation, 201);
  } catch (error) {
    await responseHandler.error(req, res, "Error al obtener servicios", 500);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { servicio, cliente } = req.body;
    const reservation = await reservationService.updateItem(id, {
      servicio,
      cliente,
    });
    if (!reservation) {
        return await responseHandler.error(req, res, 'Servicio no encontrado', 500);
    }
    await responseHandler.success(req, res, reservation, 201);
  } catch (error) {
    console.log('🚀 ~ router.put ~ error:', error)
    await responseHandler.error(
      req,
      res,
      "Error al actualizar el servicio",
      500
    );
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await reservationService.deleteItem(id);
    
    if (!reservation) {
      return await responseHandler.error(
        req,
        res,
        "Reserva no encontrada",
        500
      );
    }

    await responseHandler.success(req, res, reservation, 201);
  } catch (error) {
    await responseHandler.error(req, res, "Error al cancelar la reserva", 500);
  }
});

module.exports = router;
