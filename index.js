const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
        const htmlEmail = `
        <h3>Contact Details:</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>E-Mail: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
        <ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: 'user@example.com',
                accessToken: 'ya29.Glv7BuAqia8aNP4sTWGg78ED5BDZtpBKEhBlD7HlQZcoGXKDLvh9OW9GQHReprEVLGBmH_0RYbYQ4yF2d0wvniYdvr5o4Qbq_DKnDZvsHFh9XVNpSkZxh-hwmMW-'
            }
        })

        let mailOptions = {
            from: `${req.body.email}`,
            to: 'g.rutherford10@gmail.com',
            replyTo: `${req.body.email}`,
            subject: `${req.body.subject}`,
            text: req.body.message,
            html: htmlEmail
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                return console.log(err)
            }

            console.log('Message Sent: %s', info.message)
            console.log('Message Url: %s', nodemailer.getTestMessageUrl(info));
            
        })
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);    
})