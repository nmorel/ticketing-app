import { setupServer } from 'msw/node';
import { handlers as tickets } from './tickets';

export const server = setupServer(...tickets);
