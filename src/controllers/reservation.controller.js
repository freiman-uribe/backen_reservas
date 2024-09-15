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

router.get("/cliente", async (req, res) => {
  try {
    const reservation = await reservationService.getAllItems();
    await responseHandler.success(req, res, reservation, 201);
  } catch (error) {
    await responseHandler.error(req, res, "Error al obtener servicios", 500);
  }
});

router.get("/list", async (req, res) => {
  try {
    const reservation = await reservationService.getAllItemsActive();
    await responseHandler.success(req, res, reservation, 201);
  } catch (error) {
    await responseHandler.error(req, res, "Error al obtener servicios", 500);
  }
});

router.post("/", async (req, res) => {
  try {
    const { body } = req;
    const cliente = !body.cliente ? req.user.id : body.cliente;
    const newReservation = await reservationService.createItem({
      servicio: body.servicio,
      cliente,
    });
    await responseHandler.success(req, res, newReservation, 201);
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
