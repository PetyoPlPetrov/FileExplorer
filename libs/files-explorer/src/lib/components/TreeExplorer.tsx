import {
  FlexContainer,
  strpitNodeByOperationalKeys,
} from '@files-manager/components';
import { CurrentDir, TreeNode } from 'libs/aws-services/src/lib/types';
import { Dispatch, SetStateAction, memo } from 'react';
import { ExplorerSymbol } from './ExplorerSymbol';
import { LabelContainer } from './LabelContainer';
import { TextContainer } from './TextContainer';
interface TreeNodeExplorerProps {
  node: TreeNode;
  indent: number;
  expandedNodes: number[];
  toggleNode: (nodeId: number) => void;
  onCurrentDirChanged: Dispatch<SetStateAction<CurrentDir>>;
  currentDir: CurrentDir;
}
function TreeNodeExplorerInner({
  node,
  indent,
  expandedNodes,
  toggleNode,
  onCurrentDirChanged,
  currentDir,
}: TreeNodeExplorerProps) {
  const keys = Object.keys(node).filter(strpitNodeByOperationalKeys(node));
  return (
    <FlexContainer flexDirection="column" gap="0.5rem" padding="0.5rem">
      {keys.map((key) => {
        const currentNode = node[key] as TreeNode;
        const isFile = Boolean(currentNode?.isFile);
        const nodeId = currentNode?.id as number;

        return (
          <div key={currentDir.id + nodeId}>
            <LabelContainer
              justifyContent="flex-start"
              marginLeft={`${indent * 10}px`}
              cursor="pointer"
              fontWeight={
                `${nodeId}` === `${currentDir.id}` ? 'bold' : 'normal'
              }
              backgroundColor={
                `${nodeId}` === `${currentDir.id}` ? 'grey' : 'inherit'
              }
              boxShadow={// this css should come from css vars using global css file
                isFile
                  ? `rgba(0, 0, 0, 0.24) 0px 3px 8px;`
                  : `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
              rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset`
              }
              onDoubleClick={() => {
                onCurrentDirChanged({ name: key, id: nodeId as any });
              }}
            >
              {!isFile && (
                <ExplorerSymbol
                  alignItems="center"
                  justifyContent="center"
                  onClick={() => {
                    if (!isFile) {
                      toggleNode(nodeId);
                    }
                    onCurrentDirChanged({ name: key, id: nodeId as any });
                  }}
                >
                  {expandedNodes?.includes(nodeId) ? '-' : '+'}
                </ExplorerSymbol>
              )}
              <TextContainer
                onDoubleClick={() => {
                  onCurrentDirChanged({ name: key, id: currentNode.id as any });
                }}
                style={{ paddingRight: '0.5rem' }}
              >
                {key}
              </TextContainer>
            </LabelContainer>
            {expandedNodes?.includes(nodeId) && keys.length > 0 && (
              <FlexContainer
                flexDirection="column"
                padding="0.7rem"
                style={{
                  marginLeft: `${(indent + 1) * 10}px`,
                }}
              >
                <TreeNodeExplorer
                  node={currentNode}
                  indent={indent + 1}
                  expandedNodes={expandedNodes}
                  toggleNode={toggleNode}
                  onCurrentDirChanged={onCurrentDirChanged}
                  currentDir={currentDir}
                />
              </FlexContainer>
            )}
          </div>
        );
      })}
    </FlexContainer>
  );
}

export const TreeNodeExplorer = memo(TreeNodeExplorerInner)
