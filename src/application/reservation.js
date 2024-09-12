class ItemReservation {
  constructor(reservationRepository) {
    this.reservationRepository = reservationRepository;
  }

  async createItem(reservationData) {
    return await this.reservationRepository.create(reservationData);
  }

  async getAllItems() {
    return await this.reservationRepository.findAll();
  }

  async getItem(id) {
    return await this.reservationRepository.findById(id);
  }

  async updateItem(id, reservationData) {
    return await this.reservationRepository.update(id, reservationData);
  }

  async deleteItem(id) {
    return await this.reservationRepository.delete(id);
  }
}

module.exports = ItemReservation;
