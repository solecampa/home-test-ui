import { FormData } from '../utils/FormData';
import { LoginData } from '../utils/LoginData';

export const formData: FormData = {
  fullName: 'Soledad Campana',
  email: 'sole.coding.challenge@test.com',
  address: '123 Main St',
  city: 'Springfield',
  state: 'IL',
  zip: '62704',
  nameOnCard: 'Soledad Campana',
  cardNumber: '4111111111111111',
  expMonth: 'January',
  expYear: '2027',
  cvv: '123',
  shippingSameAsBilling: true
};

export const validUser: LoginData = {
  username: 'johndoe19',
  password: 'supersecret'
};

export const invalidUser: LoginData = {
  username: 'wronguser',
  password: 'wrongpass'
};

