import { rest } from 'msw';

const tickets = [
  {
    id: 1,
    description: 'Install a monitor arm',
    assigneeId: 1,
    completed: false,
  },
  {
    id: 2,
    description: 'Move the desk to the new location',
    assigneeId: 1,
    completed: false,
  },
];

export const handlers = [
  rest.get('/api/tickets', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(tickets));
  }),
  rest.get('/api/tickets/:ticketId', (req, res, ctx) => {
    const ticketId = Number(req.params['ticketId']);
    if (!ticketId || Number.isNaN(ticketId)) {
      return res(ctx.status(400));
    }

    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200), ctx.json(ticket));
  }),
];
