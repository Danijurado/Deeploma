import { config } from '../../Config';

export const createFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const fileResponse = await fetch(`${config.PUBLIC_API_URL}/files`, {
    body: formData,
    method: 'POST',
    credentials: 'include',
  });
  if (!fileResponse.ok) {
    throw new Error();
  }
  const body = await fileResponse.json();
  return body.key;
};
