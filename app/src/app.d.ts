// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { ZoneMgr } from '$lib/zonemgr';
import type { TempMgr } from '$lib/tempmgr';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			zoneMgr: ZoneMgr,
			tempMgr: TempMgr,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
