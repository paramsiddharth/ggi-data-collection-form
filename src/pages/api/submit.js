// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs-extra';
// import { promisify } from 'util';
import { Form } from 'multiparty';
import { customAlphabet as nanoid } from 'nanoid/non-secure';

const storageDir = path.resolve(process.cwd(), 'resumés');

/**
 * 
 * @param {NextApiRequest} req 
 * @param {NextApiResponse} res 
 */
export default async function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' });
  const form = new Form();
  // const [fields, files] = await promisify(form.parse)(req, res);

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, function (err, fields, files) {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });

  // console.log(fields, files);

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
  
  const random = nanoid('1234567890abcdefpqrxyz', 6)().toLowerCase();
  const filename = `resumé-${number + 1}-[${path.basename(originalName, extension)}]-${random}${extension}`;
  const storagePath = path.join(storageDir, filename);
  const tempPath = resumé.path;

  fs.moveSync(tempPath, storagePath);
  entry.resumé = storagePath;

  res.status(200).send('Done!' + '\n\n' + JSON.stringify(entry, null, 4));
  // res.redirect('/?success=true');
}

export const config = {
  api: {
    bodyParser: false,
  },
};