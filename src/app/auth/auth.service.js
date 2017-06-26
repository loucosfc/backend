const BaseService = require('../../core/base.service');
const User = require('../user/user.model');

class AuthService extends BaseService {
  async signIn() {
    const response = await User.findAll();
    return super.serviceResponse({
      success: true,
      data: response,
    });
  }
}

module.exports = new AuthService();
