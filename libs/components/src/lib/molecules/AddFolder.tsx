import { AddFolderProps } from 'libs/aws-services/src/lib/types';
import { useState } from 'react';
import { FlexContainer, Input } from '../atoms';
import { Button } from '../atoms/Button';

export const AddFolder = ({ onUpload }: AddFolderProps) => {
  const [folderName, setFolderName] = useState('');

  const handleUpload = () => {
    if (folderName) {
      onUpload({ name: folderName + '/', content: '' });
    }
  };

  return (
    <FlexContainer flexDirection="column">
      <h2>Folder Upload to Amazon S3</h2>
      <Input type="text" onChange={(e) => setFolderName(e.target.value)} />
      <Button disabled={folderName === ''} onClick={handleUpload}>
        Upload Folder
      </Button>
    </FlexContainer>
  );
};
