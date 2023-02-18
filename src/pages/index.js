import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Form</title>
        <meta name="description" content="A form to collect data." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div className={styles.header}>
            <h1>Form</h1>
          </div>
          <div className={styles.menu}>
            <Link href='#' className={styles.item}>Dashboard</Link>
            <Link href='#' className={styles.item}>About</Link>
          </div>
        </div>

        <div className={styles.center}>
          <form>
            <input />
          </form>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Link href='#'>Dashboard</Link>
          </div>
          <div className={styles.card}>
            <Link href='#'>About</Link>
          </div>
        </div>
      </main>
    </>
  );
}
