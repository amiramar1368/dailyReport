const weekly_report = document.getElementById("weekly-report-form");
const tds = document.querySelectorAll("td[id]");
const message = document.getElementById("message");
let loading = document.getElementById("loading");
let search = document.getElementById("search");
const span_counter = document.getElementById("span-counter");

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
const shovel_diesel_tonnage_700 = document.getElementById(
  "shovel-diesel-tonnage-700"
);
const shovel_diesel_fuel_700 = document.getElementById(
  "shovel-diesel-fuel-700"
);
const shovel_diesel_hour_700 = document.getElementById(
  "shovel-diesel-hour-700"
);

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

const magnet_pile = document.getElementById("magnet-pile");
const other_depo_pile = document.getElementById("other-depo-pile");
const minigBlock_pile = document.getElementById("minigBlock-pile");
const smallTruck_pile = document.getElementById("smallTruck-pile");
const bigTruck_pile = document.getElementById("bigTruck-pile");

const stop_shovel_700 = document.getElementById("stop-shovel-700");
const stop_shovel_742 = document.getElementById("stop-shovel-742");
const stop_shovel_apadana = document.getElementById("stop-shovel-apadana");
const stop_truck_700 = document.getElementById("stop-truck-700");
const stop_truck_742 = document.getElementById("stop-truck-742");
const stop_truck_apadana = document.getElementById("stop-truck-apadana");

const crusher1_shift1 = document.getElementById("crusher1-shift1");
const crusher1_shift2 = document.getElementById("crusher1-shift2");
const crusher2_shift1 = document.getElementById("crusher2-shift1");
const crusher2_shift2 = document.getElementById("crusher2-shift2");
const shift1_DF = document.getElementById("shift1-DF");
const shift2_DF = document.getElementById("shift2-DF");

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
  loading.classList.add("d-none");
  search.classList.remove("d-none");
}
let just_lab = document.getElementById("just-lab");

