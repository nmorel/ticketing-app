import { Outlet } from '@tanstack/react-location';

import styles from './app.module.css';

export const App = () => {
  return (
    <div className={styles['app']}>
      <h1>Ticketing App</h1>
      <Outlet />
    </div>
  );
};
