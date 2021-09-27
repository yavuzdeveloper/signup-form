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
  expect(screen.getByText(/you must be over 18 years old!/i)).toBeEnabled();
  expect(screen.getByRole('button', {  name: /next/i})).toBeEnabled();
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

test('renders confirm button', () => {
  render(<App />);

  userEvent.click(screen.getByRole('button',  { name: /sign up step-3/i}));
  // userEvent.click(screen.getByRole('button', {  name: /confirm/i}));
  //expect(screen.getByText(/Please fill in the required fields/i)).toBeEnabled();

  //expect(screen.getByRole('heading', {  name: /congratulations, you have successfully signed up\./i})).toBeEnabled();
});









//screen.getByText(/sign up step\-1/i)
//container.querySelector('#root > div > div > form > div:nth-child(1) > div:nth-child(1) > div')



// test('renders submit button', () => {
//   render(<App />);
//   expect(screen.getByRole('button', { name: /confirm/i})).toBeEnabled();
// });

// test('renders input labels', () => {
//   // render(<App expanded={true} />);

// // <button>Submit</button>
// fireEvent(screen.getByText('User detail-1'),
//   new MouseEvent('click', {
//     expanded: true,
//     // cancelable: true,
//   }),
// )

//   // userEvent.type(screen.getByPlaceholderText(/user namet/i), "yavuz");
//   // userEvent.type(screen.getByPlaceholderText(/phone number/i), "0754653201");

//   // expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();

// });


// test('confirm works properly', () => {   
//   const mockFormData = {
//     userName: 'test name',
//     phoneNumber: 'test last name', 
//     email: 'test@mail.com',
//     selectedDate: '12/12/1999',
//   }
//   const { getByRole, getByText, getByLabelText } = render(<App />)

//   userEvent.paste(getByLabelText(/user name/i), mockFormData.userName)
//   userEvent.paste(getByLabelText(/phone number/i), mockFormData.phoneNumber)
//   userEvent.paste(getByLabelText(/email/i), mockFormData.email)
//   userEvent.paste(getByLabelText(/birth date/i), mockFormData.selectedDate)

//   userEvent.click(getByRole('button', { name: /confirm/i }))

//   getByText(/ Congratulations, you have successfully signed up./i)
// });
