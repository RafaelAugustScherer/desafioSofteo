import md5 from 'md5';

const hashPassword = (password: string): string => (
  md5(password)
);

export default {
  hashPassword,
};