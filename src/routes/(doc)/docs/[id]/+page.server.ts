import { getDoc, getDocs } from '$lib/xata/document';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  return {
    getDocs: getDocs()
  };
}) satisfies PageServerLoad;