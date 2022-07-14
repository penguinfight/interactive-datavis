import { writable } from 'svelte/store';

export const activeStation = writable(null);
export const activeChart = writable("temperature");
