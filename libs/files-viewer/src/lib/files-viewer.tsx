import {
  File,
  FlexContainer,
  Folder,
  strpitNodeByOperationalKeys,
} from '@files-manager/components';
import { TreeNode } from 'libs/aws-services/src/lib/types';
import { Button } from 'libs/components/src/lib/atoms/Button';
import { CloseContainer } from 'libs/components/src/lib/atoms/CloseContainer';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FileContent } from './components/FileContent';

/* eslint-disable-next-line */
export interface FilesViewerProps {
  currentDir: TreeNode | undefined;
  currentDirName: string;
  children: React.ReactNode;
  onItemClicked: React.Dispatch<React.SetStateAction<TreeNode | null>>;
  selected: TreeNode | null;
}

const StyledFilesViewer = styled.div`
  color: #b19499;
  max-width: 500px;
  min-width: 500px;
  padding: 0.5rem;
`;

export function FilesViewer({
  currentDir = {},
  currentDirName,
  children,
  onItemClicked,
  selected,
}: FilesViewerProps) {
  const [fileToBeShown, setSingleView] = useState<TreeNode>();

  const files = Object.keys(currentDir).filter(
    strpitNodeByOperationalKeys(currentDir)
  );

  useEffect(() => {
    setSingleView(undefined);
  }, [currentDir]);

  if (fileToBeShown) {
    return (
      <StyledFilesViewer>
        <FlexContainer>
          <CloseContainer>
            <button onClick={() => setSingleView(undefined)}>X</button>
            <FileContent file={fileToBeShown}></FileContent>
          </CloseContainer>
        </FlexContainer>
      </StyledFilesViewer>
    );
  }

  return (
    <StyledFilesViewer>
      <h1>
        {currentDirName === '' ? (
          'Select directory from the FileExplorer'
        ) : (
          <>Current directory:{currentDirName}</>
        )}
      </h1>
      <FlexContainer gap="1rem">{children}</FlexContainer>
      <FlexContainer gap="1rem" wrap="wrap" padding="1rem">
        {!currentDir.isFile &&
          files.map((file) => {
            // this should me memoized using useMemo or export in new memo(Component)
            const entityId = (currentDir[file] as TreeNode).id as string;
            const entity = currentDir[file] as TreeNode;
            const isFolder = !(currentDir[file] as TreeNode)?.isFile;

            if (isFolder) {
              return (
                <Folder
                  selected={selected?.id === entityId}
                  onClick={() => {
                    if (entity != selected) {
                      onItemClicked(entity);
                    } else {
                      onItemClicked(currentDir);
                    }
                  }}
                  justifyContent="center"
                  alignItems="center"
                  key={file}
                >
                  {file}
                </Folder>
              );
            }
            return (
              <File
                cursor="pointer"
                flexDirection="column"
                selected={selected?.id === entityId}
                onClick={() => {
                  if (entity != selected) {
                    onItemClicked(entity);
                  } else {
                    onItemClicked(currentDir);
                  }
                }}
                justifyContent="center"
                alignItems="center"
                key={file}
              >
                {file}
                <Button
                  backgroundColor="#cdb5b5"
                  onClick={() => setSingleView(entity)}
                >
                  Open file
                </Button>
              </File>
            );
          })}
      </FlexContainer>
    </StyledFilesViewer>
  );
}

export default FilesViewer;
