import { rest } from 'msw';

export default [
  rest.get('https://the_api_url_you_want.com', (_, res, ctx) =>
    res(ctx.json({}))
  ),
];
