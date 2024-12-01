import os from 'os';
import { RelayBox } from './relaybox';
import { TempMgr } from './tempmgr';
import { ZoneMgr } from './zonemgr';
const isRaspberryPi = os.arch() === 'arm64' && os.platform() === 'linux';

export const startup = async (): Promise<App.Locals> => {
    console.log('Starting up hardware');

    const i2cBus = isRaspberryPi ? await import('i2c-bus') : await import('$lib/utils/i2c-bus-mock');

    const i2cBusNum = 1;
    const con = await i2cBus.openPromisified(i2cBusNum);

    const relayBox = new RelayBox(con);

    const hostname = "heatpi";

    if (process.env.BALENA_SUPERVISOR_ADDRESS) {
        console.log(`Updating hostname to: ${hostname}`);
        const response = await fetch(`${process.env.BALENA_SUPERVISOR_ADDRESS}/v1/device/host-config?apikey=${process.env.BALENA_SUPERVISOR_API_KEY}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                network: {
                    hostname: hostname
                }
            })
        });

        if (!response.ok) {
            console.log(`Failed to update hostname: ${response.statusText}`);
        } else {
            console.log(`Hostname updated to ${hostname}`);
        }
    } else {
        console.log("Error: Skipping hostname change. Unable to access supervisor environment variables.");
    }

    return {
        zoneMgr: new ZoneMgr(relayBox),
        tempMgr: new TempMgr(con),
    };
}