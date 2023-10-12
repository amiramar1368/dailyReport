const weekly_report = document.getElementById("weekly-report-form");
const tds = document.querySelectorAll("td[id]");

const ore_depo_700 = document.getElementById("ore-depo-700");
const ore_cr_700 = document.getElementById("ore-cr-700");
const waste_sh_700 = document.getElementById("waste-sh-700");
const waste_gh_700 = document.getElementById("waste-gh-700");
const magnet_to_cr = document.getElementById("magnet-to-cr");
const baught_to_cr = document.getElementById("baught-to-cr");
const saha_to_cr = document.getElementById("saha-to-cr");
const allservice_700 = document.getElementById("allservice-700");
const deposervice_700 = document.getElementById("deposervice-700");

const ore_depo_big_742 = document.getElementById("ore-depo-big-742");
const ore_cr_big_742 = document.getElementById("ore-cr-big-742");
const waste_sh_big_742 = document.getElementById("waste-sh-big-742");
const waste_gh_big_742 = document.getElementById("waste-gh-big-742");

const ore_depo_small_742 = document.getElementById("ore-depo-small-742");
const ore_cr_small_742 = document.getElementById("ore-cr-small-742");
const waste_sh_small_742 = document.getElementById("waste-sh-small-742");
const waste_gh_small_742 = document.getElementById("waste-gh-small-742");

const allservice_742 = document.getElementById("allservice-742");

const shovel_hour_700 = document.getElementById("shovel-hour-700");
const shovel_hour_742 = document.getElementById("shovel-hour-742");
const truck_hour_700 = document.getElementById("truck-hour-700");
const truck_hour_742 = document.getElementById("truck-hour-742");
const truck_distance_700 = document.getElementById("truck-distance-700");
const truck_distance_742 = document.getElementById("truck-distance-742");
const truck_fuel_700 = document.getElementById("truck-fuel-700");
const truck_fuel_742 = document.getElementById("truck-fuel-742");
const shovel_fuel_700 = document.getElementById("shovel-fuel-700");
const shovel_fuel_742 = document.getElementById("shovel-fuel-742");

const shovel_depo_hour_700 = document.getElementById("shovel-depo-hour-700");
const shovel_diesel_tonnage_700 = document.getElementById("shovel-diesel-tonnage-700");
const shovel_diesel_fuel_700 = document.getElementById("shovel-diesel-fuel-700");
const shovel_diesel_hour_700 = document.getElementById("shovel-diesel-hour-700");

const all_tonnage_700 = document.getElementById("tonnage-700");
const all_tonnage_742 = document.getElementById("tonnage-742");


const robat = document.getElementById("robat");
const arjan = document.getElementById("arjan");
const novin = document.getElementById("novin");
const karmania_ka = document.getElementById("karmania-kashan");
const karmania_sh = document.getElementById("karmania-shahrood");
const chah_gaz = document.getElementById("chah-gaz");
const khazar = document.getElementById("khazar");
const galmande = document.getElementById("galmande");

const depo_magnet = document.getElementById("depo-magnet");
const depo_other = document.getElementById("depo-other");

