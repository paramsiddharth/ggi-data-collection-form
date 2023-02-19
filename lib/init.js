const path = require('path');
const fs = require('fs-extra');

const storageDir = process.env.STORAGE_DIR ?? path.resolve(process.cwd(), 'resumés');
fs.ensureDir(storageDir);