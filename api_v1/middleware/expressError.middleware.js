class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status ? status : 500;
      console.error(this.stack);
    }
  }
  
  
  module.exports = ExpressError;