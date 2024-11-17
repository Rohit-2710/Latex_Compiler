const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const texFile = path.resolve(__dirname, 'resume.tex');
const outputDir = path.resolve(__dirname, 'output');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

if (!fs.existsSync(texFile)) {
  console.log(`LaTeX file not found: ${texFile}. Creating new Latex file!`);
  fs.writeFileSync(texFile, '')
}
function compileLatex() {
  console.log('Compiling LaTeX...');
  exec(`pdflatex -output-directory=${outputDir} ${texFile}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log("PDF Compiled")
  });
}
if (process.env.WATCH_MODE === 'true') {
  console.log('Watch mode enabled. Watching for changes in resume.tex...');
  chokidar.watch(texFile).on('change', () => {
    compileLatex();
  });
} else {
  compileLatex();
}
