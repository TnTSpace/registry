import type { iDocument } from '$lib/interface';
import { getDoc } from '$lib/xata/document';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {

  const { id } = params

  const result = await getDoc(id)
  const doc = result.data as iDocument
  return { doc };
}) satisfies PageServerLoad;