import { ReactNode } from 'react';
import { Label, TextInput, Textarea, FileInput } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';

const customTheme: CustomFlowbiteTheme['textInput'] = {
  field: {
    input: {
      colors: {
        primary:
          'bg-gray-50 border-gray-300 text-pink-700 focus:border-pink-500 focus:ring-pink-500',
      },
    },
  },
};

const customThemeArea: CustomFlowbiteTheme['textarea'] = {
  colors: {
    primary:
      'bg-gray-50 border-gray-300 text-pink-700 focus:border-pink-500 focus:ring-pink-500',
  },
};

type FormGroupProps = {
  children?: ReactNode;
};

type LabelProps = {
  children?: ReactNode;
  htmlFor: string;
  error?: boolean;
};

type TextInputProps = {
  id: string;
  value: string;
  required?: boolean;
  type?: 'email' | 'text';
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  description?: string;
};

type TextAreaProps = {
  id: string;
  value: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  error?: boolean;
  description?: string;
};

type FileInputProps = {
  id: string;

  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

type FormGroupComponent = React.FC<FormGroupProps> & {
  Label: React.FC<LabelProps>;
  TextInput: React.FC<TextInputProps>;
  TextArea: React.FC<TextAreaProps>;
  FileInput: React.FC<FileInputProps>;
};

export const FormGroup: FormGroupComponent = ({ children }: FormGroupProps) => {
  return (
    <div className="mb-4 flex min-w-full max-w-md flex-col">{children}</div>
  );
};

FormGroup.Label = ({ children, htmlFor, error }: LabelProps) => {
  const color = error ? 'failure' : 'primary';

  return (
    <Label
      color={color}
      htmlFor={htmlFor}
      theme={{
        root: {
          colors: {
            primary: 'text-pink-700',
          },
        },
      }}
      className="mb-2"
    >
      {children}
    </Label>
  );
};

FormGroup.TextInput = ({
  required,
  type,
  id,
  value,
  onChange,
  onBlur,
  error,
  description,
}: TextInputProps) => {
  const color = error ? 'failure' : 'primary';

  return (
    <TextInput
      id={id}
      type={type}
      theme={customTheme}
      color={color}
      required={required}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      helperText={
        description && <span className="font-medium">{description}</span>
      }
    />
  );
};

FormGroup.TextArea = ({
  required,
  id,
  value,
  onChange,
  onBlur,
  error,
  description,
}: TextAreaProps) => {
  const color = error ? 'failure' : 'primary';

  return (
    <Textarea
      id={id}
      theme={customThemeArea}
      color={color}
      value={value}
      required={required}
      onChange={onChange}
      onBlur={onBlur}
      helperText={
        description && <span className="font-medium">{description}</span>
      }
    />
  );
};

FormGroup.FileInput = ({ id, required, onChange, onBlur }: FileInputProps) => {
  return (
    <FileInput
      id={id}
      required={required}
      onChange={onChange}
      onBlur={onBlur}
    ></FileInput>
  );
};
