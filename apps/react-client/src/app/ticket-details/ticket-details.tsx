import { Ticket } from '@acme/shared-models';
import { useMatch } from '@tanstack/react-location';
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

  if (isError) {
    console.log(error);
    // TODO redirect to an error page
    return null;
  }

  return (
    <div className={styles['container']}>
      <h1>Ticket #{ticketId}</h1>
      {isSuccess ? <div>{ticket.description}</div> : <span>...</span>}
    </div>
  );
}
