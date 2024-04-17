import { config } from '../../Config';

type UpdateInstructorParams = {
  id: string;
  name: string;
  profession: string;
  description: string;
  photo: string;
};

export const updateInstructor = async ({
  id,
  name,
  profession,
  description,
  photo,
}: UpdateInstructorParams) => {
  const instructorResponse = await fetch(
    `${config.PUBLIC_API_URL}/instructors/${id}`,
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
      method: 'PUT',
      credentials: 'include',
    },
  );
  if (!instructorResponse.ok) {
    throw new Error();
  }
};
