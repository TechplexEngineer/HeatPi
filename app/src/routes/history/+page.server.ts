import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {
        history: locals.tempMgr.getHistory()
    };
}) satisfies PageServerLoad;