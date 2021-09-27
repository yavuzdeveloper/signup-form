import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';



test('renders sign up form title', () => {
  render(<App />);
  const titleElement = screen.getByText(/sign up form/i);
  const userDetailOneElement = screen.getByText(/user detail-1/i);
  const userDetailTwoElement = screen.getByText(/user detail-2/i);
  const userInformationSubmitElement = screen.getByText(/user informations/i);


  expect(titleElement).toBeInTheDocument();
  expect(userDetailOneElement).toBeInTheDocument();
  expect(userDetailTwoElement).toBeInTheDocument();
  expect(userInformationSubmitElement).toBeInTheDocument();
});

test('renders submit button', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /submit/i})).toBeEnabled();
});

test('renders input labels', () => {
  // render(<App expanded={true} />);

// <button>Submit</button>
fireEvent(screen.getByText('User detail-1'),
  new MouseEvent('click', {
    expanded: true,
    // cancelable: true,
  }),
)

  // userEvent.type(screen.getByPlaceholderText(/user namet/i), "yavuz");
  // userEvent.type(screen.getByPlaceholderText(/phone number/i), "0754653201");

  // expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();

});


// test('submit works properly', () => {   
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

//   userEvent.click(getByRole('button', { name: /submit/i }))

//   getByText(/ Congratulations, you have successfully signed up./i)
// });
