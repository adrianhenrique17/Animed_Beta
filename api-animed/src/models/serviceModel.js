export default class Service {
  constructor({ id, vetName, especialidade = "", serviceName, price }) {
    this.id = Number(id);
    this.vetName = vetName;
    this.especialidade = especialidade;
    this.serviceName = serviceName;
    this.price = Number(price);
  }
}