const saha_to_depo = document.getElementById("saha-to-depo");



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

  const { data: depoToCrusher } = await axios.post(
    "/weekly-report/depo-to-crusher",
    {
      start_at,
      end_at,
    },
  );
  if (!depoToCrusher) {
    refreshPage();
  }
  magnet_to_cr.innerHTML = depoToCrusher.magnet;
  baught_to_cr.innerHTML = depoToCrusher.novin;
  const { data: sahaToCrusher } = await axios.post(
    "/weekly-report/saha-to-crusher",
    {
      start_at,
      end_at,
    },
  );
  if (!depoToCrusher) {
    refreshPage();
  }
  console.log(sahaToCrusher);
  saha_to_cr.innerHTML = sahaToCrusher.crusher / 1000;
  saha_to_depo.innerHTML =  sahaToCrusher.depo / 1000;

  const { data: truckUnloading } = await axios.post(
    "/weekly-report/truck-unloading",
    {
      start_at,
      end_at,
    },
  );
  if (!truckUnloading) {
    refreshPage();
  }
  let record700 = truckUnloading.record700;
  let record742 = truckUnloading.record742;
  ore_cr_700.innerHTML = record700.oreToCrusher;
  ore_depo_700.innerHTML = record700.oreToDepo;
  waste_sh_700.innerHTML = record700.waste_sh;
  waste_gh_700.innerHTML = record700.waste_gh;
  allservice_700.innerHTML = record700.sumSer;
  deposervice_700.innerHTML = record700.depo_cr;
  all_tonnage_700.innerHTML = record700.allTonnage;

  ore_cr_big_742.innerHTML = record742.oreToCrusher_bigTruck;
  ore_depo_big_742.innerHTML = record742.oreToDepo_bigTruck;
  waste_sh_big_742.innerHTML = record742.waste_sh_bigTruck;
  waste_gh_big_742.innerHTML = record742.waste_gh_bigTruck;

  ore_cr_small_742.innerHTML = record742.oreToCrusher_smallTruck;
  ore_depo_small_742.innerHTML = record742.oreToDepo_smallTruck;
  waste_sh_small_742.innerHTML = record742.waste_sh_smallTruck;
  waste_gh_small_742.innerHTML = record742.waste_gh_smallTruck;

  all_tonnage_742.innerHTML = record742.allTonnage;

  allservice_742.innerHTML = record742.sumSer;

  const { data: fuel } = await axios.post("/weekly-report/fuel", {
    start_at,
    end_at,
  });
  if (!fuel) {
    refreshPage();
  }
  const mojtame = fuel.records700;
  const asfalt = fuel.records742;
  truck_hour_700.innerHTML = mojtame.truckHoure;
  truck_distance_700.innerHTML = mojtame.truckDistance;
  truck_fuel_700.innerHTML = mojtame.truckFeul;
  shovel_fuel_700.innerHTML = mojtame.shovelDieselFeul + mojtame.loaderFeul;
  shovel_diesel_fuel_700.innerHTML = mojtame.shovelDieselFeul;

  shovel_hour_742.innerHTML = asfalt.shovelHoure;
  truck_hour_742.innerHTML = asfalt.truckHoure;
  truck_distance_742.innerHTML = asfalt.truckDistance;
  truck_fuel_742.innerHTML = asfalt.truckFeul;
  shovel_fuel_742.innerHTML = asfalt.shovelFeul;
  const { data: shovel } = await axios.post("/weekly-report/shovel", {
    start_at,
    end_at,
  });
  if (!shovel) {
    refreshPage();
  }
  shovel_depo_hour_700.innerHTML = shovel.hour_ph;
  shovel_diesel_tonnage_700.innerHTML = shovel.tonnage_diesel;
  shovel_diesel_hour_700.innerHTML = shovel.hour_diesel;
  shovel_hour_700.innerHTML = shovel.allShovelHour;
  
  const { data: weighbridge } = await axios.post("/weekly-report/weighbridge", {
    start_at,
    end_at,
  });
  if (!weighbridge) {
    refreshPage();
  }
robat.innerHTML = weighbridge.robat;
arjan.innerHTML = weighbridge.arjan;
novin.innerHTML = weighbridge.novin;
karmania_ka.innerHTML = weighbridge.karmania_ka;
karmania_sh.innerHTML = weighbridge.karmania_sh;
chah_gaz.innerHTML = weighbridge.chah_gaz;
khazar.innerHTML = weighbridge.khazar;
galmande.innerHTML = weighbridge.galmande;

const { data: depo } = await axios.post("/weekly-report/depo", {
  start_at,
  end_at,
});
if (!depo) {
  refreshPage();
}
console.log(depo);
depo_magnet.innerHTML = depo[1].remaind;
depo_other.innerHTML = depo[0].remaind;
});
