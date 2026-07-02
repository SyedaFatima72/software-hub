const fs = require('fs');
const path = require('path');
const roots = [path.join('node_modules','@prisma','client'), path.join('node_modules','prisma')];
const regex = /adapter|accelerateUrl|PrismaClient\(|new PrismaClient|PrismaClientOptions/g;

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else if (/\.js$|\.ts$|\.d\.ts$/.test(entry.name)) {
      const txt = fs.readFileSync(p, 'utf8');
      if (regex.test(txt)) {
        console.log('===', p, '===');
        const lines = txt.split(/\r?\n/);
        lines.forEach((line, i) => {
          if (regex.test(line)) {
            console.log(`${i + 1}: ${line}`);
          }
        });
      }
    }
  }
}

roots.forEach(walk);
