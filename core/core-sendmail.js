exports.init = function(noderplate) {
  var sendmail   = {};
  var nodemailer = noderplate.imports.nodemailer;

  var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: "username@gmail.com",
      pass: "password"
    }
  });

  sendmail.send = function(options, cb) {
    smtpTransport.sendMail(options, function(error, response){
      if(error) {
        console.log(error);
      } else {
        cb("Message sent: " + response.message);
      }
    });
  };

  return sendmail;
};