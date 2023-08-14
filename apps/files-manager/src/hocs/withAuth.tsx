import { useAuth } from '@files-manager/aws-services';
import { FlexContainer, LoginForm } from '@files-manager/components';
interface MyComponentProps {
  username: string;
}
export const withAuth =
  (Component: React.ComponentType<MyComponentProps>) => () => {
    const { login, isLogged } = useAuth();

    const handleLogin = () => {
      login({
        accessKeyId: 'AKIAZ5RCAHL6CPUVFJ3Z',
        secretAccessKey: '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',
        region: 'eu-central-1',
        bucketName: 'interview-task-p-petrov-f296db9054761482',
      });
    };
    return (
      <div className="wrapper">
        <div className="container">
          {isLogged ? (
            <Component username="Logged user" />
          ) : (
            <FlexContainer justifyContent="center">
              <LoginForm onLoginClicked={handleLogin} />
            </FlexContainer>
          )}
        </div>
      </div>
    );
  };
