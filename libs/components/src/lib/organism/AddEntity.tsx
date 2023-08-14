import { File } from 'libs/aws-services/src/lib/types';
import { useCallback, useState } from 'react';
import { FlexContainer } from '../atoms';
import { Button } from '../atoms/Button';
import { CloseContainer } from '../atoms/CloseContainer';
import { AddFile, AddFolder } from '../molecules';

interface AddEntityProps {
  onUpload: (file: File) => void;
}

export const AddEntity = ({ onUpload }: AddEntityProps) => {
  const [addEntity, setAdd] = useState(false);
  const [state, setState] = useState({ addFile: false, addFolder: false });
  const onAddFile = useCallback(() => {
    setState({ addFolder: false, addFile: true });
  }, []);

  const onAddFolder = useCallback(() => {
    setState({ addFolder: true, addFile: false });
  }, []);

  return (
    <div>
      {!addEntity && <Button onClick={() => setAdd(true)}>Add Entity</Button>}

      <CloseContainer>
        {addEntity && <button onClick={() => setAdd(false)}>X</button>}
        {addEntity && (
          <>
            <FlexContainer gap="1rem" padding="1rem">
              <Button onClick={onAddFile}>Add file</Button>
              <Button onClick={onAddFolder}>Add folder</Button>
            </FlexContainer>
            <FlexContainer gap="1rem" padding="1rem">
              {state.addFile && <AddFile onUpload={onUpload} />}
              {state.addFolder && <AddFolder onUpload={onUpload} />}
            </FlexContainer>
          </>
        )}
      </CloseContainer>
    </div>
  );
};
