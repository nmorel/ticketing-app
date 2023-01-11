import { Ticket } from '@acme/shared-models';
import {
  createMemoryHistory,
  Link,
  ReactLocation,
} from '@tanstack/react-location';
import { useQuery } from 'react-query';
import { fetchTickets } from '../../services/tickets';
import styles from './tickets.module.css';

export function Tickets() {
  const { data, isError, isSuccess, error } = useQuery<Ticket[], any>(
    'tickets',
    fetchTickets
  );
  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      {isSuccess ? (
        <ul>
          {data.map((ticket) => (
            <li key={ticket.id}>
              <Link to={`/${ticket.id}`} preload={1000}>
                Ticket #{ticket.id}: {ticket.description}
              </Link>
            </li>
          ))}
        </ul>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}
