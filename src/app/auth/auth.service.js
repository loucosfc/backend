const BaseService = require('../../core/base.service');
const User = require('../user/user.model');

class AuthService extends BaseService {
  async signIn({ ctx }) {
    const params = ctx.request.body;
    console.log(params);
    const response = await User.findOne({
      where: {
        email: params.email,
        password: params.password,
      },
    });
    return super.serviceResponse({
      success: true,
      data: response,
    });
  }
}

module.exports = new AuthService();
