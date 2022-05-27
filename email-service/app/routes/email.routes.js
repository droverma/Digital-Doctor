module.exports = (app) => {
    const email = require("../controllers/email.controller");
  
    app.post('/api/v1/send-mail', email.emailSender);
    
  };
  