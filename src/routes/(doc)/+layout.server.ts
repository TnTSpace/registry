import type { LayoutServerLoad } from './$types';
import { getDocuments } from '$lib/xata/document';

export const load = (async ({ locals }) => {


  return { getDocuments: getDocuments() };
}) satisfies LayoutServerLoad;