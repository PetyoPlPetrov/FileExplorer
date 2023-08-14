import { useFiles } from '@files-manager/aws-services';
import {
  AddEntity,
  DeleteEntity,
  FlexContainer,
  buildChildrenIds,
  buildTreeFromStrings,
} from '@files-manager/components';
import { FilesExplorer } from '@files-manager/files-explorer';
import { FilesViewer } from '@files-manager/files-viewer';
import { CurrentDir, File, TreeNode } from 'libs/aws-services/src/lib/types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { withAuth } from '../hocs/withAuth';

const LayoutWrapper = styled(FlexContainer)`
  .explorer {
    height: 100vh;
    overflow: scroll;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    border-radius: 3px;
  }
  .viewer {
    height: 100vh;
    overflow: scroll;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }
`;

export function FileManager({ username }: { username: string }) {
  const { files, getItems, handleUpload, deleteObjects } = useFiles();
  const [currentDir, setCurrentDir] = useState<CurrentDir>({
    name: '',
    id: '',
  });

  const [itemToBeDeleted, setItemToBeDeleted] = useState<TreeNode | null>(null);

  useEffect(() => {
    getItems();
  }, []);

  const { tree, nodes } = useMemo(() => buildTreeFromStrings(files), [files]);

  useEffect(() => {
    const currentDirNode = nodes.get(currentDir.id);
    if (currentDirNode !== undefined) {
      setItemToBeDeleted(currentDirNode);
    } else {
      setItemToBeDeleted(null);
    }
  }, [currentDir]);

  let currentDirPath = (nodes.get(currentDir.id) as TreeNode)?.path || '';

  const onUpload = useCallback(
    (file: File) => {
      const isFolder = file.content === '';

      handleUpload({
        content: file.content,
        name: currentDirPath + '/' + file.name + (isFolder ? '' : '.txt'),
      });
    },
    [currentDirPath]
  );

  const onDeleteFile = useCallback((keys: string[]) => {
    deleteObjects(keys);
    setItemToBeDeleted(null);
  }, []);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <p>Welcome, {username}</p>
          <LayoutWrapper gap="0.5rem">
            <div className="explorer">
              <FilesExplorer
                currentDir={currentDir}
                onCurrentDirChanged={setCurrentDir}
                tree={tree}
              ></FilesExplorer>
            </div>
            <div className="viewer">
              <FilesViewer
                currentDirName={currentDir.name}
                currentDir={nodes.get(currentDir.id)}
                onItemClicked={setItemToBeDeleted}
                selected={itemToBeDeleted}
              >
                {!nodes.get(currentDir.id)?.isFile && (
                  <AddEntity onUpload={onUpload} />
                )}
                {itemToBeDeleted && (
                  <DeleteEntity
                    entity={itemToBeDeleted}
                    onDeleteFile={onDeleteFile}
                    findChildrenIds={buildChildrenIds}
                  ></DeleteEntity>
                )}
              </FilesViewer>
            </div>
          </LayoutWrapper>
        </div>
      </div>
    </>
  );
}

export default withAuth(FileManager);
