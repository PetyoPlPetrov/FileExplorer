import { render } from '@testing-library/react';

import FilesExplorer from './files-explorer';

describe('FilesExplorer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilesExplorer />);
    expect(baseElement).toBeTruthy();
  });
});
