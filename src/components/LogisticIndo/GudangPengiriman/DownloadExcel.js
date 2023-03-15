import React from 'react';
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function DownloadExcel({ data }) {
  return (
    <ExcelFile
      element={
        <button className="bg-blue-500 rounded-t-lg duration-300 text-white text-sm px-5 pt-1 pb-px absolute bottom-0 left-[90px] hover:pb-5">
          Download Excel
        </button>
      }>
      <ExcelSheet data={data} name="Employees">
        <ExcelColumn label="ID Karton" value="id_karton" />
        <ExcelColumn label="Wilayah" value="wilayah" />
        <ExcelColumn label="Kurir" value="kurir" />
        <ExcelColumn label="No Kontainer" value="container" />
        <ExcelColumn label="Jadwal" value="jadwal" />
      </ExcelSheet>
    </ExcelFile>
  );
}
