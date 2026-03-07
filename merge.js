const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function mergePDFs() {
  const pdfABytes = fs.readFileSync('sample1.pdf');
  const pdfBBytes = fs.readFileSync('sample2.pdf');

  const pdfA = await PDFDocument.load(pdfABytes);
  const pdfB = await PDFDocument.load(pdfBBytes);


  const mergedPdf = await PDFDocument.create();

  const pagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
  pagesA.forEach((page) => mergedPdf.addPage(page));

  const pagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
  pagesB.forEach((page) => mergedPdf.addPage(page));

  const mergedPdfBytes = await mergedPdf.save();

  fs.writeFileSync('Merged.pdf', mergedPdfBytes);
  console.log('PDFs merged successfully into Merged.pdf!');
}

mergePDFs().catch(console.error);