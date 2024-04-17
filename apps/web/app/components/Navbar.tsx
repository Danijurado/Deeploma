'use client';

import { Navbar as N } from '@globero/ui/components';

import { deleteSession } from '../context/session/delete';
import { useMutation } from '@tanstack/react-query';
import { Session } from '../context/session/Session';

type NavbarProps = {
  session?: Session;
};

export const Navbar = ({ session }: NavbarProps) => {
  const mutation = useMutation({
    mutationFn: deleteSession,
    onSuccess() {
      window.location.assign('/');
    },
  });

  return (
    <N>
      <N.Brand>
        <img src="/logo.svg" className="mx-3 h-14" alt="Deeploma Logo" />
      </N.Brand>
      <div>{session && <N.Toggle />}</div>
      {session && (
        <N.Collapse>
          <N.Link>
            <a
              onClick={() => {
                mutation.mutate(session.id);
              }}
            >
              Cerrar sesión
            </a>
          </N.Link>
        </N.Collapse>
      )}
    </N>
  );
};
