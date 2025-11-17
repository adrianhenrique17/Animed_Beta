import DataService from "../services/DataService.js";
import Service from "../models/serviceModel.js";

const dataService = new DataService("services.json");

// GET /services - Retorna todos os serviços
export const getAllServices = async (req, res) => {
  const services = await dataService.readAll();
  return res.json({ success: true, data: services });
};

// GET
export const getServiceById = async (req, res) => {
  const id = Number(req.params.id);
  const services = await dataService.readAll();
  const found = services.find((s) => s.id === id);

  if (!found) {
    return res
      .status(404)
      .json({ success: false, message: "Serviço não encontrado." });
  }
  return res.json({ success: true, data: found });
};

// POST
export const createService = async (req, res) => {
  const { vetName, especialidade, serviceName, price } = req.body;

  if (!vetName || !serviceName || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Nome do veterinário, nome do serviço e preço são obrigatórios.",
    });
  }

  const services = await dataService.readAll();

  const newService = new Service({
    id: Date.now(),
    vetName,
    especialidade,
    serviceName,
    price,
  });

  services.push(newService);
  await dataService.writeAll(services);

  return res.status(201).json({ success: true, data: newService });
};

// PUT /services/:id
export const updateService = async (req, res) => {
  const id = Number(req.params.id);
  const services = await dataService.readAll();
  const serviceIndex = services.findIndex((s) => s.id === id);

  if (serviceIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "Serviço não encontrado." });
  }

  const originalService = services[serviceIndex];
  const updatedService = {
    ...originalService,
    ...req.body,
    id: originalService.id,
  };

  services[serviceIndex] = updatedService;
  await dataService.writeAll(services);

  return res.json({ success: true, data: updatedService });
};

// DELETE /services/:id
export const deleteService = async (req, res) => {
  const id = Number(req.params.id);
  const services = await dataService.readAll();
  const updatedServices = services.filter((s) => s.id !== id);

  if (services.length === updatedServices.length) {
    return res
      .status(404)
      .json({ success: false, message: "Serviço não encontrado." });
  }

  await dataService.writeAll(updatedServices);

  return res.status(204).send();
};
