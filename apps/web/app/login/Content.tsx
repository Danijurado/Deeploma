'use client';

import { useMutation } from '@tanstack/react-query';
import { createUser } from '../context/user/create';
import { Card, Text } from '@globero/ui/components';
import { Form } from './components/Form';

export const Content = () => {
  const mutation = useMutation({
    mutationFn: createUser,
  });

  const handleSubmit = async ({ email }: { email: string }) => {
    mutation.mutate(email);
  };

  return (
    <Card>
      <Text.Subtitle>Iniciar sesión</Text.Subtitle>
      <div className="flex min-h-40 flex-col">
        {mutation.isIdle && (
          <Text.Paragraph>
            <span className="font-bold">
              ¿Contraseñas difíciles de recordar?
            </span>
            <br />
            Obtén un enlace para iniciar sesión de forma instantánea.
          </Text.Paragraph>
        )}
        {mutation.isSuccess ? (
          <Text.Paragraph>
            Te hemos enviado un email. Revisa tu bandeja de entrada y
            encontrarás tu enlace para acceder a la plataforma.
          </Text.Paragraph>
        ) : (
          <Form onSubmit={handleSubmit} loading={mutation.isPending} />
        )}
      </div>
    </Card>
  );
};
