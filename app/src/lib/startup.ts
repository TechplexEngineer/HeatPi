import os from 'os';
import { RelayBox } from './relaybox';
import { TempMgr } from './tempmgr';
const isRaspberryPi = os.arch() === 'arm64' && os.platform() === 'linux';

export const startup = async (): Promise<App.Locals> => {
    console.log('Starting up hardware');

    const i2cBus = isRaspberryPi ? await import('i2c-bus') : await import('$lib/utils/i2c-bus-mock');

    const i2cBusNum = 1;
    const con = await i2cBus.openPromisified(i2cBusNum);

    return {
        relayBox: new RelayBox(con),
        tempMgr: new TempMgr(con),
    };
}