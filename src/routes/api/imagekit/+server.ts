import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteFile, uploadFile } from '$lib/server/imagekit';
import type { UploadResponse } from 'imagekit/dist/libs/interfaces';
import type { iFile } from '$lib/interface';
import { addImage, deleteImage } from '$lib/xata/image';

export const GET: RequestHandler = async () => {
  return new Response();
};

export const POST: RequestHandler = async ({ request }) => {

  const formData = await request.formData()

  const file = formData.get("file") as File
  const size = formData.get("fileSize") as string

  const result = await uploadFile(file)
  const { message, status, data } = result

  if (status === 'error') {
    return json(result)
  }
  const response = data as UploadResponse
  
  const partialImage: Partial<iFile> = {
    url: response.url,
    fileId: response.fileId,
    size
  }
  const addImageResult = await addImage(partialImage)
  return json(addImageResult)
};

export const DELETE: RequestHandler = async ({ request }) => {

  const formData = await request.formData()
  const fileId = formData.get("fileId") as string

  const result = await deleteFile(fileId)
  const { message, data, status } = result

  if (status === 'error') {
    return json(result)
  }
  const deleteImageResult = await deleteImage(fileId)
  return json(deleteImageResult)
};