import Head from 'next/head';
import Link from 'next/link';
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  TextField,
  Typography
} from '@mui/material';

import styles from '@/styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const defaultValues = {
    years: 2,
    positions: [
      'Video Editing',
      'Content Communication (Extraordinary Writing Skills)',
      'Software Development (Full Stack)',
      'Associate Program Manager (Operations/Strategy)',
      'Chief of Staff (Management Consulting Role)',
      'Student Afairs (Consumer Chat)',
      'Digital Marketing',
      'Teaching Assistant (Extraordinary Communication Skills)',
    ]
  };

  const [positions, setPositions] = useState([]);
  const [resumé, setResumé] = useState(null);

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
            <div className={styles.input}>
              <Typography variant='h2' align='center'>Form</Typography>
            </div>
            <div className={styles.input}>
              <TextField fullWidth variant='outlined' label='Name' required />
            </div>
            <div className={styles.input}>
              <TextField fullWidth variant='outlined' label='E-mail address' type='email' required />
            </div>
            <div className={styles.input}>
              <TextField fullWidth variant='outlined' label='Age' type='number' required />
            </div>
            <div className={styles.input}>
              <TextField fullWidth variant='outlined' label='Phone number' type='tel' required />
            </div>
            <div className={styles.input}>
              <TextField fullWidth variant='outlined' label='Academic institution' required />
            </div>
            <div className={styles.input}>
              <InputLabel>Years of experience *</InputLabel>
              <Slider
                type='range'
                defaultValue={defaultValues.years}
                min={1}
                max={10}
                step={1}
                marks={Array.from(Array(10).keys()).map(k => ({ value: k + 1, label: k + 1 }))}
              />
            </div>
            <FormControl sx={{ width: '100%' }} className={styles.input}>
              <InputLabel id='posofint' mt={3}>Positions of interest *</InputLabel>
              <Select
                labelId='posofint'
                multiple
                value={positions}
                onChange={({ target: { value } }) => {
                  setPositions(
                    typeof value === 'string' ? value.split(',') : value
                  );
                }}
                input={<OutlinedInput label="Positions of interest *" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {defaultValues.positions.map(name => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={positions.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className={styles.input}>
              <TextField
                fullWidth variant='outlined' multiline minRows={3}
                label='What makes you an ideal candidate?' required />
            </div>
            <div className={styles.input}>
              <Button type='button' onClick={e => {
                if (resumé != null) {
                  e.preventDefault();
                  setResumé(null);
                }
              }} variant='contained' component='label'
              fullWidth
              color='info'
              // sx={{ textTransform: 'none' }}
              >
                {
                  resumé == null ?
                    'Upload resumé' :
                    'Clear resumé'
                } *
                <input onChange={({ target: { files: [file] } }) => {
                  console.log(file);
                  setResumé(file);
                }} hidden accept='.pdf,.doc,.docx,.odf' type='file' />
              </Button>
              { ' ' }
              { resumé?.name }
            </div>
            <div className={styles.input}>
              <TextField
                fullWidth variant='outlined' multiline minRows={3}
                label='Queries, if any' />
            </div>
            <Button type='submit'
              fullWidth
              variant='contained'
              color='success'
            >
              Submit
            </Button>
          </form>
        </div>

        <div className={styles.footer}>
          &copy; Param Siddharth 2023-{new Date().getFullYear()}
        </div>
      </main>
    </>
  );
}
