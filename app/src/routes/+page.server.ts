import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { ZoneControl } from '$lib/relaybox';

export const load = (async ({ locals }) => {

    return {
        zones: await locals.zoneMgr.getZones(),
        temps: {
            top: await locals.tempMgr.getTopTemp(),
            mid: await locals.tempMgr.getMidTemp(),
            bot: await locals.tempMgr.getBotTemp(),
        }
    };
}) satisfies PageServerLoad;

export const actions: Actions = {
    set: async ({ request, locals }) => {
        const data = await request.formData();
        const control = data.get('control');
        const zoneNum = parseInt(data.get('zone')?.toString()!);
        const durationhrs = parseInt(data.get('durationhrs')?.toString()!);

        await locals.zoneMgr.setZone(zoneNum, control as ZoneControl, durationhrs);
    },
};