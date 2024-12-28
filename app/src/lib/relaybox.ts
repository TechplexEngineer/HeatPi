import type { PromisifiedBus } from 'i2c-bus';

export const arduinoI2CAddy = 0x04;
export const boxTempAddy = 0x49;

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
        const data = await this.connection.receiveByte(this.address);
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

        await this.connection.sendByte(this.address, message);
    }
}
