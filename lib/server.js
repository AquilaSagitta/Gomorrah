'use strict';

const Hapi = require('@hapi/hapi');
const Gomorrah = require('./app');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
        return await Gomorrah.checkSyst();
    }
});

server.route({
    method: 'GET',
    path: '/system/{systemName}',
    handler: async (request, h) => {
        return await Gomorrah.convertSystNameToID(request.params.systemName)
    }
});

server.route({
    method: '*',
    path: '/{p*}',
    handler: (request, h) => {
        return h.redirect('/');
    }
});

exports.init = async () => {

    await server.initialize();
    return server;
};

exports.start = async () => {

    await server.start();
    console.log('Server running on %s', server.info.uri);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});
