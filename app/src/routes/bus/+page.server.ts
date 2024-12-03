import type { Actions, PageServerLoad } from './$types';

export const load = (async ({locals}) => {
    const result = await locals.rawBus.scan()
    console.log(`I2C Bus scan result:`, result);
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    
};