// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'csv';
import path from 'path';
import fs from 'fs-extra';

import dbConnect from '@/lib/connect-db';
import Entry from '@/models/Entry';

/**
 * 
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export default async function handler(req, res) {
  await dbConnect();

  const entries = await Entry.find({}).sort({ createdAt: -1 });

  const records = [
    [
      'ID',
      'Name',
      'E-mail address',
      'Age',
      'Phone number',
      'Academic Institution',
      'Years of experience',
      'Positions of interest',
      'What makes you an ideal candidate?',
      'Resumé',
      'Queries'
    ]
  ];

  for (const entry of entries) {
    records.push(
      [
        entry.id,
        entry.name,
        entry.email,
        entry.age,
        entry.phone,
        entry.institution,
        entry.years,
        entry.positions.join(', '),
        entry.whatMakesYouIdeal,
        entry.resumé,
        entry.queries
      ]
    );
  }

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=entries.csv');
  res.send(stringify(records));
}