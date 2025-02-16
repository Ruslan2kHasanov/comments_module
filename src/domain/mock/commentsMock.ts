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
    date_create: '2025-02-16T11:54:00+03:00',
    rating: 5,
  },
  {
    id: '2',
    author_id: '2',
    text: 'Согласен, очень полезно. Спасибо автору!',
    date_create: '2025-02-16T09:30:00+03:00',
    rating: 4,
  },
  {
    id: '3',
    author_id: '2',
    text: 'Мне кажется, тема раскрыта не полностью. Можно было бы подробнее.',
    date_create: '2025-02-16T09:30:00+03:00',
    rating: -11,
  },
  {
    id: '4',
    author_id: '3',
    text: 'Спасибо за критику, учту в следующий раз!',
    date_create: '2025-02-13T09:30:00+03:00',
    rating: -1,
  },
  {
    id: '5',
    author_id: '1',
    text: 'Интересная статья, но есть пара ошибок в тексте.',
    date_create: '2025-02-03T08:30:00+03:00',
    rating: -9,
  },
];

export const commentsMock = (mock: MockAdapter) => {
  mock.onGet('/comments').reply(200, allComments);

  return mock;
};
