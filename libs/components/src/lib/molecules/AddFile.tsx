import { AddFileProps, File } from 'libs/aws-services/src/lib/types';
import { useCallback, useState } from 'react';
import { FlexContainer, Input } from '../atoms';
import { Button } from '../atoms/Button';

export const AddFile = ({ onUpload }: AddFileProps) => {
  const [file, setFileDetails] = useState<File>({ name: '', content: '' });

  const setState = useCallback((name: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFileDetails((state) => ({ ...state, [name]: e.target.value }));
    };
  }, []);

  const handleUpload = () => {
    if (file.name) {
      onUpload(file);
    }
  };

  return (
    <FlexContainer flexDirection="column">
      <h2>File Upload to Amazon S3</h2>
      <Input type="text" onChange={setState('name')} />
      <Input type="text" onChange={setState('content')} />
      <Button disabled={file.name === ''} onClick={handleUpload}>
        Upload File
      </Button>
    </FlexContainer>
  );
};
