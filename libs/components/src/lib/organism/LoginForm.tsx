import { LoginDetails } from 'libs/aws-services/src/lib/types';
import React, { FormEvent, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';

export const StyledForm = styled.form`
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border-radius: 8px;
  width: 300px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.3rem;
`;
type LoginFormProps = {
  onLoginClicked: () => void;
};
export function LoginForm({ onLoginClicked }: LoginFormProps) {
  const [credentials, setCredentials] = React.useState<LoginDetails>({
    accessKeyId: '',
    secretAccessKey: '',
    region: '',
    bucketName: '',
  });

  const setState = useCallback((name: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((state) => ({ ...state, [name]: e.target.value }));
    };
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onLoginClicked();
    },
    [onLoginClicked]
  );

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <Label>AccessKey:</Label>
        <Input
          type="password"
          value={credentials.accessKeyId}
          onChange={setState('accessKeyId')}
        />
        <Label>Secret AccessKey:</Label>
        <Input
          type="password"
          value={credentials.secretAccessKey}
          onChange={setState('secretAccessKey')}
        />
        <Label>Region:</Label>
        <Input
          type="text"
          value={credentials.region}
          onChange={setState('region')}
        />
        <Label>Bucket:</Label>
        <Input
          type="text"
          value={credentials.bucketName}
          onChange={setState('bucketName')}
        />

        <Button type="submit">Login</Button>
      </StyledForm>
    </>
  );
}
