import { render } from '@testing-library/react';
import App from './App';
import React from "react"

test('renders without crashing', () => {
  render(<App />);
});

