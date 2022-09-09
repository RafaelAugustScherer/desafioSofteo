const validUser = {
  user: 'TestUser',
  password: '123x456',
};

const invalidUsers = [
  { user: 'TestUser' },
  { password: '123x456' },
  { user: 'TestUser', password: '123' },
  { user: '123', password: '123x456' },
];

export default {
  validUser,
  invalidUsers,
};