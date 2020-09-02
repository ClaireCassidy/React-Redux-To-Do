export const getCurDate = () => {
  let fullDate = new Date();

  // adjust for daylight savings time
  fullDate.setTime(
    fullDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
  fullDate = fullDate.toISOString();

  const formattedDate = truncateISO(fullDate);

  // if something hasn't gone wrong
  if (formattedDate !== fullDate) {
    return formattedDate;
  }

  return "2020-01-01T00:00";
};

export const truncateISO = (isoString) => {
  let fullDate = isoString;

  for (let i = fullDate.length - 1; i >= 0; i--) {
    if (fullDate[i] === ":") {
      return fullDate.substring(0, i);
    }
  }

  return isoString;
};

export const getMaxDate = () => {
  let fullDate = new Date();

  // adjust for daylight savings time
  fullDate.setTime(
    fullDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );
  fullDate = fullDate.toISOString();

  // max date one year ahead
  const yearFromNow = parseInt(fullDate.substring(0, 4)) + 1;
  fullDate = `${yearFromNow}${fullDate.substring(4)}`;

  const formattedDate = truncateISO(fullDate);

  // if something hasn't gone wrong
  if (formattedDate !== fullDate) {
    return formattedDate;
  }
  return null;
};
