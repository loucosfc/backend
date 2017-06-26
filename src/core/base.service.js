class BaseService {
  // eslint-disable-next-line
  serviceResponse(response) {
    if (response.success) {
      return BaseService.success(response.data);
    }

    return BaseService.error(response.data);
  }

  static success(data) {
    return {
      data,
      success: true,
      fatal: false,
    };
  }

  static error(error) {
    return {
      error,
      success: false,
      fatal: false,
    };
  }
}

module.exports = BaseService;
