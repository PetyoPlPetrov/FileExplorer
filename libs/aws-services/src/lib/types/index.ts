export type LoginDetails = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
};
export type User = {
  username: string;
};
export type AuthContextType = {
  login: (loginDetails: LoginDetails | null) => void;
  logout: () => void;
  isLogged: boolean;
  loginDetails: LoginDetails;
};

export interface File {
  name: string;
  content: string;
}

export type DataContextType = {
  files: string[];
  getItems: () => void;
  handleUpload: (file: File) => void;
  deleteObjects: (key: string[]) => void;
  getObject: (key: string) => Promise<string | undefined>;
};

export interface TreeNode {
  [key: string]: TreeNode | boolean | number | string;
}
export interface CurrentDir {
  name: string;
  id: string;
  isFile?: boolean;
}

export interface AddFileProps {
  onUpload: (file: File) => void;
}

export interface AddFolderProps {
  onUpload: (file: File) => void;
}
