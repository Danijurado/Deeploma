import { config } from '../../Config';

export const deleteSession = async (sessionId: string) => {
  await fetch(`${config.PUBLIC_API_URL}/sessions/${sessionId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
