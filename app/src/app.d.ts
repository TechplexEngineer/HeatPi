// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { RelayBox } from '$lib/relaybox';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			relayBox: RelayBox,
			tempMgr: TempMgr,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
