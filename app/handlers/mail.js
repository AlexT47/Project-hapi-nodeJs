const Mailgen = require('mailgen');
const nodemailer = require('nodemailer');

const mailGenerator = new Mailgen({
    theme   : 'default',
    product : {
        // Appears in header & footer of e-mails
        name    : 'Hapi-Boilerplate',
        link    : 'http://127.0.0.1:8080',
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    },
});

const generateNewUser = (name, login, password) => {
    return {
        body    : {
            name    : name,
            intro      : 'Welcome! ',
            dictionary  : {
                login    : login,
                password    : password,
            },
            outro   : 'Bye.',
        },
    };
};

const generateUpdateUser = (name, login, password) => {
    return {
        body    : {
            name    : name,
            intro      : 'Update! Your information changed.',
            dictionary  : {
                login    : login,
                password    : password,
            },
            outro   : 'Bye.',
        },
    };
};

const generateNewPassword = (email, password) => {
    return {
        body    : {
            name    : email,
            intro      : 'Your password changed.',
            dictionary  : {
                email    : email,
                password    : password,
            },
            outro   : 'Bye.',
        },
    };
};

module.exports.newUser = (request) => {
    const transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth    : {
            user    : 'hapi.boilerplate@gmail.com',
            pass    : 'hapi-boilerplate',
        },
    });
    const data = {
        from    : 'hapi.boilerplate@gmail.com',
        to      : request.payload.email,
        subject : '[HAPI-BOILERPLATE] ' + request.payload.login+ ': Your information',
        html    : mailGenerator.generate(generateNewUser(request.payload.lastname, request.payload.login, request.payload.password)),
        text    : mailGenerator.generatePlaintext(generateNewUser(request.payload.lastname, request.payload.login, request.payload.password),
        ),
    };

    transporter.sendMail(data);
};

module.exports.updateUser = (request) => {
    const transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth    : {
            user    : 'hapi.boilerplate@gmail.com',
            pass    : 'hapi-boilerplate',
        },
    });
    const data = {
        from    : 'hapi.boilerplate@gmail.com',
        to      : request.payload.email,
        subject : '[HAPI-BOILERPLATE] ' + request.payload.login+ ': Update',
        html    : mailGenerator.generate(generateUpdateUser(request.payload.lastname, request.payload.login, request.payload.password)),
        text    : mailGenerator.generatePlaintext(generateUpdateUser(request.payload.lastname, request.payload.login, request.payload.password),
        ),
    };

    transporter.sendMail(data);
};



module.exports.newPassword = (request, password) => {
    const transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth    : {
            user    : 'hapi.boilerplate@gmail.com',
            pass    : 'hapi-boilerplate',
        },
    });
    const data = {
        from    : 'hapi.boilerplate@gmail.com',
        to      : request.payload.email,
        subject : '[HAPI-BOILERPLATE] ' + request.payload.email+ ': Password changed',
        html    : mailGenerator.generate(generateNewPassword(request.payload.email, password)),
        text    : mailGenerator.generatePlaintext(generateNewPassword(request.payload.email, password),
        ),
    };
    transporter.sendMail(data);
};