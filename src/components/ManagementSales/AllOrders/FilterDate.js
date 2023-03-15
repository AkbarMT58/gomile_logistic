import { getUser } from 'helpers/parseJWT';

const FilterDate = ({
  date,
  setDate,
  setUpdate,
  page,
  setPage,
  filterWithSales,
}) => {
  const maxDate = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split('T')[0];

  const handleChange = (event) => {
    const { value, name } = event.target;
    setDate({ ...date, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdate((prev) => !prev);
    setPage(1);
  };

  return (
    <div className="bg-white p-3 rounded-md mb-2">
      <form onSubmit={handleSubmit} className="flex space-x-3 items-center">
        <p>Custom Filter : </p>
        {getUser().role === 'admin' && (
          <select
            onChange={handleChange}
            name="sales"
            value={date?.sales}
            className="w-40 border border-gray-300 p-1 rounded-md focus:outline-blue">
            <option value="">Select With sales</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
            {filterWithSales?.map((sales, index) => (
              <option key={index} value={sales}>
                {sales}
              </option>
            ))}
          </select>
        )}
        <input
          type="number"
          placeholder="ID Order"
          name="id"
          value={date?.id}
          onChange={handleChange}
          className="p-2 rounded-md w-28 border border-gray-200 focus:outline-blue"
        />
        <select
          name="status"
          onChange={handleChange}
          value={date?.status}
          className="border p-2 rounded-md focus:outline-none">
          <option value="">Choose Status</option>
          <option value="pending">Pending</option>
          <option value="unpaid">Unpaid</option>
          <option value="approval">Approval</option>
          <option value="paid">Paid</option>
        </select>
        <input
          type="text"
          placeholder="Start date"
          name="start"
          value={date?.start}
          max={maxDate}
          onChange={handleChange}
          className="p-2 rounded-md w-32 border border-gray-200 focus:outline-blue cursor-pointer"
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
        />
        <input
          type="text"
          name="end"
          className="p-2 rounded-md border border-gray-200 w-32 focus:outline-blue cursor-pointer"
          placeholder="End date"
          value={date?.end}
          max={maxDate}
          onChange={handleChange}
          onFocus={(e) => (e.target.type = 'date')}
          onBlur={(e) => (e.target.type = 'text')}
        />
        <button
          type="submit"
          className="bg-blue-300 rounded-md p-2 text-white hover:bg-blue-200 transition-all uppercase">
          Filter
        </button>
      </form>
    </div>
  );
};

export default FilterDate;
