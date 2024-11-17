const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const texFile = path.resolve(__dirname, 'resume.tex');
const outputDir = path.resolve(__dirname, 'output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

if (!fs.existsSync(texFile)) {
  console.log(`LaTeX file not found: ${texFile}. Creating new Latex file!`);
  fs.writeFileSync(texFile, '')
}

console.log("Running LaTeX to build PDF...");

exec(`pdflatex -output-directory=${outputDir} ${texFile}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing LaTeX: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }

  console.log('LaTeX compilation complete.');

  const pdfFile = path.resolve(outputDir, 'resume.pdf');
  if (fs.existsSync(pdfFile)) {
    console.log(`PDF generated successfully: ${pdfFile}`);
  } else {
    console.error('PDF was not generated.');
  }
});
