const BaseService = require('../../core/base.service');
const User = require('./user.model');

class UserService extends BaseService {
  async create({ ctx }) {
    const params = ctx.request.body;
    let success;
    let data;

    try {
      const response = await User.create({
        name: params.name,
        email: params.email,
        password: params.password,
      });
      success = true;
      data = response;
    } catch (e) {
      success = false;
      data = 'user.create_failed';
    }

    return super.serviceResponse({
      success,
      data,
    });
  }
}

module.exports = new UserService();
