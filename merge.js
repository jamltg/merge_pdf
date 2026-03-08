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

  console.log('Pages in sample1.pdf:', pdfA.getPageCount());
  console.log('Pages in sample2.pdf:', pdfB.getPageCount());
  console.log('Total pages in Merged.pdf', mergedPdf.getPageCount());
  
  fs.writeFileSync('Merged.pdf', mergedPdfBytes);
  console.log('PDFs merged successfully into Merged.pdf!');
}

mergePDFs().catch(console.error);
