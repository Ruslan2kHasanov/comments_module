// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { TComment } from '../comment/TComment';

const allComments: TComment[] = [];

export const commentsMock = (mock: MockAdapter) => {
  mock.onGet('/comments').reply(200, allComments);

  return mock;
};
