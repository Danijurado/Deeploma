'use client';
import { Button, FormGroup, Spinner } from '@globero/ui/components';
import { RightArrow } from '@globero/ui/icons';
import { useForm } from '@tanstack/react-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

type FormProps = {
  onSubmit: (props: { email: string }) => Promise<void>;
  loading: boolean;
};

export const Form = ({ onSubmit, loading }: FormProps) => {
  const form = useForm({
    defaultValues: {
      email: '',
    },
    validatorAdapter: zodValidator,
    onSubmit: ({ value }) => {
      onSubmit({ email: value.email });
    },
  });

  return (
    <form
      className="flex flex-1 flex-col justify-between gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field
        name="email"
        validators={{
          onBlur: z.string().email('Debe ser un email válido'),
        }}
        children={(field) => {
          const error = field.state.meta.errors.length > 0;

          return (
            <FormGroup>
              <FormGroup.Label htmlFor={field.name} error={error}>
                Email:
              </FormGroup.Label>
              <FormGroup.TextInput
                value={field.getValue()}
                type="email"
                id={field.name}
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
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isTouched]}
        children={([canSubmit, isTouched]) => (
          <Button type="submit" disabled={!canSubmit || !isTouched}>
            Comenzar
            {loading ? <Spinner className="ml-2" /> : <RightArrow />}
          </Button>
        )}
      />
    </form>
  );
};
