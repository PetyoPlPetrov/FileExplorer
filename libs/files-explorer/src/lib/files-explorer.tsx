import { CurrentDir, TreeNode } from 'libs/aws-services/src/lib/types';
import { Dispatch, SetStateAction, memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { TreeNodeExplorer } from './components/TreeExplorer';

/* eslint-disable-next-line */

export interface FilesExplorerProps {
  tree: TreeNode;
  currentDir: CurrentDir;
  onCurrentDirChanged: Dispatch<SetStateAction<CurrentDir>>;
}

const StyledFilesExplorer = styled.div`
  color: pink;
  min-width: 200px;
`;

function FilesExplorerInner({
  tree,
  onCurrentDirChanged,
  currentDir,
}: FilesExplorerProps) {
  const [expandedNodes, setExpandedNodes] = useState<number[]>([]);
  const toggleNode = useCallback(
    (nodeId: number) => {
      if (expandedNodes.includes(nodeId)) {
        setExpandedNodes(expandedNodes.filter((id: number) => id !== nodeId));
      } else {
        setExpandedNodes([...expandedNodes, nodeId]);
      }
    },
    [expandedNodes]
  );

  return (
    <StyledFilesExplorer>
      <div>
        <TreeNodeExplorer
          onCurrentDirChanged={onCurrentDirChanged}
          currentDir={currentDir}
          node={tree}
          indent={0}
          expandedNodes={expandedNodes}
          toggleNode={toggleNode}
        />
      </div>
    </StyledFilesExplorer>
  );
}
export const FilesExplorer = memo(FilesExplorerInner);
