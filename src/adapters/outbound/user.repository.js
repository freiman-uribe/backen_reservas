const UserRepository = require("../../domain/repository/user.repository");
const UserModel = require("../../infrastructure/models/user.model");
const UserEntity = require("../../domain/entity/user.entity");

class MongoUserRepository extends UserRepository {
  async create(userData) {
    const user = new UserEntity({
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
    });
    if (!user.isValidEmail()) {
        throw new Error("Email no válido");
    }
    
    const newUser = new UserModel(user);
    return await newUser.save();
  }

  async findAll() {
    return await UserModel.find({}, '_id nombre');
  }

  async findByEmail(userEmail) {
    const user = new UserEntity({
      email: userEmail,
    });

    if (!user.isValidEmail()) {
      throw new Error("Email no válido");
    }

    const { email } = user;

    return await UserModel.findOne({ email });
  }

  async findById(userId) {
    const user = new UserEntity({
      id: userId,
    });
    const { id } = user;

    return await UserModel.findById(id);
  }
}

module.exports = MongoUserRepository;
