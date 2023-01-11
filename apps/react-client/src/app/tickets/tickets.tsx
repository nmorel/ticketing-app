import { Ticket } from '@acme/shared-models';
import { Link } from '@tanstack/react-location';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchTickets } from '../../services/tickets';
import { AddTicket } from '../add-ticket/add-ticket';
import styles from './tickets.module.css';

const allStatuses = ['all', 'incomplete', 'completed'] as const;
type Status = typeof allStatuses[number];

export function Tickets() {
  const { data, isError, isSuccess, error } = useQuery<Ticket[], any>(
    'tickets',
    fetchTickets
  );
  const [status, setStatus] = useState<Status>(allStatuses[0]);
  return (
    <div className={styles['container']}>
      <AddTicket />
      <h2>Tickets</h2>
      <label>
        Status:{' '}
        <select
          value={status}
          onChange={(evt) => setStatus(evt.target.value as Status)}
        >
          <option value="all">All</option>
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      {isSuccess ? (
        <ul>
          {data
            .filter((ticket) => {
              switch (status) {
                case 'all':
                  return true;
                case 'completed':
                  return ticket.completed;
                case 'incomplete':
                  return !ticket.completed;
              }
            })
            .map((ticket) => (
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
