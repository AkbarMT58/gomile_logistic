import { getUser } from 'helpers/parseJWT';

const FilterDate = ({
  date,
  setDate,
  setUpdate,
  page,
  setPage,
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
    setPage(1);
    setUpdate((prev) => !prev);
  };
  
  return (
    <div className="bg-white p-3 rounded-md mb-2">
      <form onSubmit={handleSubmit} className="flex space-x-3 items-center">
        <p>Custom Filter : </p>
        <input
          type="number"
          placeholder="ID Order"
          name="id"
          value={date?.id}
          onChange={handleChange}
          className="p-2 rounded-md w-28 border border-gray-200 focus:outline-blue"
        />
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
        <select
          name="type"
          onChange={handleChange}
          value={date?.type}
          className="border p-2 rounded-md focus:outline-none">
          <option value="">Type of Issue</option>
          <option value="Loss money (shipping cost)">Loss money (shipping cost)</option>
          <option value="Loss money (different price)">Loss money (different price)</option>
          <option value="Loss money (MoQ Issue)">Loss money (MoQ Issue)</option>
          <option value="No stock">No Stock</option>
        </select>
        <select
          name="status"
          onChange={handleChange}
          value={date?.status}
          className="border p-2 rounded-md focus:outline-none">
          <option value="">Status Task</option>
          <option value="submitted">Submitted</option>
          <option value="completed">Completed</option>
          <option value="OnProgress">On Progress</option>
        </select>
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
