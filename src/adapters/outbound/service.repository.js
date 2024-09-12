const ItemRepository = require('../../domain/repository/service.repository');
const ServiseModel = require('../../infrastructure/models/service.model');
const ServiceEntity = require("../../domain/entity/service.entity");

class MongoItemRepository extends ItemRepository {
  async create(serviceData) {
    const service = new ServiceEntity({
      nombre: serviceData.nombre,
    });
    const newSevice = new ServiseModel(service);
    return await newSevice.save();
  }

  async findAll() {
    return await ServiseModel.find();
  }

  async findById(id) {
    const serviceId = new ServiceEntity({ id });
    return await ServiseModel.findById(serviceId.id);
  }

  async update(serviceId, serviceData) {
    const service = new ServiceEntity({
      id: serviceId,
      nombre: serviceData.nombre,
    });

    const { id, nombre } = service;

    return await ServiseModel.findByIdAndUpdate(
      id,
      { nombre },
      {
        new: true,
      }
    );
  }

  async delete(serviceId) {
    const service = new ServiceEntity({
      id: serviceId,
      estado: "inactivo",
    });

    const { id, estado } = service;

    return await ServiseModel.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
  }
}

module.exports = MongoItemRepository;
