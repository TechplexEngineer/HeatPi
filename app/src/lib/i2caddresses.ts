

export const arduinoI2CAddy = 0x04;
export const boxTempAddy = 0x49;

export const topTankTempAddy = 0x4F; //79
export const midTankTempAddy = 0x4E; //78
export const botTankTempAddy = 0x4D; //77

export const addresses = {
    [arduinoI2CAddy]: "arduinoI2CAddy",
    [boxTempAddy]: "boxTempAddy",
    [topTankTempAddy]: "topTankTempAddy",
    [midTankTempAddy]: "midTankTempAddy",
    [botTankTempAddy]: "botTankTempAddy",
} as const;