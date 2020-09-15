class BaseResponse {
    constructor(status, statusCode, data = null, message = 'Operation Completed Successfully') {
        this.status = status;
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}

module.exports = {
    BaseResponse,
};