import { Ticket } from '@acme/shared-models';
import { useMatch, Navigate } from '@tanstack/react-location';
import { useQuery } from 'react-query';
import { fetchTicket } from '../../services/tickets';
import styles from './ticket-details.module.css';

export function TicketDetails() {
  const {
    params: { ticketId },
  } = useMatch();

  const {
    isError,
    error,
    isSuccess,
    data: ticket,
  } = useQuery<Ticket, any>(
    ['tickets', ticketId],
    () => fetchTicket(ticketId),
    {
      enabled: !!ticketId,
    }
  );

  return (
    <div className={styles['container']}>
      <h1>Ticket #{ticketId}</h1>
      {isError ? (
        error.status === 404 ? (
          <div>Not found</div>
        ) : (
          <div>Error {error.message}</div>
        )
      ) : isSuccess ? (
        <div>{ticket.description}</div>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}
