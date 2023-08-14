import { render } from '@testing-library/react';

import FilesViewer from './files-viewer';

describe('FilesViewer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilesViewer />);
    expect(baseElement).toBeTruthy();
  });
});
