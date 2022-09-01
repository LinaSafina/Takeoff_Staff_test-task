import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup
    .string()
    .required('Phone is required')
    .test('Validate Phone', 'Enter valid phone number', (value) => {
      const regExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return regExp.test(value || '');
    }),
  gender: yup.string().required('Gender is required'),
});
