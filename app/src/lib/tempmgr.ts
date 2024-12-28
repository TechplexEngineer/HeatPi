import { c2f } from "$lib";
import type { PromisifiedBus } from "i2c-bus";
import { topTankTempAddy, midTankTempAddy, botTankTempAddy } from "./i2caddresses";

export class TempMgr {

    constructor(
        private connection: PromisifiedBus,
        private topAddy = topTankTempAddy,
        private midAddy = midTankTempAddy,
        private botAddy = botTankTempAddy) { }


    async getInternalTemp(): Promise<number> {
        const tempc = await this.connection.receiveByte(this.topAddy);
        return c2f(tempc);
    }

    async getTopTemp(): Promise<number> {
        const tempc = await this.connection.receiveByte(this.topAddy);
        return c2f(tempc);
    }

    async getMidTemp(): Promise<number> {
        const tempc = await this.connection.receiveByte(this.midAddy);
        return c2f(tempc);
    }

    async getBotTemp(): Promise<number> {
        const tempc = await this.connection.receiveByte(this.botAddy);
        return c2f(tempc);
    }
}