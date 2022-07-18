const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')



const sendEmail = async(data)=>{
    try {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,// true for 465, false for other ports
        auth: {
          user: 'avtur.team@gmail.com', // generated ethereal user
          pass: 'nkbkkjrehqcjjxln', // generated ethereal password
        },
      });
      const token = jwt.sign(data, process.env.SECRET_KEY_JWT, {
        expiresIn: '1 week'
        })
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Ankasa Ticketing" <avtur.team@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "Email Verification", // Subject line
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                .container{
                    margin-left: auto;
                    margin-right: auto;
                    width: 300px;
                    height: 100px;
                    border-radius: 10px;
                    background-color: red;
                    margin-top: 20px;
                    padding-top: 100px;
                }
                .container a{
                    text-align: center;
                    display: block;
                    color: yellow;
                    background-color: blue;
                    width: 100%;
                    padding: 10px 0px 10px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <a href="http://localhost:5000/v1/users/activate/${token}/${data.id}">klik aktif</a>
            </div>
        </body>
        </html>`, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    } catch (error) {
        console.log(error);
    }
}

const forgotPassword = async (data) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,// true for 465, false for other ports
        auth: {
          user: process.env.G_ACCOUNT, // generated ethereal user
          pass: process.env.G_PASS, // generated ethereal password
        },
      });
    const expiresIn = {
        expiresIn: '1h',
    }
    const token = jwt.sign(data, process.env.SECRET_KEY_JWT, expiresIn)
    const info = await transporter.sendMail({
        from: '"Ankasa Ticketing" <avtur.team@gmail.com>',
        to: data.email,
        subject: 'Reset Pasword',
        text: `http://localhost:5000/v1/users/forgot/${token}`,
    })
    console.log('Message sent: %s', info.messageId)
}

module.exports ={
    sendEmail,
    forgotPassword
}