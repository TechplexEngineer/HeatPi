import { c2f } from "$lib";
import type { PromisifiedBus } from "i2c-bus";
import { topTankTempAddy, midTankTempAddy, botTankTempAddy } from "./i2caddresses";
import { retry } from "radash";

export class TempMgr {

    constructor(
        private connection: PromisifiedBus,
        private topAddy = topTankTempAddy,
        private midAddy = midTankTempAddy,
        private botAddy = botTankTempAddy) { }

    async getTopTemp(): Promise<number> {
        let count = 0;
        const tempc = await retry({ times: 4, delay: 75 }, async () => {
            console.log('Running setZone', count++);
            return await this.connection.receiveByte(this.topAddy);
        });
        return c2f(tempc);
    }

    async getMidTemp(): Promise<number> {
        let count = 0;
        const tempc = await retry({ times: 4, delay: 75 }, async () => {
            console.log('Running setZone', count++);
            return await this.connection.receiveByte(this.midAddy);
        });
        return c2f(tempc);
    }

    async getBotTemp(): Promise<number> {
        let count = 0;
        const tempc = await retry({ times: 4, delay: 75 }, async () => {
            console.log('Running setZone', count++);
            return await this.connection.receiveByte(this.botAddy);
        });
        return c2f(tempc);
    }
}