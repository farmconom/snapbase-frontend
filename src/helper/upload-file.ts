import environment from '../environment';
import { getSignedUrlApi } from '../rest-api/common';

export const uploadBatchFile = async (files: File[]) => {
  // const urls = await Promise.all(
  //   files.map(async file => {
  //     await uploadFile(file);
  //   })
  // );

  const urls = Array<string>();
  for (const file of files) {
    const url = await uploadFile(file);
    urls.push(url);
  }

  return urls;
};

export const uploadFile = async (file: File) => {
  const fileName = `${Date.now()}-${file.name.split(' ').join('')}`;
  const { data: signedUrl } = await getSignedUrlApi(fileName);
  const uploadResponse = await upload(signedUrl, file);
  if (uploadResponse.status !== 200) return '';
  const url = getFileUrl(fileName);
  return url;
};

const upload = async (signedUrl: string, file: File) => {
  const option = {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  };
  const uploadResponse = await fetch(signedUrl, option);
  return uploadResponse;
};

const getFileUrl = (fileName: string) => {
  const { url: firebaseStorageUrl, replaceKey } = environment.firebaseStorage;
  const encodePath = fileName.toString().split('/').join('%2F');
  const fileUrl = firebaseStorageUrl.replace(replaceKey, encodePath);
  return fileUrl;
};
