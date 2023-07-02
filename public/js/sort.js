const getCellValue = (tr, index) => tr.children[index].innerText || tr.children[index].textContent;

const comparer = (idx, asc) => (a, b) =>
  ((v1, v2) => (v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)))(
    getCellValue(asc ? a : b, idx),
    getCellValue(asc ? b : a, idx)
  );

document.querySelectorAll("th").forEach((th) =>
  th.addEventListener("click", () => {
    const table = th.closest("table");
    console.log(table.querySelectorAll("tr:nth-child(n+1)"));
    Array.from(table.querySelectorAll("tr:nth-child(n+2)"))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), (this.asc = !this.asc)))
      .forEach((tr) => table.appendChild(tr));
  })
);

// const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;
// const comparer = (idx, asc) => (a, b) => ((v1, v2) => (v1 === null) - (v2 === null) || (isFinite(v1) && isFinite(v2) ?
// v1 - v2 : v1.toString().localeCompare(v2))) (getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
// const table = th.closest('table');
// Array.from(table.querySelectorAll('tr:nth-child(n+2)'))

// .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
// .forEach((tr,i) => {tr.querySelector('.rank').innerText=i+1+'';table.appendChild(tr)});
// })));
