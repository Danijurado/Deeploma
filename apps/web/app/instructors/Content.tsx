'use client';

import { useMutation } from '@tanstack/react-query';

import { InstructorForm } from './components/InstructorForm';
import { createInstructor } from '../context/instructor/create';
import { Instructor } from '../context/instructor/Instructor';
import { updateInstructor } from '../context/instructor/update';
import { createFile } from '../context/file/create';

type handleSubmit = {
  name: string;
  profession: string;
  description: string;
  photo: File;
};

type ContentProps = {
  instructor?: Instructor;
};
const Content = ({ instructor }: ContentProps) => {
  const createMutation = useMutation({
    mutationFn: createInstructor,
  });

  const updateMutation = useMutation({
    mutationFn: updateInstructor,
  });

  const createFileMutation = useMutation({
    mutationFn: createFile,
  });

  const handleSubmit = async (value: handleSubmit, updatedImage: boolean) => {
    let src: string = '';

    if (updatedImage) {
      src = await createFileMutation.mutateAsync(value.photo);
    }
    if (!instructor) {
      createMutation.mutate({ ...value, photo: src });
    } else {
      updateMutation.mutate({ ...value, id: instructor.id, photo: src });
    }
  };

  return <InstructorForm onSubmit={handleSubmit} instructor={instructor} />;
};

export default Content;
