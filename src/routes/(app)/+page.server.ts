import { getImages } from '$lib/xata/image';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  
  return { getImages: getImages() };
}) satisfies PageServerLoad;