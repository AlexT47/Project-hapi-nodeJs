const handler   = require('../handlers/mail');

module.exports.create = (request, reply) => {
    request.server.plugins.user.insert(request.payload)
        .then((user) => {
            handler.newUser(request);
            reply(user).code(201);
        })
        .catch(err => reply(err));
};
module.exports.getUsers = (request, reply) => {
    request.server.plugins.user.getUsers()
        .then(user => reply(user).code(201))
        .catch(err => reply(err));
};
module.exports.fetch = (request, reply) => {
    request.server.plugins.user.getUser(request.params._id)
        .then(user => reply(user).code(201))
        .catch(err => reply(err));
};
module.exports.generation = (request, reply) => {
    request.server.plugins.user.generation()
        .then(user => reply(user).code(201))
        .catch(err => reply(err));
};
module.exports.update = (request, reply) => {
    request.server.plugins.user.update(request.params._id, request.payload)
        .then((user) => {
            handler.updateUser(request);
            reply(user).code(201);
        })
        .catch(err => reply(err));
};
module.exports.delete = (request, reply) => {
    request.server.plugins.user.delete(request.params._id)
        .then(reply('User delete').code(204))
        .catch(err => reply(err));
};
module.exports.authentification = (request, reply) => {
    request.server.plugins.user.authentification(request.payload)
        .then((test) => test ? reply({ msg : 'ok' }) : reply({ msg : 'ko' }))
        .catch(err => reply(err));
};
module.exports.newPassword = (request, reply) => {
    request.server.plugins.user.newPassword(request.payload)
        .then((password) => {
            handler.newPassword(request, password);
            reply('The password changed').code(201);
        })
        .catch(err => reply(err));
};

