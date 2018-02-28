'use strict';

const Promise   = require('bluebird');
const Boom      = require('boom');
const faker     = require('faker');
const bcrypt    = require('bcrypt');

const internals = {};

const externals = {

    insert(user_form) {
        const user = internals.server.database.users();
        user.set(user_form);
        return user.save();
    },

    getUsers() {
        return internals.server.database.users.find();
    },

    getUser(id) {
        return internals.server.database.users.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found'));
                }
                return user;
            });
    },

    generation() {
        const users = [];
        for (let i = 0; i < 100; i++) {
            const user = new internals.server.database.users();
            user.set({
                login       :   faker.internet.userName(),
                password    :   faker.internet.password(),
                email       :   faker.internet.email(),
                firstname   :   faker.name.firstName(),
                lastname    :   faker.name.lastName(),
            });
            users.push(user);
        }
        return Promise.map(users, user => externals.insert(user));
    },

    update(id, user_form) {
        return internals.server.database.users.findOne({ _id : id })
            .then((user) => {
                if (!user) {
                    return Promise.reject(Boom.notFound('User not found'));
                }

                user.set(user_form);
                user.save();

                return user;
            });
    },

    delete(id) {
        return internals.server.database.users.findOneAndRemove({ _id : id })
            .then(user  => false);
    },


    authentification(log_form) {
        return internals.server.database.users.findOne({ login : log_form.login })
            .then((user) => {
                return bcrypt.compare(log_form.password, user.password).then((res) => {
                    return res;
                });
            });
    },

    newPassword(email_form) {
        return internals.server.database.users.findOne({ email : email_form.email })
            .then((user) => {
                user.set({
                    login       :   user.login,
                    password    :   faker.internet.password(),
                    email       :   email_form.email,
                    firstname   :   user.firstname,
                    lastname    :   user.lastname,
                });
                const password = user.password;
                user.save();
                return password;
            });
    },

    register(server, options, next) {
        internals.server    = server.root;
        internals.settings  = options;

        server.expose('insert', externals.insert);
        server.expose('getUsers', externals.getUsers);
        server.expose('getUser', externals.getUser);
        server.expose('generation', externals.generation);
        server.expose('update', externals.update);
        server.expose('delete', externals.delete);
        server.expose('authentification', externals.authentification);
        server.expose('newPassword', externals.newPassword);
        next();
    },
};

externals.register.attributes = {
    name    : 'user',
};

module.exports.register = externals.register;