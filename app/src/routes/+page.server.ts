import { fail } from '@sveltejs/kit';
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
export type Zone = { name: string, status: ZoneStatus, id: number, settingActiveUntil?: Date | undefined, control?: ZoneControl }

let zones: Zone[] = [
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
    return {
        zones: zones,
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    set: async ({ request }) => {
        const data = await request.formData();
        const control = data.get('control');
        const zoneNum = parseInt(data.get('zone')?.toString()!);
        const durationhrs = parseInt(data.get('durationhrs')?.toString()!);

        const zone = zones.find(z => z.id == zoneNum)
        if (!zone) {
            return fail(404, { message: 'Zone not found' });
        }

        zone.control = control as ZoneControl;
        zone.settingActiveUntil = new Date(Date.now() + durationhrs * 60 * 60 * 1000);
    },
};