import Barcode from "react-barcode";

const options = {
  width: 1.8,
  height: 60,
  format: "CODE128",
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 20,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
};
export default function BarcodeCardList({data, customerData, isLoading}) {
  return (
    <>
      {data?.[0]?.data_karton?.length > 0 ? (
        <>
          {data?.[0]?.data_karton?.map((datas) => (
            <div
              key={datas?.id_karton}
              className="print-label-container w-96 p-2 mb-5">
              <div className="logo">
                <img
                  src="/logoOCIpng.png"
                  alt="Ocistok"
                  className="w-36 mx-auto"
                />
              </div>
              <div className="flex justify-between">
                <div className="category flex flex-col items-center">
                  <div className="font-semibold">Category</div>
                  <div className="category-id text-5xl font-bold">
                    {data?.[0]?.category}.{data?.[0]?.wilayah}
                  </div>
                  <div className="text-lg font-semibold">{data?.[0]?.tlc}</div>
                </div>
                <div className="barcode">
                  {datas?.id_karton ? (
                    <Barcode value={datas?.id_karton} {...options} />
                  ) : (
                    <p className="text-black font-bold">
                      Barcode Belum Tersedia
                    </p>
                  )}
                </div>
              </div>

              <div className="leading-5">
                <div className="text-2xl font-bold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Jasa Kirim</div>
                  <div className="mr-1">:</div>
                  <div className="">{data?.[0]?.kurir}</div>
                </div>
                <div className="text-2xl font-bold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Kota</div>
                  <div className="mr-1">:</div>
                  <div className="">{data?.[0]?.kota}</div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">
                    Jenis Transaksi
                  </div>
                  <div className="mr-1">:</div>
                  <div className="uppercase">NON COD</div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Packing Kayu</div>
                  <div className="mr-1">:</div>
                  <div className="">
                    {data?.[0].is_packing_kayu ? "Yes" : "No"}
                  </div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Volume</div>
                  <div className="mr-1">:</div>
                  <div className="">
                    {data?.[0]?.volume && (data?.[0]?.volume / 1000000).toFixed(4)} M<sup>3</sup>
                  </div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Total Karton</div>
                  <div className="mr-1">:</div>
                  <div className="">
                    {data?.[0]?.data_karton.length >= 0
                      ? data?.[0]?.data_karton.length
                      : "Produk Belum dikemas"}
                  </div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Nama</div>
                  <div className="mr-1">:</div>
                  <div className="">{customerData?.name}</div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Telp</div>
                  <div className="mr-1">:</div>
                  <div className="">{customerData?.phone}</div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Alamat</div>
                  <div className="mr-1">:</div>
                  <div className="">{customerData?.address}</div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Sales</div>
                  <div className="mr-1">:</div>
                  <div className="capitalize">{customerData?.sales}</div>
                </div>

                <hr className="border-t-2 border-gray-300" />

                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Pengirim</div>
                  <div className="mr-1">:</div>
                  <div className="">OCIstok.Com Kota</div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Kota</div>
                  <div className="mr-1">:</div>
                  <div className="">Cengkareng</div>
                </div>
                <div className="text-[.75rem] font-semibold flex">
                  <div className="w-[7.5rem] flex-shrink-0">Telp</div>
                  <div className="mr-1">:</div>
                  <div className="">021222302662</div>
                </div>
              </div>
              <div className="greet text-[.75rem] font-semibold mt-3 leading-4">
                Terima Kasih Sudah Berbelanja Di OCISTOK.COM <br />
                Kontak Customer Service <br />
                WhatsApp 0812-10-00-1808
              </div>
            </div>
          ))}
        </>
      ) : (
      <div className="print-label-container w-96 p-2 mb-5">
        <div className="logo">
          <img
            src="/logoOCIpng.png"
            alt="Ocistok"
            className="w-36 mx-auto"
          />
        </div>
        <div className="flex justify-between">
          <div className="category flex flex-col items-center">
            <div className="font-semibold">Category</div>
            <div className="category-id text-5xl font-bold">
              {data?.[0]?.category}
              {data?.[0]?.wilayah ? "." + data?.[0]?.wilayah : ""}
            </div>
            <div className="text-lg font-semibold">{data?.[0]?.tlc}</div>
          </div>
          <div className="barcode">
            <p className="text-black font-bold">
              Barcode Belum Tersedia
            </p>
          </div>
        </div>

        <div className="leading-5">
          <div className="text-2xl font-bold flex">
            <div className="w-[7.5rem] flex-shrink-0">Jasa Kirim</div>
            <div className="mr-1">:</div>
            <div className="">{customerData?.courier}</div>
          </div>
          <div className="text-2xl font-bold flex">
            <div className="w-[7.5rem] flex-shrink-0">Kota</div>
            <div className="mr-1">:</div>
            <div className="">{customerData?.city}</div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">
              Jenis Transaksi
            </div>
            <div className="mr-1">:</div>
            <div className="uppercase">NON COD</div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Packing Kayu</div>
            <div className="mr-1">:</div>
            <div className="">
              {data?.[0]?.is_packing_kayu ? "Yes" : "No"}
            </div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Volume</div>
            <div className="mr-1">:</div>
            <div className="">
              {data?.[0]?.volume && (data?.[0]?.volume / 1000000).toFixed(4)} M<sup>3</sup>
            </div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Total Karton</div>
            <div className="mr-1">:</div>
            <div className="">
              {data?.[0]?.data_karton.length >= 0
                ? data?.[0]?.data_karton.length
                : "Produk Belum dikemas"}
            </div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Nama</div>
            <div className="mr-1">:</div>
            <div className="">{customerData?.name}</div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Telp</div>
            <div className="mr-1">:</div>
            <div className="">{customerData?.phone}</div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Alamat</div>
            <div className="mr-1">:</div>
            <div className="">{customerData?.address}</div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Sales</div>
            <div className="mr-1">:</div>
            <div className="capitalize">{customerData?.sales}</div>
          </div>

          <hr className="border-t-2 border-gray-300" />

          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Pengirim</div>
            <div className="mr-1">:</div>
            <div className="">OCIstok.Com Kota</div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Kota</div>
            <div className="mr-1">:</div>
            <div className="">Cengkareng</div>
          </div>
          <div className="text-[.75rem] font-semibold flex">
            <div className="w-[7.5rem] flex-shrink-0">Telp</div>
            <div className="mr-1">:</div>
            <div className="">021222302662</div>
          </div>
        </div>
        <div className="greet text-[.75rem] font-semibold mt-3 leading-4">
          Terima Kasih Sudah Berbelanja Di OCISTOK.COM <br />
          Kontak Customer Service <br />
          WhatsApp 0812-10-00-1808
        </div>
      </div>
      )}
    </>
  );
}
