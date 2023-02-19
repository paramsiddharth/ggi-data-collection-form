import Head from 'next/head';
import Link from 'next/link';

import styles from '@/styles/Home.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="description" content="A form to collect data." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.header}>
            <h1><Link href='/'>Form</Link></h1>
          </div>
          <div className={styles.menu}>
            <Link href='/' className={styles.item}>Form</Link>
            <Link href='/dashboard' className={styles.item}>Dashboard</Link>
            <Link href='/about' className={styles.item}>About</Link>
          </div>
        </div>

        <div className={styles.center}>
          { children }
        </div>

        <div className={styles.footer}>
          &copy; Param Siddharth 2023-{new Date().getFullYear()}
        </div>
      </main>
    </>
  );
}