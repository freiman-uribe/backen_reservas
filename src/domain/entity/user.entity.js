class UserEntity {
  constructor({ id = null, email, nombre, password, estado='activo', rol='usuario' } = {}) {
    this.id = id;
    this.email = email,
    this.nombre = nombre,
    this.password = password
    this.estado = estado;
    this.rol = rol;
  }
  
  isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}

module.exports = UserEntity;
