const BaseRepository = require("../base/base.repository");
const User = require("./user.model");

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

module.exports = UserRepository;
