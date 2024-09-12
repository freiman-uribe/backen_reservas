class ServiceEntity {
  constructor({ id = null, servicio, cliente, estado } = {}) {
    this.id = id;
    this.servicio = servicio;
    this.cliente = cliente;
    this.estado = estado;
  }
}

module.exports = ServiceEntity;