'use strict';

const https = require('https');
const api = 'esi.evetech.net';

exports.checkSyst = async () => {
    // todo compare list to npc kills
    return await getSystKills();
};

async function getSystKills() {
    return await apiCall('/latest/universe/system_kills/?datasource=tranquility');
}

function apiCall(endpoint, method = 'GET') {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: api,
            port: 443,
            path: endpoint,
            method: method
        };

        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);

            let data = '';
            res.on('data', d => {
                data += d;
            });

            res.on('end', () => {
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

async function convertSystNameToID(syst) {
    return await apiCall(`/v4/universe/systems/${syst}/`)
}

const range = {
    'vale of the silent': ['V-OJEN', '49-0LI', 'B-588R', '7-K5EL', 'LZ-6SU', '5ZO-NZ', 'P3EN-E', '0-R5TS', 'FS-RFL', 'H-5GUI', 'H-UCD1', 'N-HSK0', 'U54-1L', 'Q-EHMJ', 'DAYP-G', '05R-7A', 'G-LOIT', 'YMJG-4', '7-UH4Z', 'KRUN-N', 'H-NOU5', 'IPAY-2', 'X97D-W', 'EIDI-N', 'HE-V4V', 'PM-DWE', 'FH-TTC', 'NCGR-Q', '4-HWWF', '1N-FJ8', 'S-NJBB', '2DWM-2', '0R-F2F', 'K8X-6B', '669-IX', 'Q-L07F', 'FMBR-8', 'H-1EOH', 'MQ-O27', 'Y0-BVN', '4GYV-Q', 'XSQ-TF', 'A8A-JN', 'MC6O-F', 'X445-5', 'IFJ-EL', '47L-J4', '8TPX-N', 'R-P7KL', 'WBR5-R', '6WW-28', 'H-EY0P', 'XF-PWO', 'IR-DYY', 'KX-2UI', '9OO-LH', 'E-D0VZ', 'TVN-FM', 'VI2K-J', '97-M96', '0MV-4W', 'C-J7CR', 'F-D49D', 'AZBR-2', 'UNAG-6', 'E-SCTX', '6Y-WRK'],
    'geminate': ['4NGK-F', 'NQ-9IH', 'AP9-LV', 'KR-V6G', 'MR4-MY', '0-GZX9', '2H-TSE', 'FDZ4-A', 'M-MD31', 'SR-KBB', 'B6-52M', 'L4X-FH', '4K0N-J', 'WH-2EZ', 'Roua', 'TZL-WT', '2E-ZR5', 'QKTR-L', 'V-MZW0', 'NBPH-N', 'LR-2XT', 'UBX-CC', 'B-F1MI', 'YN3-E3', 'D0-F4W', 'BND-16', 'O1-FTD', 'L-HV5C', 'IOO-7O', 'BE-UUN', '4-CUM5', 'OEY-OR', 'W-3BSU']
};
