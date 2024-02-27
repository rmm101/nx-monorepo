import { Link } from 'react-router-dom';

import classes from './header.module.css';

export function Header() {
  return (
    <header className={classes.header}>
      <Link to="/">
        <h1>101 Ways</h1>
      </Link>
      <Link to="/products">My products</Link>
    </header>
  );
}

export default Header;
