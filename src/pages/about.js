import Head from 'next/head';
import { Typography } from '@mui/material';

import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';

export default function Success({ id }) {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <div>
        <Typography align='center' variant='h5'>
          The Submission Form
        </Typography>
        <div>
          This is a form people use for submitting data online.
        </div>
      </div>
    </Layout>
  );
}