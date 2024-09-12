const jwt = require("jsonwebtoken");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
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
    console.log('🚀 ~ AuthService ~ login ~ user:', user)
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
      user: { id: user._id, nombre: user.nombre, email: user.email },
    };
  }

  _generateToken(user) {
    return jwt.sign(
      { id: user._id, nombre: user.nombre, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  }

  async verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Token inválido" });
      }
      req.userId = decoded.userId;
      next();
    });
  }
}

module.exports = AuthService;
