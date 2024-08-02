import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    email: '',
    firstName: '',
    lastName: '',
    id: '',
    image_url: ''
  }, 
});
