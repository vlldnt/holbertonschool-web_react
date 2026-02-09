import { expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';

describe('Body with margin bottom tests', () => {
  test('component contains a div with the class bodySectionWithMargin', () => {
    const { container } = render(<BodySectionWithMarginBottom test="test" />);
    const div = container.querySelector('.bodySectionWithMargin');
    expect(div).toBeInTheDocument();
  });

  test('component renders the BodySection component', () => {
    const { container } = render(<BodySectionWithMarginBottom test="test" />);
    const classBody = container.querySelector('.bodySection');
    expect(classBody).toBeInTheDocument();
  });
});
