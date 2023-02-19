import { useRef, useState } from 'react';
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

import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';

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

  const [error, setError] = useState(null);
  const errorRef          = useRef();

  const [name, setName]                           = useState('');
  const [email, setEmail]                         = useState('');
  const [age, setAge]                             = useState(null);
  const [phone, setPhone]                         = useState('');
  const [inst, setInst]                           = useState('');
  const [years, setYears]                         = useState(defaultValues.years);
  const [positions, setPositions]                 = useState([]);
  const [whatMakesYouIdeal, setWhatMakesYouIdeal] = useState('');
  const [resumé, setResumé]                       = useState(null);
  const [queries, setQueries]                     = useState('');

  const nameRef              = useRef();
  const emailRef             = useRef();
  const ageRef               = useRef();
  const phoneRef             = useRef();
  const instRef              = useRef();
  const yearsRef             = useRef();
  const positionsRef         = useRef();
  const whatMakesYouIdealRef = useRef();
  const resuméRef            = useRef();
  const queriesRef           = useRef();

  const onChange = set => e => set(e.target.value);
  /* if (!emailInput.current.checkValidity()) {
    emailInput.current.reportValidity();
  } */

  const submit = e => {
    const defaultValidation = [
      nameRef,
      emailRef,
      ageRef,
      phoneRef,
      instRef,
      positionsRef,
      whatMakesYouIdealRef,
      resuméRef
    ];

    let valid = true;

    for (const ref of defaultValidation) {
      if (!ref.current.checkValidity()) {
        ref.current.reportValidity();
        valid = false;
      }
    }

    return valid;
  };

  return (
    <Layout>
      <Head>
        <title>Form</title>
      </Head>
      <form encType='multipart/form-data' action='/api/submit' method='post' onSubmit={submit}>
        <div className={styles.input}>
          <Typography variant='h2' align='center'>Form</Typography>
        </div>
        <div className={styles.input}>
          <TextField fullWidth variant='outlined' label='Name' required 
            inputRef={nameRef}
            value={name}
            onChange={onChange(setName)}
            name='name'
          />
        </div>
        <div className={styles.input}>
          <TextField fullWidth variant='outlined' label='E-mail address' type='email' required 
            inputRef={emailRef}
            value={email}
            onChange={onChange(setEmail)}
            name='email'
          />
        </div>
        <div className={styles.input}>
          <TextField fullWidth variant='outlined' label='Age' type='number' required 
            inputRef={ageRef}
            value={age}
            onChange={onChange(setAge)}
            name='age'
          />
        </div>
        <div className={styles.input}>
          <TextField fullWidth variant='outlined' label='Phone number' type='tel' required 
            inputRef={phoneRef}
            value={phone}
            onChange={onChange(setPhone)}
            name='phone'
          />
        </div>
        <div className={styles.input}>
          <TextField fullWidth variant='outlined' label='Academic institution' required 
            inputRef={instRef}
            value={inst}
            onChange={onChange(setInst)}
            name='institution'
          />
        </div>
        <div className={styles.input}>
          <InputLabel>Years of experience *</InputLabel>
          <Slider
            type='range'
            ref={yearsRef}
            defaultValue={defaultValues.years}
            value={years}
            onChange={onChange(setYears)}
            min={1}
            max={10}
            step={1}
            marks={Array.from(Array(10).keys()).map(k => ({ value: k + 1, label: k + 1 }))}
            name='years'
          />
        </div>
        <FormControl sx={{ width: '100%' }} className={styles.input}>
          <InputLabel id='posofint' mt={3}>Positions of interest *</InputLabel>
          <Select
            // inputRef={positionsRef}
            required
            labelId='posofint'
            multiple
            value={positions}
            onChange={({ target: { value } }) => {
              const values = typeof value === 'string' ?
                value.split(',') : // Autofill
                value;
              setPositions(values);
              // positionsRef.current.value = JSON.stringify(values);
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
        <input ref={positionsRef} name='positions' value={JSON.stringify(positions)} hidden />
        <div className={styles.input}>
          <TextField
            fullWidth variant='outlined' multiline minRows={3}
            label='What makes you an ideal candidate?' required 
            inputRef={whatMakesYouIdealRef}
            value={whatMakesYouIdeal}
            onChange={onChange(setWhatMakesYouIdeal)}
            name='whatMakesYouIdeal'
          />
        </div>
        <div className={styles.input}>
          <Button type='button' onClick={e => {
            if (resumé != null) {
              e.preventDefault();
              setResumé(null);
            }
          }} variant='contained' component='label'
          /* fullWidth */
          color='info'
          sx={{ /* textTransform: 'none', */ userSelect: 'none' }}
          >
            {
              resumé == null ?
                'Upload resumé' :
                'Clear resumé'
            } *
            <input ref={resuméRef}
              name='resumé'
              onChange={({ target: { files: [file] } }) => setResumé(file)}
              className={styles.hiddenFileInput} required accept='.pdf,.doc,.docx,.odf' type='file' 
            />
          </Button>
          { ' ' }
          { resumé?.name }
        </div>
        <div className={styles.input}>
          <TextField
            fullWidth variant='outlined' multiline minRows={3}
            label='Queries, if any' 
            inputRef={queriesRef}
            value={queries}
            onChange={onChange(setQueries)}
            name='queries'
          />
        </div>
        {
          error == null
            ? '' :
            <div className={styles.input}>
              <Typography color='red' fontWeight='bold' ref={errorRef}>
                { error }
              </Typography>
            </div>
        }
        <Button type='submit'
          fullWidth
          variant='contained'
          color='success'
        >
          Submit
        </Button>
      </form>
    </Layout>
  );
}
