const ConvertTime = (value) => {
  const time = new Date(Number(value));

  if (!value) {
    return '';
  }

  if (isNaN(time.valueOf())) {
    return '';
  }

  return time.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const FormatDate = (date) => {
  const d = new Date(date);
  const curr_date = d.getDate();
  const curr_year = d.getFullYear();

  let longMonth = d.toLocaleString('en-us', {
    month: 'long',
  });

  return longMonth + ' ' + curr_date + ', ' + curr_year;
};

const formatDateLong = (dataDate, times) => {
  const dates = new Date(dataDate);

  const date = dates.getDate();
  const year = dates.getFullYear();
  const moth = dates.toLocaleString('en-us', {
    month: 'long',
  });
  const time = dates.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return date + ', ' + moth + ' ' + year + ' ' + (times ? time : '');
};

const formatDateDDMMYY = (date) => {
  const d = new Date(date);
  const GET_DATE = d.getDate();
  const GET_YEAR = d.getFullYear();
  let GET_LONG_MOTH = d.toLocaleString('en-us', {
    month: 'long',
  });

  return GET_DATE + ' ' + GET_LONG_MOTH + ' ' + GET_YEAR;
};

export { ConvertTime, FormatDate, formatDateLong, formatDateDDMMYY };
