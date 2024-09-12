class ItemService {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async createItem(serviceData) {
    return await this.serviceRepository.create(serviceData);
  }
  
  async getAllItems() {
    return await this.serviceRepository.findAll();
  }

  async getItem(id) {
    return await this.serviceRepository.findById(id);
  }

  async updateItem(id, serviceData) {
    return await this.serviceRepository.update(id, serviceData);
  }

  async deleteItem(id) {
    return await this.serviceRepository.delete(id);
  }
}

module.exports = ItemService;
