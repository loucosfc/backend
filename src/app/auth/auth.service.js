const BaseService = require('../../core/base.service');

class AuthService extends BaseService {
  async signIn() {
    return super.serviceResponse({
      success: true,
      data: [],
    });
  }
}

module.exports = new AuthService();
