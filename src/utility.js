// export const getCurDate = () => {
//   let fullDate = new Date();

//   // adjust for daylight savings time
//   fullDate.setTime(
//     fullDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
//   );
//   fullDate = fullDate.toISOString();
//   console.log(`Full ISO String: ${fullDate}`);

//   const formattedDate = truncateISO(fullDate);

//   // if something hasn't gone wrong
//   if (formattedDate !== fullDate) {
//     return formattedDate;
//   }

//   return "2020-01-01T00:00";
// };

// export const truncateISO = (isoString) => {
//   let fullDate = isoString;

//   for (let i = fullDate.length - 1; i >= 0; i--) {
//     if (fullDate[i] === ":") {
//       return fullDate.substring(0, i);
//     }
//   }

//   return isoString;
// };

// export const getMaxDate = () => {
//   let fullDate = new Date();

//   // adjust for daylight savings time
//   fullDate.setTime(
//     fullDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
//   );
//   fullDate = fullDate.toISOString();

//   // max date one year ahead
//   const yearFromNow = parseInt(fullDate.substring(0, 4)) + 1;
//   fullDate = `${yearFromNow}${fullDate.substring(4)}`;

//   const formattedDate = truncateISO(fullDate);

//   // if something hasn't gone wrong
//   if (formattedDate !== fullDate) {
//     return formattedDate;
//   }
//   return null;
// };

// Returns a unix timestamp for the current date
export const getCurDateUnix = (years = 0, months = 0, days = 0) => {
  // time units in unix times
  const YEAR = 31556952000; //31536000
  const MONTH = 2629800000;
  const DAY = 86400000;

  let fullDate = new Date();

  // adjust for daylight savings time
  fullDate.setTime(
    fullDate.getTime() - new Date().getTimezoneOffset() * 60 * 1000
  );

  // console.log(`ORIGINAL: Unix: ${Date.parse(fullDate)}, ISO: ${new Date(fullDate).toISOString()}`);
  let fullDateUnix = Date.parse(fullDate);
  
  // add the offsets:
  // if (years || months || days) console.log(`Using Offsets Y: ${years}, M: ${months}, D: ${days}`);
  let offsetUnix = years * YEAR + months * MONTH + days * DAY;
  // console.log(parseInt(offsetUnix) + parseInt(fullDateUnix));
  // console.log(`OFFSET: ${offsetUnix}, (${new Date(offsetUnix)})`);
  fullDateUnix = fullDateUnix + years * YEAR + months * MONTH + days * DAY;
  // console.log(`OFFSET: Unix: ${fullDateUnix}, ISO STRING: ${new Date(fullDateUnix).toISOString()}`);

  return fullDateUnix;
};

// Date picker elements take a truncated form of the full ISO string
//  Format: YYYY-MM-DDT00:00
export const getDatePickerStrFromUnix = (unixTime) => {
  // get full ISO string:
  const isoString = new Date(unixTime).toISOString();

  // remove chars after minute
  let cutOffIndex = isoString.length;
  for (let i = isoString.length - 1; i >= 0; i--) {
    if (isoString[i] === ":") {
      cutOffIndex = i;
      break;
    }
  }
  const truncatedIsoString = isoString.substring(0, cutOffIndex);

  // console.log(
  //   `Original Iso String: ${isoString}, Truncated ISO string: ${truncatedIsoString}`
  // );
  return truncatedIsoString;
};

export const getFormattedDateFromUnix = (unixTime) => {
  const isoString = new Date(unixTime).toISOString();
  // console.log(`Full ISO representation : ${isoString}`);

  let [date, time] = isoString.split("T");

  // Chop off seconds
  let cutOffIndex = time.length;
  for (let i = time.length - 1; i >= 0; i--) {
    if (time[i] === ":") {
      cutOffIndex = i;
      break;
    }
  }
  time = time.substring(0, cutOffIndex);
  const [year, month, day] = date.split("-");
  //console.log(`Date: ${date}, Time: ${time}`);
  //console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);

  return `${day}/${month}/${year}, ${time}`;
};
