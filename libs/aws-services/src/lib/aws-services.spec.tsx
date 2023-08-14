import { render } from '@testing-library/react';

import AwsServices from './aws-services';

describe('AwsServices', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AwsServices />);
    expect(baseElement).toBeTruthy();
  });
});
