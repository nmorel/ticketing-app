import wretch from 'wretch';

import { Ticket } from '@acme/shared-models';

export function fetchTickets() {
  return wretch(`/api/tickets`).get().json<Ticket[]>();
}

export function fetchTicket(ticketId: string) {
  return wretch(`/api/tickets/${ticketId}`).get().json<Ticket>();
}
