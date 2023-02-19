// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs-extra';
import { Form } from 'multiparty';
import { customAlphabet as nanoid } from 'nanoid/non-secure';

import dbConnect from '@/lib/connect-db';
import Entry from '@/models/Entry';

const storageDir = path.resolve(process.cwd(), 'resumés');

/**
 * 
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export default async function handler(req, res) {
  const form = new Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });

  const {
    name: [name],
    email: [email],
    age: [age],
    phone: [phone],
    institution: [institution],
    years: [years],
    positions: [positions],
    whatMakesYouIdeal: [whatMakesYouIdeal],
    queries: [queries],
  } = fields;

  const {
    resumé: [resumé]
  } = files;
  const originalName = resumé.originalFilename;
  const extension = path.extname(originalName);

  const entry = {
    name,
    email,
    age: parseInt(age),
    phone,
    institution,
    years: parseInt(years),
    positions: JSON.parse(positions),
    resumé: resumé.originalFilename,
    whatMakesYouIdeal,
    queries: queries ? queries : null
  };

  const number = fs.readdirSync(storageDir).length;

  await dbConnect();
  
  const random = nanoid('1234567890abcdefpqrxyz', 6)().toLowerCase();
  const filename = `resume-${number + 1}-[${path.basename(originalName, extension)}]-${random}${extension}`;
  const storagePath = path.join(storageDir, filename);
  const tempPath = resumé.path;

  fs.moveSync(tempPath, storagePath);
  entry.resumé = filename;

  const entryObj = new Entry(entry);
  await entryObj.save();

  const redirectURL = new URLSearchParams();
  redirectURL.set('id', entryObj.id);

  res.redirect('/success?' + redirectURL.toString());
}

export const config = {
  api: {
    bodyParser: false,
  },
};