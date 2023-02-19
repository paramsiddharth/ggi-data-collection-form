import Head from 'next/head';
import { Typography } from '@mui/material';

import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';

export default function NotFound({ id }) {
  return (
    <Layout>
      <Head>
        <title>Not Found</title>
      </Head>
      <Typography align='center' variant='h3'>
        Error - Not found!
      </Typography>
    </Layout>
  );
}

/* export async function getServerSideProps({ res }) {
  res.statusCode = 404;
  
  return {
    props: {}
  };
} */