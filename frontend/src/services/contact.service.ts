import api from './api';

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const contactService = {
  submitForm: (data: ContactData) => {
    return api.post('/contact/submit', data);
  }
};
