'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return new Promise((resolve, reject) => {
                const https = require('https');
                const options = {
                    hostname: 'esi.evetech.net',
                    port: 443,
                    path: '/latest/universe/system_kills/?datasource=tranquility',
                    method: 'GET'
                };

                const req = https.request(options, res => {
                    console.log(`statusCode: ${res.statusCode}`);

                    let data = '';
                    res.on('data', d => {
                        data += d;
                    });

                    res.on('end', () => {
                        // todo get list of systems in range
                        // todo compare list to npc kills
                        let json = JSON.parse(data);
                        resolve(JSON.stringify(json, null, 2));
                    });
                });

                req.on('error', error => {
                    console.log(error);
                    reject(error);
                });

                req.end();
            });
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
