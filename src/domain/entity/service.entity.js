class ServiceEntity {
  constructor({ id = null, nombre, estado } = {}) {
    this.id = id;
    this.nombre = nombre;
    this.estado = estado;
  }
}

module.exports = ServiceEntity;