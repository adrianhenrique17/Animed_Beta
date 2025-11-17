import DataService from "../services/DataService.js";
import Reservation from "../models/reservationModel.js";

const reservationDataService = new DataService("reservations.json");

// GET
export const getAllReservations = async (req, res) => {
  const reservations = await reservationDataService.readAll();
  return res.json({ success: true, data: reservations });
};

//  GET /reservations/:id -
export const getReservationById = async (req, res) => {
  const id = Number(req.params.id);
  const reservations = await reservationDataService.readAll();
  const found = reservations.find((r) => r.id === id);

  if (!found) {
    return res
      .status(404)
      .json({ success: false, message: "Reserva não encontrada." });
  }
  return res.json({ success: true, data: found });
};

// POST
export const createReservation = async (req, res) => {
  const { serviceId, serviceName, vetName, price, reservationDate } = req.body;

  if (!serviceId || !reservationDate) {
    return res
      .status(400)
      .json({
        success: false,
        message: "ID do serviço e data da reserva são obrigatórios.",
      });
  }

  const reservations = await reservationDataService.readAll();
  const newReservation = new Reservation({
    id: Date.now(),
    serviceId,
    serviceName,
    vetName,
    price,
    reservationDate,
  });

  reservations.push(newReservation);
  await reservationDataService.writeAll(reservations);
  return res.status(201).json({ success: true, data: newReservation });
};

// PUT /reservations/:id
export const updateReservation = async (req, res) => {
  const id = Number(req.params.id);
  const reservations = await reservationDataService.readAll();
  const reservationIndex = reservations.findIndex((r) => r.id === id);

  if (reservationIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Reserva não encontrada." });
  }

  const originalReservation = reservations[reservationIndex];
  const updatedReservation = {
    ...originalReservation,
    ...req.body,
    id: originalReservation.id,
  };

  reservations[reservationIndex] = updatedReservation;
  await reservationDataService.writeAll(reservations);
  return res.json({ success: true, data: updatedReservation });
};

// DELETE /reservations/:id
export const cancelReservation = async (req, res) => {
  const id = Number(req.params.id);
  const reservations = await reservationDataService.readAll();
  const updatedReservations = reservations.filter((r) => r.id !== id);

  if (reservations.length === updatedReservations.length) {
    return res
      .status(404)
      .json({ success: false, message: "Reserva não encontrada." });
  }

  await reservationDataService.writeAll(updatedReservations);
  return res.status(204).send();
};
