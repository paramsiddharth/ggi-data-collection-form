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
  const page = parseInt(req.query.page ?? 0);
  const total = Math.ceil((await Entry.count()) / maxEntriesPerPage);
  const entries = await Entry.find({}).sort({ createdAt: -1 }).skip(page * maxEntriesPerPage).limit(maxEntriesPerPage);

  res.send({
	  entries,
    page,
    total
  });
}