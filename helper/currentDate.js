export function current() {
  const d = new Date();
  const year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (Number(month < 10)) {
    month = "0" + month;
  }
  var day = d.getDate();
  if (Number(day < 10)) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
}
