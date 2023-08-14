import { TreeNode } from 'libs/aws-services/src/lib/types';
import { useEffect, useState } from 'react';
import { FlexContainer } from '../atoms';
import { Button } from '../atoms/Button';
import { CloseContainer } from '../atoms/CloseContainer';

interface DeleteEntityProps {
  entity: TreeNode;
  onDeleteFile: (keys: string[]) => void;
  findChildrenIds: (node: TreeNode, arr: string[]) => string[];
}

export const DeleteEntity = ({
  entity,
  onDeleteFile,
  findChildrenIds,
}: DeleteEntityProps) => {
  const [entityToBeDeleted, setEntityToBeDeleted] = useState(false);
  const [name] = (entity.path as string).split('/').reverse();
  const files = Object.keys(entity)
    .filter((e) => !Number.isInteger(entity[e]) && e !== 'path')
    .join(',');
  const isFolder = !entity.isFile;

  useEffect(() => {
    setEntityToBeDeleted(false);
  }, [entity]);

  return (
    <div>
      {!entityToBeDeleted && (
        <Button
          backgroundColor="#8f5a7e"
          onClick={() => setEntityToBeDeleted(true)}
        >
          Delete entity
        </Button>
      )}

      <CloseContainer>
        {entityToBeDeleted && (
          <button onClick={() => setEntityToBeDeleted(false)}>X</button>
        )}
        {entityToBeDeleted && (
          <>
            <FlexContainer gap="1rem" padding="1rem">
              <Button
                backgroundColor="#8f5a7e"
                onClick={() => {
                  onDeleteFile(findChildrenIds(entity, []));
                  setEntityToBeDeleted(false);
                }}
              >
                Delete entity {name}
                {isFolder && ` and its content: ${files}`}
              </Button>
            </FlexContainer>
          </>
        )}
      </CloseContainer>
    </div>
  );
};
