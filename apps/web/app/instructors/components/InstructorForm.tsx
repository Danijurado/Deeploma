'use client';
import { Button, FormGroup } from '@globero/ui/components';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import React, { useState } from 'react';
import { z } from 'zod';
import { Avatar } from '@globero/ui/components';
import { Instructor } from '../../context/instructor/Instructor';

interface InstructorFormProps {
  onSubmit: (value: any, updatedImage: boolean) => Promise<void>;
  instructor?: Instructor;
}

const InstructorForm: React.FC<InstructorFormProps> = ({
  onSubmit,
  instructor,
}) => {
  const [src, setSrc] = useState(instructor?.photo);
  const [updatedImage, setUpdatedImage] = useState(false);
  const form = useForm({
    defaultValues: {
      name: instructor?.name || '',
      profession: instructor?.profession || '',
      description: instructor?.description || '',
      photo: new File([], ''),
    },
    validatorAdapter: zodValidator,
    onSubmit: ({ value }) => {
      onSubmit(
        {
          name: value.name,
          profession: value.profession,
          description: value.description,
          photo: value.photo,
        },
        updatedImage,
      );
    },
  });
  const fr = new FileReader();
  fr.onload = () => {
    setSrc(fr.result as string);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="photo"
          validators={{ onChange: z.instanceof(File) }}
          children={(field) => {
            const error = field.state.meta.errors.length > 0;

            return (
              <FormGroup>
                <Avatar imgSrc={src}></Avatar>
                <FormGroup.Label htmlFor={field.name} error={error}>
                  Foto:
                </FormGroup.Label>
                <FormGroup.FileInput
                  id={field.name}
                  onChange={(e) => {
                    setUpdatedImage(true);
                    const [file] = e.target.files || [];
                    fr.readAsDataURL(file!);
                    field.handleChange(file!);
                  }}
                  onBlur={field.handleBlur}
                  required
                />
              </FormGroup>
            );
          }}
        />
        <form.Field
          name="name"
          validators={{ onChange: z.string() }}
          children={(field) => {
            const error = field.state.meta.errors.length > 0;
            return (
              <FormGroup>
                <FormGroup.Label htmlFor={field.name} error={error}>
                  Nombre:
                </FormGroup.Label>
                <FormGroup.TextInput
                  type="text"
                  id={field.name}
                  value={field.getValue()}
                  onChange={(e) => void field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                  error={error}
                  description={field.state.meta.errors.join(', ')}
                />
              </FormGroup>
            );
          }}
        />
        <form.Field
          name="profession"
          validators={{ onChange: z.string() }}
          children={(field) => {
            const error = field.state.meta.errors.length > 0;
            return (
              <FormGroup>
                <FormGroup.Label htmlFor={field.name} error={error}>
                  Puesto de trabajo:
                </FormGroup.Label>
                <FormGroup.TextInput
                  type="text"
                  id={field.name}
                  value={field.getValue()}
                  onChange={(e) => void field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                  error={error}
                  description={field.state.meta.errors.join(', ')}
                />
              </FormGroup>
            );
          }}
        />
        <form.Field
          name="description"
          validators={{ onChange: z.string() }}
          children={(field) => {
            const error = field.state.meta.errors.length > 0;
            return (
              <FormGroup>
                <FormGroup.Label htmlFor={field.name} error={error}>
                  Description:
                </FormGroup.Label>
                <FormGroup.TextArea
                  id={field.name}
                  onChange={(e) => void field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  required
                  value={field.getValue()}
                  error={error}
                  description={field.state.meta.errors.join(', ')}
                />
              </FormGroup>
            );
          }}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit]}
          children={([canSubmit]) => (
            <Button type="submit" disabled={!canSubmit}>
              Get started
            </Button>
          )}
        />
      </form>
    </>
  );
};

export { InstructorForm };
