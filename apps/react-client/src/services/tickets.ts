import wretch from 'wretch';

import { Ticket } from '@acme/shared-models';

export function fetchTickets() {
  return wretch(`/api/tickets`).get().json<Ticket[]>();
}

export function fetchTicket(ticketId: string) {
  return wretch(`/api/tickets/${ticketId}`).get().json<Ticket>();
}

export function addTicket(body: {
  description: string;
  assigneeId: number | null;
}) {
  return wretch(`/api/tickets`).post(body).json<Ticket>();
}

export function setAssignee({
  ticketId,
  assigneeId,
}: {
  ticketId: number;
  assigneeId: number | null;
}) {
  if (assigneeId) {
    return wretch(`/api/tickets/${ticketId}/assign/${assigneeId}`).put().res();
  } else {
    return wretch(`/api/tickets/${ticketId}/assign`).delete().res();
  }
}

export function setCompleted({
  ticketId,
  completed,
}: {
  ticketId: number;
  completed: boolean;
}) {
  if (completed) {
    return wretch(`/api/tickets/${ticketId}/complete`).put().res();
  } else {
    return wretch(`/api/tickets/${ticketId}/complete`).delete().res();
  }
}
