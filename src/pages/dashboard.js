import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import axios from 'axios';

import dbConnect from '@/lib/connect-db';
import Entry from '@/models/Entry';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';
import { maxEntriesPerPage } from '@/config';

export default function Dashboard(props) {
  const [entries, setEntries] = useState(props.entries);
  const [page, setPage] = useState(props.page);
  const [total, setTotal] = useState(props.total);

  const toPage = no => async () => {
    const {
      entries: newEntries,
      page: newPage,
      total: newTotal
    } = (await axios.get('/api/entries', { params: { page: no } })).data;
    
    setEntries(newEntries);
    setPage(newPage);
    setTotal(newTotal);
  };

  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>
        <div className={styles.input}>
          <Typography variant='h2' align='center'>Dashboard</Typography>
        </div>
        {
          entries.length > 0 ?
            <div>
              <div style={{ display: 'flex', marginBottom: 15 }}>
                <Button disabled={page < 1} variant='contained' color='warning'
                  onClick={toPage(page - 1)}
                  sx={{ marginRight: 1 }}
                >
                  Previous
                </Button>
                <Button variant='contained' color='error'
                  onClick={toPage(page)}
                >
                  <Refresh />
                </Button>
                <div style={{ flexGrow: 1, textAlign: 'center' }}>
                  Page { page + 1 } of { total }
                </div>
                <Button variant='contained' color='info'
                  href='/api/csv'
                  download='entries.csv'
                  sx={{ marginRight: 1 }}
                >
                  Download CSV
                </Button>
                <Button disabled={page >= total - 1 } variant='contained' color='success'
                  onClick={toPage(page + 1)}
                >
                  Next
                </Button>
              </div>
              <TableContainer sx={{ maxWidth: '90vw', maxHeight: '90vh' }} component={ Paper }>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>E-mail address</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Phone number</TableCell>
                      <TableCell>Academic Institution</TableCell>
                      <TableCell>Years of experience</TableCell>
                      <TableCell>Positions of interest</TableCell>
                      <TableCell>What makes you an ideal candidate?</TableCell>
                      <TableCell>Resumé</TableCell>
                      <TableCell>Queries</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entries.map(entry => (
                      <TableRow
                        key={entry._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          ...{entry._id.substring(20)}
                        </TableCell>
                        <TableCell>{ entry.name }</TableCell>
                        <TableCell style={{ textDecoration: 'underline' }}>
                          <Link href={`mailto:${entry.email}`}>
                            { entry.email }
                          </Link>
                        </TableCell>
                        <TableCell>{ entry.age }</TableCell>
                        <TableCell style={{ textDecoration: 'underline' }}>
                          <Link href={`tel:${entry.phone}`}>
                            { entry.phone }
                          </Link>
                        </TableCell>
                        <TableCell>{ entry.institution }</TableCell>
                        <TableCell>{ entry.years }</TableCell>
                        <TableCell>
                          <ul>
                            {
                              entry.positions.map((p, i, a) => (
                                <li key={i}>
                                  { p }
                                </li>
                              ))
                            }
                          </ul>
                        </TableCell>
                        <TableCell>{ entry.whatMakesYouIdeal }</TableCell>
                        <TableCell>
                          <Link style={{ textDecoration: 'underline' }}
                            href={`/api/files/${entry.resumé}?viewonly=true`}
                            target='_blank'
                          >
                            View
                          </Link>
                          <br />
                          <Link style={{ textDecoration: 'underline' }}
                            href={`/api/files/${entry.resumé}`}
                            download={entry.resumé}
                          >
                            Download
                          </Link>
                        </TableCell>
                        <TableCell>
                          {
                            entry.queries ?
                              entry.queries :
                              <i>No queries</i>
                          }
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            : <div className={styles.center}>No entries yet.</div>
        }
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await dbConnect();

  const page = 0;
  const total = Math.ceil((await Entry.count()) / maxEntriesPerPage);
  const entries = JSON.parse(JSON.stringify(await Entry.find().sort({ createdAt: -1 }).skip(page * maxEntriesPerPage).limit(maxEntriesPerPage)));

  return {
    props: {
      entries,
      total,
      page
    }
  };
}