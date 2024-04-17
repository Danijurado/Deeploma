import { config } from '../../Config';

export const createUser = async (email: string) => {
  await fetch(`${config.PUBLIC_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
};
