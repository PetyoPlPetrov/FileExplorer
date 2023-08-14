import { useFiles } from '@files-manager/aws-services';
import { TreeNode } from 'libs/aws-services/src/lib/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface FileContentProps {
  file: TreeNode;
}
const FileContainer = styled.div`
  min-width: 400px;
  min-height: 400px;
  margin: 1rem;
`;
export const FileContent = ({ file }: FileContentProps) => {
  const { getObject } = useFiles();
  const [fileContent, setFileContent] = useState<string>();

  useEffect(() => {
    if (file.path) {
      getObject(file.path as string).then((content) => {
        setFileContent(content);
      });
    }
  }, [file]);

  return <FileContainer>{fileContent}</FileContainer>;
};
