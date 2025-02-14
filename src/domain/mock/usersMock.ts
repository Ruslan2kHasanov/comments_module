// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { TUser } from '../user/TUser';

const names = [
  'Alice Smith',
  'Bob Johnson',
  'Charlie Brown',
  'Diana Miller',
  'Ethan Davis',
  'Fiona Wilson',
  'George Taylor',
  'Hannah Anderson',
  'Isaac Thomas',
  'Julia Moore',
];

const avaURL =
  'https://rgo.ru/upload/s34web.imageadapter/7fae7299de24d53e014c8ec160d19c03/yuriy_ufimcev_fioletovyy_zakat_536530.jpg';

const generateUsers = (count: number): TUser[] => {
  const users: TUser[] = [];
  for (let i = 0; i < count; i += 1) {
    users.push({
      id: (i + 2).toString(),
      name: names[i % names.length],
      email: `user${i + 2}@example.com`,
      avatar: i % 2 === 1 ? avaURL : null,
    });
  }
  return users;
};

const user: TUser = {
  email: 'adminson@usons.ru',
  id: '1',
  name: 'Admin',
  avatar: avaURL,
};

const users: TUser[] = [user, ...generateUsers(9)];

export const usersMock = (mock: MockAdapter) => {
  mock.onGet('/users').reply(200, users);
  mock.onGet('/users/me').reply(200, user);

  return mock;
};
