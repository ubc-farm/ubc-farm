import { route } from 'docuri';

/**
 * URI key used by people.
 * Use role to filter for specific roles (i.e.: employee, researcher)
 */
export const person = route('person/:role/:id');
