import { rest } from 'msw';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Chris' },
  { id: 4, name: 'Daisy' },
  { id: 5, name: 'Ed' },
];

export const handlers = [
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),
  rest.get('/api/users/:userId', (req, res, ctx) => {
    const userId = Number(req.params['userId']);
    if (!userId || Number.isNaN(userId)) {
      return res(ctx.status(400));
    }

    const user = users.find((t) => t.id === userId);
    if (!user) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200), ctx.json(user));
  }),
];
