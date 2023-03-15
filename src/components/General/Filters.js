// import { getUser } from "helpers/parseJWT";

const Filters = ({
  filterToko,
  toko,
  setToko,
  auto,
  setAuto,
  date,
  setDate,
  setUpdate,
  actionSubmit
}) => {
  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const handleChangeDate = (event) => {
    const { value, name } = event.target;
    setDate({ ...date, [name]: value });
  };

  return (
    <>
      {filterToko &&
      <>
        <div className="filter-toko">
          <select
            name="toko"
            id="toko"
            value={toko}
            className="border rounded px-2 py-1"
            onChange={(e) => setToko(e.target.value)}>
            <option value="all">All</option>
            <option value="1688">1688</option>
            <option value="taobao">Taobao</option>
            <option value="alibaba">Alibaba</option>
          </select>
        </div>
        {toko === "1688" && (
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              name="auto"
              id="auto"
              checked={auto}
              onChange={(e) => setAuto(e.target.checked)}
            />{" "}
            <label htmlFor="auto" className="text-normal text-xs">
              Errors Only
            </label>
          </div>
        )}
      </>
      }
      <input
        type="text"
        placeholder="Start date"
        name="start"
        value={date?.start}
        max={maxDate}
        onChange={handleChangeDate}
        className="py-1 px-2 rounded-md w-32 border border-gray-200 focus:outline-blue cursor-pointer"
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />
      <input
        type="text"
        name="end"
        className="py-1 px-2 rounded-md border border-gray-200 w-32 focus:outline-blue cursor-pointer"
        placeholder="End date"
        value={date?.end}
        max={maxDate}
        onChange={handleChangeDate}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
      />

      <button
        className="text-sm px-3 py-1 text-white rounded-md cursor-pointer bg-blue-500 hover:bg-blue-600"
        onClick={actionSubmit}>
        Filter
      </button>
    </>
  );
};

export default Filters;
