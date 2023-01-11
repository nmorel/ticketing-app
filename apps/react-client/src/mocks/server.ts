import { setupServer } from 'msw/node';
import { handlers as tickets } from './tickets';
import { handlers as users } from './users';

export const server = setupServer(...tickets, ...users);
