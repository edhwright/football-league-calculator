import { writable } from 'svelte/store';

export const fetchState = writable("INITIAL");
export const matchesStore = writable(undefined);
export const teamsStore = writable(undefined);
export const selected = writable("selectInit");
export const tableUpdated = writable(false);
export const needTieBreaker = writable({});
export const view = writable({
    mobile: false,
    mobileTabSelected: "matches",
    mwCompletedList: false,
    matches: true,
    table: true,
});

