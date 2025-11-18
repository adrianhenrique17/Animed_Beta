export default class Reservation {
  constructor({ id, serviceId, serviceName, vetName, price, reservationDate }) {
    this.id = Number(id);
    this.serviceId = Number(serviceId);
    this.serviceName = serviceName;
    this.vetName = vetName;
    this.price = Number(price);
    this.reservationDate = reservationDate;
  }
}
