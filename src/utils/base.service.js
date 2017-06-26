class BaseService {
  success(data) {
    return {
      data,
      success: true,
    };
  };

  error(data) {
    return {
      data,
      success: false,
    };
  };
}

module.exports = BaseService;
