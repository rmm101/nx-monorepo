import Link from 'next/link';

import classes from './header.module.css';

export function Header() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <h1>101 Ways</h1>
      </Link>
      <Link href="/products">My products</Link>
    </header>
  );
}

export default Header;
