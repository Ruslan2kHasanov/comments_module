// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { TComment } from '../comment/TComment';

const allComments: (Omit<TComment, 'date_create'> & {
  date_create: string;
})[] = [
  {
    id: '1',
    author_id: '1',
    text: 'Отличный пост, много нового узнал!',
    date_create: '2024-01-26T10:00:00Z',
    rating: 5,
  },
  {
    id: '2',
    author_id: '2',
    text: 'Согласен, очень полезно. Спасибо автору!',
    date_create: '2024-01-26T10:15:00Z',
    rating: 4,
    reply_to_id: '1',
  },
  {
    id: '3',
    author_id: '2',
    text: 'Мне кажется, тема раскрыта не полностью. Можно было бы подробнее.',
    date_create: '2024-01-26T10:30:00Z',
    rating: -11,
    reply_to_id: '1',
  },
  {
    id: '4',
    author_id: '3',
    text: 'Спасибо за критику, учту в следующий раз!',
    date_create: '2024-01-26T10:45:00Z',
    rating: -1,
  },
  {
    id: '5',
    author_id: '1',
    text: 'Интересная статья, но есть пара ошибок в тексте.',
    date_create: '2024-01-26T11:00:00Z',
    rating: -9,
  },
];

export const commentsMock = (mock: MockAdapter) => {
  mock.onGet('/comments').reply(200, allComments);

  return mock;
};
