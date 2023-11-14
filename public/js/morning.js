const morning_report_form = document.getElementById("morning-report-form");
const search_btn = document.getElementById("search");
const loading = document.getElementById("loading");
const tonnages = document.getElementById("tonnages");
const td = document.querySelectorAll("td[id]");
const numberOfvehicles = document.getElementById("numberOfvehicles");
morning_report_form.addEventListener("submit", async (event) => {
    loading.classList.remove("d-none");
    search_btn.classList.add("d-none");
    let html = "";
    let html2 = "";
    tonnages.innerHTML = html;
    numberOfvehicles.innerHTML = html2
  event.preventDefault();
  const start_at = document.getElementById("workday").value;
  const end_at = document.getElementById("workday").value;
  const mofid_700 = document.getElementById("mofid-700").value;
  const mofid_742 = document.getElementById("mofid-742").value;
  const mofid_apadana = document.getElementById("mofid-apadana").value;
  const {data:truck_unloading} = await axios.post("/morning-report/truck-unloading",{start_at,end_at,pile_number:1});
html += `
<tr>
<td>700</td>
<td>${splitNumber(truck_unloading.ore_700)}</td>
<td>${splitNumber(truck_unloading.waste_700)}</td>
<td>${splitNumber(truck_unloading.ore_700+truck_unloading.waste_700)}</td>
</tr>
<tr>
<td>742</td>
<td>${splitNumber(truck_unloading.ore_742)}</td>
<td>${splitNumber(truck_unloading.waste_742)}</td>
<td>${splitNumber(truck_unloading.ore_742+truck_unloading.waste_742)}</td>
</tr>
<tr style="font-weight: bold">
<td>مجموع</td>
<td>${splitNumber(truck_unloading.ore_700+truck_unloading.ore_742)}</td>
<td>${splitNumber(truck_unloading.waste_700+truck_unloading.waste_742)}</td>
<td >${splitNumber(truck_unloading.ore_700+truck_unloading.waste_700+truck_unloading.ore_742+truck_unloading.waste_742)}</td>
</tr>
`
tonnages.innerHTML = html
  const {data:truck_shovel} = await axios.post("/morning-report/truck-shovel",{mofid_700,mofid_742,mofid_apadana,start_at,end_at,pile_number:1});
  html2 += `
<tr>
<td>700</td>
<td>${truck_shovel.numberOfTruck_700.toFixed(1)}</td>
<td>${truck_shovel.numberOfShovel_700.toFixed(1)}</td>
</tr>
<tr>
<td>742</td>
<td>${truck_shovel.numberOfTruck_742.toFixed(1)}</td>
<td>${truck_shovel.numberOfShovel_742.toFixed(1)}</td>
</tr>
<tr>
<td>آپادانا</td>
<td>${truck_shovel.numberOfTruck_apadana.toFixed(1)}</td>
<td>${truck_shovel.numberOfShovel_apadana.toFixed(1)}</td>
</tr>

<tr style="font-weight: bold">
<td>مجموع</td>
<td>${(truck_shovel.numberOfTruck_700+truck_shovel.numberOfTruck_742+truck_shovel.numberOfTruck_apadana).toFixed(1)}</td>
<td>${(truck_shovel.numberOfShovel_700+truck_shovel.numberOfShovel_742+truck_shovel.numberOfShovel_apadana).toFixed(1)}</td>
</tr>
`
numberOfvehicles.innerHTML = html2;
loading.classList.add("d-none");
    search_btn.classList.remove("d-none");
});


function splitNumber(value) {
    var num = value.toLocaleString();
    return num;
  }