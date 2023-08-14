import AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { DataContextType, File } from '../types';
import { useAuth } from './AuthProvider';

const DataContext = createContext({} as DataContextType);

export const DataProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [files, setFiles] = useState<string[]>([]);
  const { loginDetails } = useAuth();
  const bucketName = loginDetails.bucketName;
  const context = useMemo(() => {
    return {
      files,
      handleUpload: (file: File) => {
        const s3 = new AWS.S3();
        const params = {
          Bucket: bucketName,
          Key: file.name,
          Body: file.content,
        };

        s3.upload(params, (err: Error, data: ManagedUpload.SendData) => {
          if (err) {
            console.error('Error uploading object:', err);
          } else {
            console.log('Object uploaded successfully:', data.Location);
            setFiles((prev) => [...prev, file.name]);
          }
        });
      },
      getObject: async (objectKey: string): Promise<string | undefined> => {
        const s3 = new AWS.S3();
        const getObjectParams = {
          Bucket: bucketName,
          Key: objectKey,
        };
        try {
          const objectResponse = await s3.getObject(getObjectParams).promise();
          const objectContent = objectResponse?.Body?.toString();
          return objectContent;
          console.log(`Content of ${objectKey}:`, objectContent);
        } catch (error) {
          console.error(`Error retrieving content of ${objectKey}:`, error);
        }
      },
      deleteObjects: async (objectKeys: string[]) => {
        const s3 = new AWS.S3();
        objectKeys.forEach(async (objectKey) => {
          const getObjectParams = {
            Bucket: bucketName,
            Key: objectKey,
          };
          try {
            await s3.deleteObject(getObjectParams).promise();
            setFiles((prev) =>
              prev.filter((file) => !objectKeys.includes(file))
            );
          } catch (error) {
            console.error(`Error in deletion of ${objectKey}:`, error);
          }
        });
      },
      getItems: () => {
        const s3 = new AWS.S3();

        if (AWS.config.credentials && AWS.config.credentials.secretAccessKey) {
          s3.listObjectsV2(
            { Bucket: bucketName },
            (err: AWS.AWSError, data: AWS.S3.ListObjectsV2Output) => {
              if (err) {
                console.error('Error fetching files:', err);
              } else {
                const keys = data?.Contents?.map((file) => file.Key) || [];
                setFiles(keys as string[]);
              }
            }
          );
        }
      },
    };
  }, [files, bucketName]);

  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export const useFiles = () => {
  return useContext(DataContext);
};
