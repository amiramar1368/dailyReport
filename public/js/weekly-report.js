const weekly_report = document.getElementById("weekly-report-form");
const tds = document.querySelectorAll("td[id]");

function countDown(time) {
  let i = time;
  let timer = setInterval(() => {
    time_counter.innerHTML = i;
    i--;
    if (i < -1) {
      clearInterval(timer);
      span_counter.classList.add("d-none");
    }
  }, 1000);
}
function refreshPage() {
  message.classList.remove("d-none");
  loading.classList.toggle("d-none");
  search.classList.toggle("d-none");
  main_report.classList.remove("d-none");
}

// 700=>1   742=> 3   Beh=> 6   Apa=>7
weekly_report.addEventListener("submit", async (event) => {
  event.preventDefault();
  for (let i = 0; i < tds.length; i++) {
    tds[i].innerHTML = "";
  }
  let start_at = document.getElementById("start-at").value;
  let end_at = document.getElementById("end-at").value;

  // const { data:depoToCrusher } = await axios.post("/weekly-report/depo-to-crusher", {
  //   start_at,
  //   end_at,
  // });
  // if (!depoToCrusher) {
  //   refreshPage();
  // }
  // console.log(depoToCrusher);
  // const { data:sahaToCrusher } = await axios.post("/weekly-report/saha-to-crusher", {
  //   start_at,
  //   end_at,
  // });
  // if (!depoToCrusher) {
  //   refreshPage();
  // }
  // console.log(sahaToCrusher);
  const { data:truckUnloading } = await axios.post("/weekly-report/truck-unloading", {
    start_at,
    end_at,
  });
  if (!truckUnloading) {
    refreshPage();
  }
  console.log(truckUnloading);
});

