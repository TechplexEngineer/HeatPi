import { c2f } from "$lib";
import type { PromisifiedBus } from "i2c-bus";
import { topTankTempAddy, midTankTempAddy, botTankTempAddy } from "./i2caddresses";
import { retry } from "radash";

export class TempMgr {

    private history: { date: Date, top: number, mid: number, bot: number }[] = [];

    constructor(
        private connection: PromisifiedBus,
        private topAddy = topTankTempAddy,
        private midAddy = midTankTempAddy,
        private botAddy = botTankTempAddy,
        private historyUpdateIntervalMs = 1 * 60 * 1000,
        private historyLengthMs = 8 * 60 * 60 * 1000) {
        setInterval(async () => {
            if (this.history.length > Math.floor(this.historyLengthMs / this.historyUpdateIntervalMs)) {
                this.history.shift();
            }
            this.history.push({
                date: new Date(),
                top: await this.getTopTemp(),
                mid: await this.getMidTemp(),
                bot: await this.getBotTemp()
            })
        }, this.historyUpdateIntervalMs);
    }

    getHistory() {
        return this.history;
    }

    async getTopTemp(): Promise<number> {
        let count = 0;
        const tempc = await retry({ times: 4, delay: 75 }, async () => {
            if (count++ > 0) {
                console.log('Running getTopTemp', count);
            }

            return await this.connection.receiveByte(this.topAddy);
        });
        return c2f(tempc);
    }

    async getMidTemp(): Promise<number> {
        let count = 0;
        const tempc = await retry({ times: 4, delay: 75 }, async () => {
            if (count++ > 0) {
                console.log('Running getMidTemp', count);
            }

            return await this.connection.receiveByte(this.midAddy);
        });
        return c2f(tempc);
    }

    async getBotTemp(): Promise<number> {
        let count = 0;
        const tempc = await retry({ times: 4, delay: 75 }, async () => {
            if (count++ > 0) {
                console.log('Running getBotTemp', count);
            }
            return await this.connection.receiveByte(this.botAddy);
        });
        return c2f(tempc);
    }
}