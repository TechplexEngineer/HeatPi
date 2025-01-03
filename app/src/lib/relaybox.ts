import type { PromisifiedBus } from 'i2c-bus';
import { arduinoI2CAddy } from './i2caddresses';
import { retry } from 'radash';

export enum ZoneControl {
    on = 'on',
    off = 'off',
    thermostat = 'thermostat',
}

export class RelayBox {

    constructor(
        private connection: PromisifiedBus,
        private address = arduinoI2CAddy,
        private numZones = 6) { }

    async getAllZoneStatus() {
        let count = 0;
        const data = await retry({ times: 4, delay: 75 }, async () => {
            console.log('Running getAllZoneStatus', count++);
            return await this.connection.receiveByte(this.address);
        });
        // const data = await this.connection.receiveByte(this.address);
        const status: Record<number, boolean> = {};
        for (let zone = 0; zone < this.numZones; zone++) {
            status[zone] = Boolean(data & (1 << zone));
        }
        return status;
    }

    async setZone(zoneNumber: number, state: ZoneControl) {
        let message = 0;
        if (state === ZoneControl.off) {
            message |= 1 << 5;
        } else if (state === ZoneControl.on) {
            message |= 1 << 4;
        }

        message |= zoneNumber;

        console.log(`Setting zone ${zoneNumber} to ${state}: ${message.toString(2).padStart(8, '0')}`);

        let count = 0;
        const data = await retry({ times: 4, delay: 75 }, async () => {
            console.log('Running setZone1', count++);
            return await this.connection.sendByte(this.address, message);
        });

    }
}
