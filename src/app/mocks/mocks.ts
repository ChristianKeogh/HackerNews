import { HackerNewsPost } from '../models/app.models';

export const mockPost: HackerNewsPost = {
  id: 1,
  by: 'user123',
  time: 1700000000,
  title: 'Test Post',
  url: 'https://example.com',
  score: 123,
  kids: [11, 12, 13],
  descendants: 10,
  type: 'story',
};

export const mockIds = Array.from(Array(100).keys(), (i) => i + 1);
