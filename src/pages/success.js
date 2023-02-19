import Head from 'next/head';
import { Typography } from '@mui/material';

import dbConnect from '@/lib/connect-db';
import Entry from '@/models/Entry';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';

export default function Home({ id }) {
  return (
    <Layout>
      <Head>
        <title>Submitted</title>
      </Head>
      <Typography align='center' variant='h5'>
        Your application has been successfully submitted (ID: { id })!
      </Typography>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  await dbConnect();

  try {
    const entry = await Entry.findById(id);

    if (entry == null) {
      throw new Error('Not found!');
    }

    return { props: { id } };
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/not-found',
      }
    };
  }
}