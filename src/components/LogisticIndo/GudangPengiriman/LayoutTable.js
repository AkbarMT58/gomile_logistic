import React from 'react';
import GudangTabel from './GudangTabel';

const LayoutTable = ({ isLoading, inputs, data, handleChangeDate }) => {
  return (
    <div className="w-full h-[600px] rounded-t-xl border-2 border-gray-300 overflow-y-scroll relative">
      <div className="bg-blue-200 sticky top-0">
        <div className="flex justify-center items-center py-2 px-2 border-b-4 border-gray-200">
          <div className="text-lg text-center w-[20%]">ID Karton</div>
          <div className="text-lg text-center w-[20%]">Wilayah</div>
          <div className="text-lg text-center w-[20%]">Alamat</div>
          <div className="text-lg text-center w-[20%]">Kurir</div>
          <div className="text-lg text-center w-[20%]">Customer</div>
          <div className="text-lg text-center w-[20%]">No Kontainer</div>
          <div className="text-lg text-center w-[20%]">Palet</div>
          <div className="text-lg text-center w-[20%] flex flex-col justify-center items-center">
            Jadwal
            <input
              type="text"
              min={new Date().toLocaleDateString('en-ca')}
              name={`${inputs?.resultPencarian ? 'allFiltered' : 'all'}`}
              onChange={(e) => handleChangeDate(e)}
              className="w-full rounded-md text-center border border-gray-200 focus:outline-blue cursor-pointer hover:outline-blue"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full mt-10">
          <p className="text-gray-500 text-xl animate-pulse">
            Sedang Mengambil Data . . .
          </p>
        </div>
      ) : inputs?.pencarian?.length >= 3 ? (
        inputs?.resultPencarian?.length !== 0 ? (
          <GudangTabel
            name="inputsResultPencarian"
            dataToMap={inputs?.resultPencarian}
            handleChangeDate={handleChangeDate}
          />
        ) : (
          <div className="flex items-center justify-center h-full mt-10">
            <p className="text-gray-500 text-xl animate-bounce text-center">
              Oops, Data Tidak DiTemukan.
              <br />
              Coba gunakan filter data server
            </p>
          </div>
        )
      ) : (
        <GudangTabel
          name="data"
          dataToMap={data}
          handleChangeDate={handleChangeDate}
        />
      )}
    </div>
  );
};

export default LayoutTable;
