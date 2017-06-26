const BaseService = require('../utils/base.service');

class AuthService extends BaseService {
  async signIn({ username, password }) {
    return this.success([]);
  }
}

module.exports = new AuthService();
