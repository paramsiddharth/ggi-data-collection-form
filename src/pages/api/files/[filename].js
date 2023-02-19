// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs-extra';

const storageDir = path.resolve(process.cwd(), 'resumés');
const mime = {
  '.pdf':  'application/pdf',
  '.doc':  'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.odf':  'application/vnd.oasis.opendocument.formula'
};

/**
 * 
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export default async function handler(req, res) {
  const { filename } = req.query;

  const fullFilePath = path.join(storageDir, filename);
  if (fs.existsSync(fullFilePath)) {
    if (req.query.viewonly)
      res.setHeader('Content-Type', mime[path.extname(filename)]);
      
    return res.send(fs.readFileSync(fullFilePath));
  }

  console.log(fullFilePath);

  res.redirect('/not-found');
}