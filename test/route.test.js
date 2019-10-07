'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const {afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../lib/server');

describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('Unknown route', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('redirects to /', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/unknown/route'
        });
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/');
    });
});

describe('GET /system/{systemName}', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/system/30004191'
        });
        expect(res.statusCode).to.equal(200);
        const nameObj = JSON.parse(res.result);
        expect(nameObj.name).to.equal('C2-1B5');
    });
});

describe('POST /names', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'POST',
            url: '/names',
            payload: [
                '30004191'
            ]
        });
        expect(res.statusCode).to.equal(200);
        const nameObj = JSON.parse(res.result);
        expect(nameObj[0].name).to.equal('C2-1B5');
    });
});