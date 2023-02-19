// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import dbConnect from '@/lib/connect-db';
import Entry from '@/models/Entry';
import { maxEntriesPerPage } from '@/config';

/**
 * 
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export default async function handler(req, res) {
  console.log(req);

  try {
    const id = req.query.id;
    const entry = await Entry.findById(id);

    if (entry == null) {
      throw new Error('Entry not found!');
    }

    res.send(entry);
  } catch {
    res.redirect('/not-found');
  }
}