import { AuthProvider, DataProvider } from '@files-manager/aws-services';
import FileManager from './fileManager';

export function App() {
  return (
    <>
      <AuthProvider>
        <DataProvider>
          <FileManager />
        </DataProvider>
      </AuthProvider>
    </>
  );
}

export default App;
