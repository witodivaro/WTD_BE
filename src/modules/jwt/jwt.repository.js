const BaseRepository = require("../base/base.repository");

const BlacklistedJWT = require("./jwt.model");

class JWTRepository extends BaseRepository {
  constructor() {
    super(BlacklistedJWT);
  }
}

module.exports = JWTRepository;
