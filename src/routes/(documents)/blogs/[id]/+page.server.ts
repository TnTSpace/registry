import { getDocument } from '$lib/xata/document';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const { id } = params

  return { getDocument: getDocument(id) };
}) satisfies PageServerLoad;