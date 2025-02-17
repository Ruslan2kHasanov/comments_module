// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { TComment, TCommentsUserChanged } from '../comment/TComment';

const allComments: (Omit<TComment, 'date_create'> & {
  date_create: string;
})[] = [
  {
    id: '1',
    author_id: '1',
    text: 'Отличный пост, много нового узнал!',
    date_create: '2025-02-16T12:54:00+03:00',
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
    text: 'Мне кажется, тема раскрыта не полностью. Можно было бы подробнее. Мне кажется, тема раскрыта не полностью. Можно было бы подробнее. Мне кажется, тема раскрыта не полностью. Можно было бы подробнее. Мне кажется, тема раскрыта не полностью. Можно было бы подробнее.',
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
    author_id: '10',
    text: 'Интересная статья, но есть пара ошибок в тексте.',
    date_create: '2025-02-03T08:30:00+03:00',
    rating: 0,
  },
  {
    id: '6',
    author_id: '3',
    text: 'Спасибо за критику, учту в следующий раз!',
    date_create: '2025-02-13T09:30:00+03:00',
    rating: -1,
  },
  {
    id: '7',
    author_id: '10',
    text: 'Интересная статья, но есть пара ошибок в тексте.',
    date_create: '2025-02-03T08:30:00+03:00',
    rating: -9,
  },
  {
    id: '8',
    author_id: '7',
    text: 'Интересная статья, но есть пара ошибок в тексте.',
    date_create: '2025-02-03T08:30:00+03:00',
    rating: 100,
  },
];

const commentsThatUserChanged: TCommentsUserChanged[] = [
  {
    id_comment: '2',
    rating_val: 1,
  },
  {
    id_comment: '5',
    rating_val: -1,
  },
];

export const commentsMock = (mock: MockAdapter) => {
  mock.onGet('/comments').reply(200, allComments);
  mock.onPost('/comments').reply(200, null);
  mock.onGet('/comments/changed').reply(200, commentsThatUserChanged);

  return mock;
};
