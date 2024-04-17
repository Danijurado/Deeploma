import { config } from '../../Config';

type CreateInstructorParams = {
  name: string;
  profession: string;
  description: string;
  photo: string;
};

export const createInstructor = async ({
  name,
  profession,
  description,
  photo,
}: CreateInstructorParams) => {
  const instructorResponse = await fetch(
    `${config.PUBLIC_API_URL}/instructors`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photo,
        name,
        profession,
        description,
      }),
      method: 'POST',
      credentials: 'include',
    },
  );
  if (!instructorResponse.ok) {
    throw new Error();
  }
};
