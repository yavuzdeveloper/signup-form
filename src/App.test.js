import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';



test('renders sign up form title and accordion headings', () => {
  render(<App />);

  expect(screen.getByRole('heading', {  name: /sign up form/i})).toBeEnabled();
  expect(screen.getByText(/sign up step-1/i)).toBeEnabled();
  expect(screen.getByText(/sign up step-2/i)).toBeEnabled();
  expect(screen.getByText(/sign up step-3/i)).toBeEnabled();
});

test('sign up step-1 button works correctly', () => {
  render(<App />);

  userEvent.click(screen.getByRole('button',  { name: /sign up step-1/i}));

  expect(screen.getByTestId('userName')).toBeEnabled();
  expect(screen.getByTestId('PhoneNumber')).toBeEnabled();
  expect(screen.getByRole('button', {  name: /next/i})).toBeEnabled();
});

test('sign up step-2 button works correctly', () => {
  render(<App />);

  userEvent.click(screen.getByRole('button',  { name: /sign up step-2/i}));
  expect(screen.getByTestId('email')).toBeEnabled()
  expect(screen.getByTestId('dateOfBirth')).toBeEnabled();
});

test('sign up step-3 button works correctly', () => {
  render(<App />);

  userEvent.click(screen.getByRole('button',  { name: /sign up step-3/i}));


  expect(screen.getByText(/user name:/i)).toBeEnabled();
  expect(screen.getByText(/phone number:/i)).toBeEnabled();
  expect(screen.getByText(/email:/i)).toBeEnabled();
  expect(screen.getByText(/birth date:/i)).toBeEnabled();
  expect(screen.getByRole('button', {  name: /confirm/i})).toBeEnabled();
});
