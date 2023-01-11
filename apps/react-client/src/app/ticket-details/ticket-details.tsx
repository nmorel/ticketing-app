import { Ticket } from '@acme/shared-models';
import { Link, useMatch } from '@tanstack/react-location';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { fetchTicket, setAssignee, setCompleted } from '../../services/tickets';
import { fetchUsers } from '../../services/users';
import styles from './ticket-details.module.css';

function TicketAssignee({ ticket }: { ticket: Ticket }) {
  const queryClient = useQueryClient();
  const { data: users, isSuccess } = useQuery('users', fetchUsers);
  const setAssigneeMutation = useMutation(setAssignee, {
    onSuccess() {
      queryClient.invalidateQueries(['tickets', ticket.id]);
    },
  });
  return (
    <label>
      Assignee:{' '}
      {isSuccess && (
        <select
          defaultValue={ticket.assigneeId ?? ''}
          onChange={(evt) => {
            setAssigneeMutation.mutate({
              ticketId: ticket.id,
              assigneeId: evt.target.value ? Number(evt.target.value) : null,
            });
          }}
          disabled={setAssigneeMutation.isLoading}
        >
          <option value=""></option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      )}
    </label>
  );
}

function TicketCompleted({ ticket }: { ticket: Ticket }) {
  const queryClient = useQueryClient();
  const setCompletedMutation = useMutation(setCompleted, {
    onSuccess() {
      queryClient.invalidateQueries(['tickets', ticket.id]);
    },
  });
  return (
    <label>
      Completed:{' '}
      <input
        type="checkbox"
        defaultChecked={ticket.completed}
        onChange={(evt) => {
          setCompletedMutation.mutate({
            ticketId: ticket.id,
            completed: evt.target.checked,
          });
        }}
        disabled={setCompletedMutation.isLoading}
      />
    </label>
  );
}

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
      <Link to={`/`}>← Back to home</Link>
      <h1>Ticket #{ticketId}</h1>
      {isError ? (
        error.status === 404 ? (
          <div>Not found</div>
        ) : (
          <div>Error {error.message}</div>
        )
      ) : isSuccess ? (
        <div className={styles['details']}>
          <div>{ticket.description}</div>
          <TicketAssignee ticket={ticket} />
          <TicketCompleted ticket={ticket} />
        </div>
      ) : (
        <span>...</span>
      )}
    </div>
  );
}