// 700=>1   742=> 3   Beh=> 6   Apa=>7
weekly_report.addEventListener("submit", async (event) => {
  event.preventDefault();
  for (let i = 0; i < tds.length; i++) {
    tds[i].innerHTML = "";
  }

  span_counter.classList.add("d-none");
  message.classList.add("d-none");
  loading.classList.toggle("d-none");
  search.classList.toggle("d-none");

  let start_at = document.getElementById("start-at").value;
  let end_at = document.getElementById("end-at").value;
  let pile_number = document.getElementById("pile").value;

  if (just_lab.checked) {
    const { data: lab } = await axios.post("/weekly-report/lab", {
      start_at,
      end_at,
      pile_number,
    });
    if (!lab) {
      refreshPage();
    }
    magnet_pile.innerHTML = lab.magnet_depo;
    other_depo_pile.innerHTML = lab.other_depo;
    minigBlock_pile.innerHTML = lab.minig_block;
    smallTruck_pile.innerHTML = lab.ton_80;
    bigTruck_pile.innerHTML = lab.ton_105;
  } else {
    const { data: crusherFeed } = await axios.post(
      "/weekly-report/crusher-feed",
      {
        start_at,
        end_at,
        pile_number,
      }
    );
    crusher1_shift1.innerHTML = crusherFeed[0].day_tonnage;
    crusher1_shift2.innerHTML = crusherFeed[0].night_tonnage;
    crusher2_shift1.innerHTML = crusherFeed[1].day_tonnage;
    crusher2_shift2.innerHTML = crusherFeed[1].night_tonnage;
    shift1_DF.innerHTML = crusherFeed[2].day_tonnage;
    shift2_DF.innerHTML = crusherFeed[2].night_tonnage;
    const { data: stop } = await axios.post("/weekly-report/stop", {
      start_at,
      end_at,
      pile_number,
    });
    if (!stop) {
      refreshPage();
    }
    stop_shovel_700.innerHTML = Number(
      stop.record700.shovel.maintenance
    ).toFixed(2);
    stop_shovel_742.innerHTML = Number(
      stop.record742.shovel.maintenance
    ).toFixed(2);
    stop_shovel_apadana.innerHTML = Number(
      stop.recordApadana.shovel.maintenance
    ).toFixed(2);
    stop_truck_700.innerHTML = Number(stop.record700.truck.maintenance).toFixed(
      2
    );
    stop_truck_742.innerHTML = Number(stop.record742.truck.maintenance).toFixed(
      2
    );
    stop_truck_apadana.innerHTML = Number(
      stop.recordApadana.truck.maintenance
    ).toFixed(2);
    const { data: depoToCrusher } = await axios.post(
      "/weekly-report/depo-to-crusher",
      {
        start_at,
        end_at,
      }
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
      }
    );
    if (!depoToCrusher) {
      refreshPage();
    }
    saha_to_cr.innerHTML = sahaToCrusher.crusher / 1000;
    saha_to_depo.innerHTML = sahaToCrusher.depo / 1000;

    const { data: truckUnloading } = await axios.post(
      "/weekly-report/truck-unloading",
      {
        start_at,
        end_at,
      }
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
    truck_hour_700.innerHTML = Number(mojtame.truckHoure).toFixed(1);
    truck_distance_700.innerHTML = Number(mojtame.truckDistance).toFixed(1);
    truck_fuel_700.innerHTML = Number(mojtame.truckFeul).toFixed(1);
    shovel_fuel_700.innerHTML = Number(
      mojtame.shovelDieselFeul + mojtame.loaderFeul
    ).toFixed(1);
    shovel_diesel_fuel_700.innerHTML = Number(mojtame.shovelDieselFeul).toFixed(
      1
    );

    shovel_hour_742.innerHTML = Number(asfalt.shovelHoure).toFixed(1);
    truck_hour_742.innerHTML = Number(asfalt.truckHoure).toFixed(1);
    truck_distance_742.innerHTML = Number(asfalt.truckDistance).toFixed(1);
    truck_fuel_742.innerHTML = Number(asfalt.truckFeul).toFixed(1);
    shovel_fuel_742.innerHTML = Number(asfalt.shovelFeul).toFixed(1);
    const { data: shovel } = await axios.post("/weekly-report/shovel", {
      start_at,
      end_at,
    });
    if (!shovel) {
      refreshPage();
    }
    shovel_depo_hour_700.innerHTML = Number(shovel.hour_ph).toFixed(1);
    shovel_diesel_tonnage_700.innerHTML = Number(shovel.tonnage_diesel).toFixed(
      1
    );
    shovel_diesel_hour_700.innerHTML = Number(shovel.hour_diesel).toFixed(1);
    shovel_hour_700.innerHTML = Number(shovel.allShovelHour).toFixed(1);

    const { data: weighbridge } = await axios.post(
      "/weekly-report/weighbridge",
      {
        start_at,
        end_at,
      }
    );
    if (!weighbridge) {
      refreshPage();
    }
    robat.innerHTML = Number(weighbridge.robat).toFixed(1);
    arjan.innerHTML = Number(weighbridge.arjan).toFixed(1);
    novin.innerHTML = Number(weighbridge.novin).toFixed(1);
    karmania_ka.innerHTML = Number(weighbridge.karmania_ka).toFixed(1);
    karmania_sh.innerHTML = Number(weighbridge.karmania_sh).toFixed(1);
    chah_gaz.innerHTML = Number(weighbridge.chah_gaz).toFixed(1);
    khazar.innerHTML = Number(weighbridge.khazar).toFixed(1);
    galmande.innerHTML = Number(weighbridge.galmande).toFixed(1);

    const { data: depo } = await axios.post("/weekly-report/depo", {
      start_at,
      end_at,
    });
    if (!depo) {
      refreshPage();
    }
    depo_magnet.innerHTML = depo[1].remaind;
    depo_other.innerHTML = depo[0].remaind;
    const { data: lab } = await axios.post("/weekly-report/lab", {
      start_at,
      end_at,
      pile_number,
    });
    if (!lab) {
      refreshPage();
    }
    magnet_pile.innerHTML = lab.magnet_depo;
    other_depo_pile.innerHTML = lab.other_depo;
    minigBlock_pile.innerHTML = lab.minig_block;
    smallTruck_pile.innerHTML = lab.ton_80;
    bigTruck_pile.innerHTML = lab.ton_105;
  }
  setTimeout(() => {
    search.disabled = false;
    span_counter.classList.add("d-none");
  }, 30000);
  search.disabled = true;
  search.classList.remove("d-none");
  loading.classList.add("d-none");
  span_counter.classList.remove("d-none");
});
