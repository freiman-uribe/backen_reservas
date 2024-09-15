const jwt = require("jsonwebtoken");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllItems() {
    return await this.userRepository.findAll();
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email already in use");
    } 

    return await this.userRepository.create(userData);
  }

  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this._generateToken(user);
    return {
      token,
      user: { nombre: user.nombre, email: user.email, rol: user.rol },
    };
  }

  _generateToken(user) {
    return jwt.sign(
      { id: user._id, nombre: user.nombre, email: user.email, rol: user.rol},
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }
}

module.exports = AuthService;
