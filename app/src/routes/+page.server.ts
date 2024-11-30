import type { Actions, PageServerLoad } from './$types';

// export type ZoneStatus = 'on' | 'off' | 'unknown';
enum ZoneStatus {
    on = 'on',
    off = 'off',
    unknown = 'unknown',
}

enum ZoneControl {
    on = 'on',
    off = 'off',
    thermostat = 'thermostat',
}

let zones = [
    {
        name: "Master Bed Room",
        status: ZoneStatus.on,
        id: 3,
        settingActiveUntil: new Date(),
        control: ZoneControl.on,
    },
    {
        name: "Blake's Bed Room",
        status: ZoneStatus.off,
        id: 2,
    },
    {
        name: "First Floor",
        status: ZoneStatus.unknown,
        id: 4,
    },
    {
        name: "First Floor Radiant",
        status: ZoneStatus.off,
        id: 1,
    },
    {
        name: "Domestic Hot Water",
        status: ZoneStatus.off,
        id: 5,
    },
    {
        name: "Basement Radiant",
        status: ZoneStatus.off,
        id: 0,
    }
];

export const load = (async () => {
    console.log('loading zones');

    return {
        zones: zones,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    set: async ({ request }) => {
        const data = await request.formData();

        console.log(data);

        return { zones };
    },
};