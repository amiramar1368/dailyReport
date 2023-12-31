const main_report = document.getElementById("main-report");
const saha_report = document.getElementById("saha-report");
const saha_btn = document.getElementById("saha");
const saha_sample_report = document.getElementById("saha-sample-report");
const saha_sample_btn = document.getElementById("saha-sample");
const saha_sample_table = document.getElementById("saha-sample-table");
const date_input = document.getElementById("jalali");
const pile_number = document.getElementById("pile-number");
const report_form = document.getElementById("report-form");
let loading = document.getElementById("loading");
let search = document.getElementById("search");
const td = document.querySelectorAll("td[id]");
const span_counter = document.getElementById("span-counter");
const time_counter = document.getElementById("time-counter");

const truck700_hour = document.getElementById("truck700-hour");
const truck742_hour = document.getElementById("truck742-hour");
const truck_apa_hour = document.getElementById("truck-apa-hour");
// const truck_beh_hour = document.getElementById("truck-beh-hour");

const dmh_1 = document.getElementById("dmh-1");
const dmh_2 = document.getElementById("dmh-2");
const omz_1 = document.getElementById("omz-1");
const omz_2 = document.getElementById("omz-2");
const omz_3 = document.getElementById("omz-3");
const di550_1 = document.getElementById("di550-1");
const di550_2 = document.getElementById("di550-2");
const di550_3 = document.getElementById("di550-3");
const titon_1 = document.getElementById("titon-1");
const titon_2 = document.getElementById("titon-2");

const loader_tonnage = document.getElementById("loader-tonnage");

const truck700_dis = document.getElementById("truck700-dis");
const truck742_dis = document.getElementById("truck742-dis");
const truck_apa_dis = document.getElementById("truck-apa-dis");
// const truck_beh_dis = document.getElementById("truck-beh-dis");

const shovel_700_hour = document.getElementById("shovel-700-hour");
const shovel_742_hour = document.getElementById("shovel-742-hour");
const shovel_apa_hour = document.getElementById("shovel-apa-hour");
// const shovel_beh_hour = document.getElementById("shovel-beh-hour");

const drillwagon_hour = document.getElementById("drillwagon-hour");
const drillrig_hour = document.getElementById("drillrig-hour");

const mine_depo_to_depo = document.getElementById("mineDepoToDepo");
const other_depo_to_depo = document.getElementById("otherDepoToDepo");
const _4_bogh_700 = document.getElementById("4bogh-700");
const _4_bogh_742 = document.getElementById("4bogh-742");
const _4_bogh_Ap = document.getElementById("4bogh-Ap");
const depoTocrusher_distance = document.getElementById("depoTocrusher-distance");
const depoTocrusher_time = document.getElementById("depoTocrusher-time");

const truck_700_number = document.getElementById("truck-700-number");
const truck_742_number = document.getElementById("truck-742-number");
const truck_apa_number = document.getElementById("truck-apa-number");
// const truck_beh_number = document.getElementById("truck-beh-number");

const shovel_700_number = document.getElementById("shovel-700-number");
const shovel_742_number = document.getElementById("shovel-742-number");
const shovel_apa_number = document.getElementById("shovel-apa-number");
// const shovel_beh_number = document.getElementById("shovel-beh-number");

const omz_number = document.getElementById("omz-number");
const dmh_number = document.getElementById("dmh-number");
const di550_number = document.getElementById("di550-number");
const titon_number = document.getElementById("titon-number");
const sprinkler_number = document.getElementById("sprinkler-number");
const loader_number = document.getElementById("loader-number");
const bull_cat_number = document.getElementById("bull-cat-number");
const bull_komatsu_number = document.getElementById("bull-komatsu-number");
const wheel_number = document.getElementById("wheel-number");
const g16_number = document.getElementById("16g-number");
const g705_number = document.getElementById("g705-number");
const anfo_number = document.getElementById("anfo-number");
const stemming_number = document.getElementById("stemming-number");

const sprinkler_hour = document.getElementById("sprinkler-hour");
const sprinkler_distance = document.getElementById("sprinkler-dis");
const loader_hour = document.getElementById("loader-hour");
const fuel_hour = document.getElementById("fuel-hour");
const fuel_distance = document.getElementById("fuel-dis");
const bull_hour = document.getElementById("bull-hour");
const wheel_hour = document.getElementById("wheel-hour");
const grader_hour = document.getElementById("grader-hour");
const anfo_hour = document.getElementById("anfo-hour");
const stemming_hour = document.getElementById("stemming-hour");

const mine_to_cr_tonnage_700 = document.getElementById(
  "700-mine-to-cr-tonnage"
);
const mine_to_cr_tonnage_742 = document.getElementById(
  "742-mine-to-cr-tonnage"
);
const mine_to_cr_tonnage_apa = document.getElementById(
  "apa-mine-to-cr-tonnage"
);
// const mine_to_cr_tonnage_beh = document.getElementById(
//   "beh-mine-to-cr-tonnage"
// );

const mine_to_magnet_700 = document.getElementById("700-mine-to-magnet");
const mine_to_magnet_742 = document.getElementById("742-mine-to-magnet");
const mine_to_magnet_apa = document.getElementById("apa-mine-to-magnet");
// const mine_to_magnet_beh = document.getElementById("beh-mine-to-magnet");

const depo_to_cr = document.getElementById("depo-to-cr");

const mine_to_road_700 = document.getElementById("700-mine-to-road");
const mine_to_road_742 = document.getElementById("742-mine-to-road");
const mine_to_road_apa = document.getElementById("apa-mine-to-road");
// const mine_to_road_beh = document.getElementById("beh-mine-to-road");

const east_tonnage_700 = document.getElementById("700-east-tonnage");
const east_tonnage_742 = document.getElementById("742-east-tonnage");
const east_tonnage_apa = document.getElementById("apa-east-tonnage");
// const east_tonnage_beh = document.getElementById("beh-east-tonnage");

const west_tonnage_700 = document.getElementById("700-west-tonnage");
const west_tonnage_742 = document.getElementById("742-west-tonnage");
const west_tonnage_apa = document.getElementById("apa-west-tonnage");
// const west_tonnage_beh = document.getElementById("beh-west-tonnage");

const waste_road_tonnage_700 = document.getElementById(
  "700-waste-road-tonnage"
);
const waste_road_tonnage_742 = document.getElementById(
  "742-waste-road-tonnage"
);
const waste_road_tonnage_apa = document.getElementById(
  "apa-waste-road-tonnage"
);
// const waste_road_tonnage_beh = document.getElementById(
//   "beh-waste-road-tonnage"
// );

const depo_magnet_to_cr = document.getElementById("depo-magnet-to-cr");
const depo_oxide_to_cr = document.getElementById("depo-oxide-to-cr");
const depo_robat_to_cr = document.getElementById("depo-robat-to-cr");
const depo_novin_to_cr = document.getElementById("depo-novin-to-cr");
const crusher_service = document.getElementById("crusher-service");

const robat_daily = document.getElementById("robat-daily");
const novin_daily = document.getElementById("novin-daily");
const arjan_daily = document.getElementById("arjan-daily");
const poolad_daily = document.getElementById("poolad-daily");
const karmania_kashan_daily = document.getElementById("karmania-kashan-daily");
const chah_gaz_daily = document.getElementById("chah-gaz-daily");
const galmande_daily = document.getElementById("galmande-daily");
const saha_east_depo_daily = document.getElementById("saha-east-depo-daily");
const saha_east_cr_daily = document.getElementById("saha-east-cr-daily");
const saha_west_depo_daily = document.getElementById("saha-west-depo-daily");
const saha_west_cr_daily = document.getElementById("saha-west-cr-daily");

const robat_monthly = document.getElementById("robat-monthly");
const novin_monthly = document.getElementById("novin-monthly");
const arjan_monthly = document.getElementById("arjan-monthly");
const poolad_monthly = document.getElementById("poolad-monthly");
const karmania_kashan_monthly = document.getElementById(
  "karmania-kashan-monthly"
);
const chah_gaz_monthly = document.getElementById("chah-gaz-monthly");
const galmande_monthly = document.getElementById("galmande-monthly");
const saha_east_depo_monthly = document.getElementById(
  "saha-east-depo-monthly"
);
const saha_east_cr_monthly = document.getElementById("saha-east-cr-monthly");
const saha_west_depo_monthly = document.getElementById(
  "saha-west-depo-monthly"
);
const saha_west_cr_monthly = document.getElementById("saha-west-cr-monthly");

const magnet_depo = document.getElementById("magnet-depo");
const other_depo = document.getElementById("other-depo");
const robat_depo = document.getElementById("robat-depo");
const novin_depo = document.getElementById("novin-depo");

const stop_shovel = document.getElementById("stop-shovel");
const stop_truck = document.getElementById("stop-truck");

const speed_700 = document.getElementById("speed-700");
const speed_742 = document.getElementById("speed-742");
const speed_apa = document.getElementById("speed-apa");
// const speed_beh = document.getElementById("speed-beh");

const speed_duration_700 = document.getElementById("speed-duration-700");
const speed_duration_742 = document.getElementById("speed-duration-742");
const speed_duration_apa = document.getElementById("speed-duration-apa");
// const speed_duration_beh = document.getElementById("speed-duration-beh");

const last_sample = document.getElementById("last-sample");
const pile_Fe = document.getElementById("pile-fe");
const pile_M = document.getElementById("pile-m");
const pile_P = document.getElementById("pile-p");
const pile_FeO = document.getElementById("pile-feo");

const crusher_stop = document.getElementById("crusher-stop");
const truck_stop = document.getElementById("truck-stop");
const shovel_stop = document.getElementById("shovel-stop");
const active_cr = document.getElementById("active-cr");

const abroft_700 = document.getElementById("abroft-700");
const abroft_742 = document.getElementById("abroft-742");
const abroft_apa = document.getElementById("abroft-apa");
// const abroft_beh = document.getElementById("abroft-beh");

const message = document.getElementById("message");
const message_success = document.getElementById("success-message");

const transport_depo_700 = document.getElementById("transport-depo-700");
const transport_ore_700 = document.getElementById("transport-ore-700");
const transport_ore_742 = document.getElementById("transport-ore-742");
const transport_ore_apa = document.getElementById("transport-ore-apa");
// const transport_ore_beh = document.getElementById("transport-ore-beh");

const transport_waste_700 = document.getElementById("transport-waste-700");
const transport_waste_742 = document.getElementById("transport-waste-742");
const transport_waste_apa = document.getElementById("transport-waste-apa");
// const transport_waste_beh = document.getElementById("transport-waste-beh");

const over_hour_700 = document.getElementById("over-hour-700");
const over_hour_742 = document.getElementById("over-hour-742");
const over_hour_apa = document.getElementById("over-hour-apa");
// const over_hour_beh = document.getElementById("over-hour-beh");

const diff_700 = document.getElementById("diff-700");
const diff_742 = document.getElementById("diff-742");
const diff_apa = document.getElementById("diff-apa");
// const diff_beh = document.getElementById("diff-beh");

const stop_shovel_700 = document.getElementById("stop-shovel-700");
const stop_loader_700 = document.getElementById("stop-loader-700");
const stop_shovel_742 = document.getElementById("stop-shovel-742");
const stop_shovel_Apa = document.getElementById("stop-shovel-apadana");

const stop_truck_700 = document.getElementById("stop-truck-700");
const stop_truck_742 = document.getElementById("stop-truck-742");
const stop_truck_Apa = document.getElementById("stop-truck-apadana");

const working_truck_700 = document.getElementById("working-truck-700");
const working_truck_742 = document.getElementById("working-truck-742");
const working_truck_Apa = document.getElementById("working-truck-apadana");

const ready_truck_700 = document.getElementById("ready-truck-700");
const ready_truck_742 = document.getElementById("ready-truck-742");
const ready_truck_Apa = document.getElementById("ready-truck-apadana");

const ready_shovel_700 = document.getElementById("ready-shovel-700");
const ready_loader_700 = document.getElementById("ready-loader-700");
const ready_shovel_742 = document.getElementById("ready-shovel-742");
const ready_shovel_Apa = document.getElementById("ready-shovel-apadana");

const working_shovel_700 = document.getElementById("working-shovel-700");
const working_loader_700 = document.getElementById("working-loader-700");
const working_shovel_742 = document.getElementById("working-shovel-742");
const working_shovel_Apa = document.getElementById("working-shovel-apadana");

const fuel_shovel_700 = document.getElementById("fuel-shovel-700");
const fuel_shovel_742 = document.getElementById("fuel-shovel-742");
const fuel_shovel_apadana = document.getElementById("fuel-shovel-apadana");
const fuel_truck_700 = document.getElementById("fuel-truck-700");
const fuel_truck_742 = document.getElementById("fuel-truck-742");
const fuel_truck_apadana = document.getElementById("fuel-truck-apadana");

const mis_tonnage = document.getElementById("mis-tonnage");

const all_fuel = document.getElementById("all-fuel");

const seperation_saha_to_cr = document.querySelectorAll(
  "div#saha-report td[id]"
);
async function get_report(report_name) {
  start_at = date_input.value;
  pile = pile_input.value;
  const { data } = await axios.post("/report/extraction", { start_at, pile });
  return data;
}

function refreshPage() {
  message.classList.remove("d-none");
  loading.classList.add("d-none");
  search.classList.remove("d-none");
  main_report.classList.remove("d-none");
  saha_report.classList.add("d-none");
  saha_sample_report.classList.add("d-none");
}

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

// 700=>1   742=> 3   Beh=> 6   Apa=>7
report_form.addEventListener("submit", async (event) => {
  event.preventDefault();
  main_report.classList.remove("d-none");
  saha_report.classList.add("d-none");
  saha_sample_report.classList.add("d-none");

  for (let i = 0; i < td.length; i++) {
    td[i].innerHTML = "";
  }
  span_counter.classList.add("d-none");
  message.classList.add("d-none");
  message_success.classList.add("d-none");
  loading.classList.toggle("d-none");
  search.classList.toggle("d-none");
  start_at = date_input.value;
  // let pile;

  let { data: pileNumber } = await axios.post("/report/pile", { start_at });
  if (pileNumber == "") {
    alert("مجددا لاگین نمایید");
    location.href = "/";
    return;
  }
  if (pileNumber.length < 1 || pileNumber.length > 2) {
    return alert("گزارش Mis مشکل دارد");
  }
  pile_number.innerHTML = pileNumber[pileNumber.length - 1].pile;

  const { data: allFuels } = await axios.post("/report/all-fuel", { start_at });
  if (!stop) {
    refreshPage();
  }
  all_fuel.innerHTML = Number(allFuels).toFixed(3)
  const { data: fuels } = await axios.post("/report/fuel", { start_at });
  if (!stop) {
    refreshPage();
  }
  fuel_shovel_700.innerHTML= (fuels.record_700.shovel ).toFixed(3)
  fuel_shovel_742.innerHTML= (fuels.record_742.shovel ).toFixed(3)
  fuel_shovel_apadana.innerHTML= (fuels.record_Apa.shovel ).toFixed(3)
  fuel_truck_700.innerHTML= (fuels.record_700.truck ).toFixed(3)
  fuel_truck_742.innerHTML= (fuels.record_742.truck ).toFixed(3)
  fuel_truck_apadana.innerHTML= (fuels.record_Apa.truck ).toFixed(3)
  const { data: stops } = await axios.post("/report/stop", { start_at });
  if (!stop) {
    refreshPage();
  }
  stop_shovel_700.innerHTML = (stops.record_700.stop.shovel / 60).toFixed(2);
  stop_loader_700.innerHTML = (stops.record_700.stop.loader / 60).toFixed(2);
  stop_shovel_742.innerHTML = (stops.record_742.stop.shovel / 60).toFixed(2);
  stop_shovel_Apa.innerHTML = (stops.record_Ap.stop.shovel / 60).toFixed(2);

  working_truck_700.innerHTML=(stops.record_700.working.truck / 60).toFixed(2);
  working_truck_742.innerHTML = (stops.record_742.working.truck / 60).toFixed(2);
  working_truck_Apa.innerHTML = (stops.record_Ap.working.truck / 60).toFixed(2);

  ready_truck_700.innerHTML=(stops.record_700.ready.truck / 60).toFixed(2);
  ready_truck_742.innerHTML = (stops.record_742.ready.truck / 60).toFixed(2);
  ready_truck_Apa.innerHTML = (stops.record_Ap.ready.truck / 60).toFixed(2);
  
  stop_truck_700.innerHTML=(stops.record_700.stop.truck / 60).toFixed(2);
  stop_truck_742.innerHTML = (stops.record_742.stop.truck / 60).toFixed(2);
  stop_truck_Apa.innerHTML = (stops.record_Ap.stop.truck / 60).toFixed(2);

  ready_shovel_700.innerHTML=(stops.record_700.ready.shovel / 60).toFixed(2);
  ready_loader_700.innerHTML = (stops.record_700.ready.loader / 60).toFixed(2);
  ready_shovel_742.innerHTML = (stops.record_742.ready.shovel / 60).toFixed(2);
  ready_shovel_Apa.innerHTML = (stops.record_Ap.ready.shovel / 60).toFixed(2);
  working_shovel_700.innerHTML=(stops.record_700.working.shovel / 60).toFixed(2);
  working_loader_700.innerHTML = (stops.record_700.working.loader / 60).toFixed(2);
  working_shovel_742.innerHTML = (stops.record_742.working.shovel / 60).toFixed(2);
  working_shovel_Apa.innerHTML = (stops.record_Ap.working.shovel / 60).toFixed(2);

  const { data: trips } = await axios.post("/report/trips", {
    start_at,
  });
   pile=pileNumber[pileNumber.length - 1].pile;
  mine_depo_to_depo.innerHTML = trips.trips700.DepoToDepo.mine_depo;
  other_depo_to_depo.innerHTML = trips.trips700.DepoToDepo.other_depo;
  
  const depoTodepo = trips.trips700.DepoToDepo;
  const allDepoToCR = trips.trips700.DepoToCrusher;
  const _4_bogh_trips_700 = {...trips.trips700._4_bogh};
  const _4_bogh_trips_742 = {...trips.trips742._4_bogh};
  const _4_bogh_trips__Ap = {...trips.tripsAp._4_bogh};
  let depo_cr_distance=0;
  let number_of_over_distance=0;
  const D_TO_D = {};
  const final_4_bogh = {Mo:{},As:{},Ap:{}};
  for (let i = 0; i < depoTodepo.length; i++) {
    const block_name = depoTodepo[i].block_name;
    if (!D_TO_D[block_name]) {
      D_TO_D[block_name] = 1;
    } else {
      D_TO_D[block_name]++;
    }
  }
  for (let item in _4_bogh_trips_700) {
    const unloading_name = _4_bogh_trips_700[item].unloading_name;
    if (!final_4_bogh.Mo[unloading_name]) {
      final_4_bogh.Mo[unloading_name] = 1;
    } else {
      final_4_bogh.Mo[unloading_name]++;
    }
  }
  for (let item in _4_bogh_trips_742) {
    const unloading_name = _4_bogh_trips_742[item].unloading_name;
    if (!final_4_bogh.As[unloading_name]) {
      final_4_bogh.As[unloading_name] = 1;
    } else {
      final_4_bogh.As[unloading_name]++;
    }
  }
  for (let item in _4_bogh_trips__Ap) {
    const unloading_name = _4_bogh_trips__Ap[item].unloading_name;
    if (!final_4_bogh.Ap[unloading_name]) {
      final_4_bogh.Ap[unloading_name] = 1;
    } else {
      final_4_bogh.Ap[unloading_name]++;
    }
  }
  for (let i = 0; i < allDepoToCR.length; i++) {
    if((Number(allDepoToCR[i].cycle_distance)>2400) || (Number(allDepoToCR[i].cycle_distance)<800)){
      number_of_over_distance ++;
    }else{
      depo_cr_distance += Number(allDepoToCR[i].cycle_distance);
    }
  }
  _4_bogh_700.innerHTML = JSON.stringify(final_4_bogh.Mo);
  _4_bogh_742.innerHTML = JSON.stringify(final_4_bogh.As);
  _4_bogh_Ap.innerHTML = JSON.stringify(final_4_bogh.Ap);
  depoTocrusher_distance.innerHTML = (trips.trips700.total_distance).toFixed(2);
  depoTocrusher_time.innerHTML = (trips.trips700.total_time).toFixed(2);

  
  const { data: mis } = await axios.post("/report/mis", { start_at, pile });
  if (!mis) {
    refreshPage();
  }
  mis_tonnage.innerHTML = Number(mis.additional_info.day_direct_tonnage)+
  Number(mis.additional_info.day_yard_tonnage)+
  Number(mis.additional_info.day_yard_tonnage_old)+
  Number(mis.additional_info.night_direct_tonnage)+
  Number(mis.additional_info.night_yard_tonnage)+
  Number(mis.additional_info.night_yard_tonnage_old);

  for (let i = 0; i < mis.stop_start.length; i++) {
    if (mis.stop_start[i].reason_id == "113") {
      truck_stop.innerHTML = mis.stop_start[i].sumduration;
    } else if (mis.stop_start[i].reason_id == "121") {
      shovel_stop.innerHTML = mis.stop_start[i].sumduration;
    }
  }
  active_cr.innerHTML = "CR-1 & CR-2";
  let cr1_tonnage =
    mis.additional_info.day_yard_tonnage_old +
    mis.additional_info.night_yard_tonnage_old;
  let cr2_tonnage =
    mis.additional_info.day_yard_tonnage +
    mis.additional_info.night_yard_tonnage;

  if (cr1_tonnage == 0) {
    active_cr.innerHTML = "CR-2";
  }
  if (cr2_tonnage == 0) {
    active_cr.innerHTML = "CR-1";
  }
  if (cr1_tonnage + cr2_tonnage == 0) {
    active_cr.innerHTML = "-";
  }
  crusher_stop.innerHTML = mis.sum.total_duration;

  const { data: extraction } = await axios.post("/report/extraction", {
    start_at,
    pile,
  });
  if (!extraction) {
    refreshPage();
  }
  over_hour_700.innerHTML =
    extraction.extraction_700.over_houres[700].length + "دستگاه ";
  over_hour_742.innerHTML =
    extraction.extraction_700.over_houres[742].length + "دستگاه ";
  over_hour_apa.innerHTML =
    extraction.extraction_700.over_houres.apa.length + "دستگاه ";
  // over_hour_beh.innerHTML =extraction.extraction_700.over_houres.beh.length + "دستگاه ";

  omz_1.innerHTML = extraction.extraction_700.omz_1.toFixed(2);
  omz_2.innerHTML = extraction.extraction_700.omz_2.toFixed(2);
  omz_3.innerHTML = extraction.extraction_700.omz_3.toFixed(2);
  dmh_1.innerHTML = extraction.extraction_700.dmh_1.toFixed(2);
  dmh_2.innerHTML = extraction.extraction_700.dmh_2.toFixed(2);
  di550_1.innerHTML = extraction.extraction_700.di550_1.toFixed(2);
  di550_2.innerHTML = extraction.extraction_700.di550_2.toFixed(2);
  di550_3.innerHTML = extraction.extraction_700.di550_3.toFixed(2);
  titon_1.innerHTML = extraction.extraction_700.titon_1.toFixed(2);
  titon_2.innerHTML = extraction.extraction_700.titon_2.toFixed(2);

  truck700_hour.innerHTML = extraction.extraction_700.truck_workTime.toFixed(2);
  truck742_hour.innerHTML = extraction.extraction_742.truck_workTime.toFixed(2);
  truck_apa_hour.innerHTML =extraction.extraction_Apa.truck_workTime.toFixed(2);
  // truck_beh_hour.innerHTML =extraction.extraction_Beh.truck_workTime.toFixed(2);

  truck700_dis.innerHTML = extraction.extraction_700.truck_distance.toFixed(2);
  truck742_dis.innerHTML = extraction.extraction_742.truck_distance.toFixed(2);
  truck_apa_dis.innerHTML = extraction.extraction_Apa.truck_distance.toFixed(2);
  // truck_beh_dis.innerHTML = extraction.extraction_Beh.truck_distance.toFixed(2);

  shovel_700_hour.innerHTML =
    extraction.extraction_700.shovel_workTime.toFixed(2);
  shovel_742_hour.innerHTML =
    extraction.extraction_742.shovel_workTime.toFixed(2);
  shovel_apa_hour.innerHTML =
    extraction.extraction_Apa.shovel_workTime.toFixed(2);
  // shovel_beh_hour.innerHTML =extraction.extraction_Beh.shovel_workTime.toFixed(2);

  truck_700_number.innerHTML =
    extraction.extraction_700.truck_number.toFixed(2);
  truck_742_number.innerHTML =
    extraction.extraction_742.truck_number.toFixed(2);
  truck_apa_number.innerHTML =
    extraction.extraction_Apa.truck_number.toFixed(2);
  // truck_beh_number.innerHTML =extraction.extraction_Beh.truck_number.toFixed(2);

  shovel_700_number.innerHTML =
    extraction.extraction_700.shovel_number.toFixed(2);
  shovel_742_number.innerHTML =
    extraction.extraction_742.shovel_number.toFixed(2);
  shovel_apa_number.innerHTML =
    extraction.extraction_Apa.shovel_number.toFixed(2);
  // shovel_beh_number.innerHTML =extraction.extraction_Beh.shovel_number.toFixed(2);

  omz_number.innerHTML = extraction.extraction_700.omz_number;
  dmh_number.innerHTML = extraction.extraction_700.dmh_number;
  di550_number.innerHTML = extraction.extraction_700.DI550_number;
  titon_number.innerHTML = extraction.extraction_700.Titon_number;
  sprinkler_number.innerHTML = extraction.extraction_700.sprinkler_number;
  loader_number.innerHTML = extraction.extraction_700.loader_number;
  bull_cat_number.innerHTML = extraction.extraction_700.bull_cat_number;
  bull_komatsu_number.innerHTML = extraction.extraction_700.bull_komatsu_number;
  wheel_number.innerHTML = extraction.extraction_700.wheeldozer_number;
  g16_number.innerHTML = extraction.extraction_700.grader_16G_number;
  g705_number.innerHTML = extraction.extraction_700.grader_G705_number;
  anfo_number.innerHTML = extraction.extraction_700.anfo_number;
  stemming_number.innerHTML = extraction.extraction_700.stemming_number;

  sprinkler_hour.innerHTML =
    extraction.extraction_700.sprinkler_workTime.toFixed(2);
  sprinkler_distance.innerHTML =
    extraction.extraction_700.sprinkler_distance.toFixed(2);
  loader_hour.innerHTML = extraction.extraction_700.loader_workTime.toFixed(2);
  fuel_hour.innerHTML = extraction.extraction_700.fuel_workTime.toFixed(2);
  fuel_distance.innerHTML = extraction.extraction_700.fuel_distance.toFixed(2);
  bull_hour.innerHTML = extraction.extraction_700.bulldozer_workTime.toFixed(2);
  wheel_hour.innerHTML =
    extraction.extraction_700.wheeldozer_workTime.toFixed(2);
  grader_hour.innerHTML = extraction.extraction_700.grader_workTime.toFixed(2);
  anfo_hour.innerHTML = extraction.extraction_700.anfo_workTime.toFixed(2);
  stemming_hour.innerHTML =
    extraction.extraction_700.stemming_workTime.toFixed(2);
  drillwagon_hour.innerHTML =
    extraction.extraction_700.drillWagon_workTime.toFixed(2);
  drillrig_hour.innerHTML =
    extraction.extraction_700.drillrig_workTime.toFixed(2);
  const { data: tonnage } = await axios.post("/report/loader_tonnage", {
    start_at,
  });
  if (!tonnage) {
    refreshPage();
  }

  loader_tonnage.innerHTML = tonnage.loader_tonnage;

  const { data: crusher } = await axios.post("/report/crusher", { start_at });
  if (!crusher) {
    refreshPage();
  }
  depo_magnet_to_cr.innerHTML = crusher.crusher_feed.magnet;
  depo_oxide_to_cr.innerHTML = crusher.crusher_feed.oxide;
  depo_robat_to_cr.innerHTML = crusher.crusher_feed.robat;
  depo_novin_to_cr.innerHTML = crusher.crusher_feed.novin;
  crusher_service.innerHTML = crusher.crusher_feed.all_service;

  const { data: unloading } = await axios.post("/report/unloading", {
    start_at,
    pile,
  });
  if (!unloading) {
    refreshPage();
  }

  diff_700.innerHTML = unloading.unloading_700.compare;
  diff_742.innerHTML = unloading.unloading_742.compare;
  diff_apa.innerHTML = unloading.unloading_Apa.compare;
  // diff_beh.innerHTML = unloading.unloading_Beh.compare;
  mine_to_cr_tonnage_700.innerHTML =
    unloading.unloading_700.ore_mine_to_cr_tonnage;
  mine_to_cr_tonnage_742.innerHTML =
    unloading.unloading_742.ore_mine_to_cr_tonnage;
  mine_to_cr_tonnage_apa.innerHTML =
    unloading.unloading_Apa.ore_mine_to_cr_tonnage;
  // mine_to_cr_tonnage_beh.innerHTML =unloading.unloading_Beh.ore_mine_to_cr_tonnage;

  mine_to_magnet_700.innerHTML =
    unloading.unloading_700.ore_mine_to_magnet_tonnage;
  mine_to_magnet_742.innerHTML =
    unloading.unloading_742.ore_mine_to_magnet_tonnage;
  mine_to_magnet_apa.innerHTML =
    unloading.unloading_Apa.ore_mine_to_magnet_tonnage;
  // mine_to_magnet_beh.innerHTML =unloading.unloading_Beh.ore_mine_to_magnet_tonnage;

  mine_to_road_700.innerHTML = unloading.unloading_700.ore_mine_to_road_tonnage;
  mine_to_road_742.innerHTML = unloading.unloading_742.ore_mine_to_road_tonnage;
  mine_to_road_apa.innerHTML = unloading.unloading_Apa.ore_mine_to_road_tonnage;
  // mine_to_road_beh.innerHTML = unloading.unloading_Beh.ore_mine_to_road_tonnage;

  east_tonnage_700.innerHTML = unloading.unloading_700.waste_east_tonnage;
  east_tonnage_742.innerHTML = unloading.unloading_742.waste_east_tonnage;
  east_tonnage_apa.innerHTML = unloading.unloading_Apa.waste_east_tonnage;
  // east_tonnage_beh.innerHTML = unloading.unloading_Beh.waste_east_tonnage;

  west_tonnage_700.innerHTML = unloading.unloading_700.waste_west_tonnage;
  west_tonnage_742.innerHTML = unloading.unloading_742.waste_west_tonnage;
  west_tonnage_apa.innerHTML = unloading.unloading_Apa.waste_west_tonnage;
  // west_tonnage_beh.innerHTML = unloading.unloading_Beh.waste_west_tonnage;

  waste_road_tonnage_700.innerHTML = unloading.unloading_700.waste_road_tonnage;
  waste_road_tonnage_742.innerHTML = unloading.unloading_742.waste_road_tonnage;
  waste_road_tonnage_apa.innerHTML = unloading.unloading_Apa.waste_road_tonnage;
  // waste_road_tonnage_beh.innerHTML = unloading.unloading_Beh.waste_road_tonnage;

  const { data: abroft } = await axios.post("/report/abroft", {
    start_at,
    pile,
  });
  if (!abroft) {
    refreshPage();
  }
  abroft_700.innerHTML = abroft.abroft_700.moj;
  abroft_742.innerHTML = abroft.abroft_742.asfalt;
  abroft_apa.innerHTML = abroft.abroft_Apa.apa;
  // abroft_beh.innerHTML = 0;
  const { data: transport } = await axios.post("/report/transport", {
    start_at,
    pile,
  });
  if (!transport) {
    refreshPage();
  }
  transport_depo_700.innerHTML = transport.transport_700.depo;
  transport_ore_700.innerHTML = transport.transport_700.ore;
  transport_ore_742.innerHTML = transport.transport_742.ore;
  transport_ore_apa.innerHTML = transport.transport_Apa.ore;
  // transport_ore_beh.innerHTML = transport.transport_Beh.ore;
  transport_waste_700.innerHTML = transport.transport_700.waste;
  transport_waste_742.innerHTML = transport.transport_742.waste;
  transport_waste_apa.innerHTML = transport.transport_Apa.waste;
  // transport_waste_beh.innerHTML = transport.transport_Beh.waste;

  depo_to_cr.innerHTML = transport.transport_700.depo;

  const { data: depo } = await axios.post("/report/depo", { start_at, pile });
  if (!depo) {
    refreshPage();
  }

  magnet_depo.innerHTML = depo.magnet;
  other_depo.innerHTML = depo.other;
  robat_depo.innerHTML = depo.robat;
  novin_depo.innerHTML = depo.novin;

  
  const { data: speed } = await axios.post("/report/speed", { start_at });
  if (!speed) {
    refreshPage();
  }
  speed_700.innerHTML = speed.speed_700.speed.toFixed(2);
  speed_742.innerHTML = speed.speed_742.speed.toFixed(2);
  speed_apa.innerHTML = speed.speed_Apa.speed.toFixed(2);
  // speed_beh.innerHTML = speed.speed_Beh.speed.toFixed(2);
  speed_duration_700.innerHTML = speed.speed_700.duration;
  speed_duration_742.innerHTML = speed.speed_742.duration;
  speed_duration_apa.innerHTML = speed.speed_Apa.duration;
  // speed_duration_beh.innerHTML = speed.speed_Beh.duration;

  const { data: lab } = await axios.post("/report/lab", { start_at, pile });
  if (!lab) {
    refreshPage();
  }
  //   separation
  last_sample.innerHTML = lab.last_sample;
  pile_Fe.innerHTML = Number(lab.average.fe).toFixed(2);
  pile_M.innerHTML = Number(lab.average.m).toFixed(2);
  pile_FeO.innerHTML = Number(lab.average.feo).toFixed(2);
  pile_P.innerHTML = Number(lab.average.p).toFixed(3);

  //! *****************
setTimeout(async()=>{
  const { data: weighbridge } = await axios.post("/report/weighbridge", {
    start_at,
    pile: 918,
  });
  if (!weighbridge) {
    refreshPage();
  }
  const { data: samples } = await axios.post("/report/samples", {
    start_at,
  });
  if (!samples) {
    refreshPage();
  }
  const east_saha_to_cr =
    weighbridge.weighbridge_east_saha_to_cr.east_saha_to_cr;
  const west_saha_to_cr =
    weighbridge.weighbridge_west_saha_to_cr.west_saha_to_cr;
  const all_saha_cr = [...east_saha_to_cr, ...west_saha_to_cr];
  const clean_samples = [];
  for (let i = 0; i < samples.length; i++) {
    if (start_at == samples[i].jalaliWorkday) {
      clean_samples.push(samples[i]);
    }
  }
  const sample_detail = {};
  for (let i = 0; i < clean_samples.length; i++) {
    let code = clean_samples[i].piling_code;
    sample_detail[code] = { start: "", end: "", services: [] };
    if (clean_samples[i - 1]) {
      sample_detail[code].start = new Date(
        clean_samples[i - 1].workday + " " + clean_samples[i - 1].sample_time
      );
    } else {
      sample_detail[code].start = new Date(
        clean_samples[i].workday + " " + "00:00:00"
      );
    }
    sample_detail[code].end = new Date(
      clean_samples[i].workday + " " + clean_samples[i].sample_time
    );
  }

  for (const item of all_saha_cr) {
    const time = new Date(item.weight_at + " " + item.first_time);
    for (const elem in sample_detail) {
      if (
        time >= sample_detail[elem].start &&
        time <= sample_detail[elem].end
      ) {
        sample_detail[elem].services.push(item);
        continue;
      } else if (sample_detail[elem].start > sample_detail[elem].end) {
        if (
          time >= sample_detail[elem].start ||
          time <= sample_detail[elem].end
        ) {
          sample_detail[elem].services.push(item);
        }
      }
    }
  }
  saha_sample_table.innerHTML = "";
  let html = "";
  let num = 1;
  for (const item in sample_detail) {
    let time = sample_detail[item].end.toLocaleTimeString();
    let services = sample_detail[item].services.length;
    let pm_am = time.split(" ")[1];
    let h = Number(time.split(" ")[0].split(":")[0]);
    let m = Number(time.split(" ")[0].split(":")[1]);
    let s = Number(time.split(" ")[0].split(":")[2]);

    if (pm_am == "PM" && h == 12) {
    } else if (pm_am == "PM") {
      h = h + 12;
    }
    if (pm_am == "AM" && h == 12) {
      h = 0;
    }
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    time = `${h}:${m}:${s}`;
    html += `
    <tr>
       <td>${num}</td>
       <td>${item}</td>
       <td>${time}</td>
       <td>${item} ( ${time} )</td>
       <td>${services}</td>
    </tr>
    `;
    num++;
  }
  saha_sample_table.innerHTML = html;
  robat_daily.innerHTML = weighbridge.weighbridge_robat.daily_tonnage;
  arjan_daily.innerHTML = weighbridge.weighbridge_arjan.daily_tonnage;
  poolad_daily.innerHTML = weighbridge.weighbridge_poolad.daily_tonnage;
  karmania_kashan_daily.innerHTML =
    weighbridge.weighbridge_karmania_kashan.daily_tonnage;
  chah_gaz_daily.innerHTML = weighbridge.weighbridge_chah_gaz.daily_tonnage;
  novin_daily.innerHTML = weighbridge.weighbridge_novin.daily_tonnage;
  galmande_daily.innerHTML = weighbridge.weighbridge_galmande.daily_tonnage;
  saha_east_depo_daily.innerHTML =
    weighbridge.weighbridge_east_saha_to_Depo.daily_tonnage;
  saha_east_cr_daily.innerHTML =
    weighbridge.weighbridge_east_saha_to_cr.daily_tonnage;
  saha_west_depo_daily.innerHTML =
    weighbridge.weighbridge_west_saha_to_Depo.daily_tonnage;
  saha_west_cr_daily.innerHTML =
    weighbridge.weighbridge_west_saha_to_cr.daily_tonnage;

  robat_monthly.innerHTML = weighbridge.weighbridge_robat.monthly_tonnage;
  arjan_monthly.innerHTML = weighbridge.weighbridge_arjan.monthly_tonnage;
  novin_monthly.innerHTML = weighbridge.weighbridge_novin.monthly_tonnage;
  poolad_monthly.innerHTML = weighbridge.weighbridge_poolad.monthly_tonnage;
  karmania_kashan_monthly.innerHTML =
    weighbridge.weighbridge_karmania_kashan.monthly_tonnage;
  chah_gaz_monthly.innerHTML = weighbridge.weighbridge_chah_gaz.monthly_tonnage;
  galmande_monthly.innerHTML = weighbridge.weighbridge_galmande.monthly_tonnage;
  saha_east_depo_monthly.innerHTML =
    weighbridge.weighbridge_east_saha_to_Depo.monthly_tonnage;
  saha_east_cr_monthly.innerHTML =
    weighbridge.weighbridge_east_saha_to_cr.monthly_tonnage;
  saha_west_depo_monthly.innerHTML =
    weighbridge.weighbridge_west_saha_to_Depo.monthly_tonnage;
  saha_west_cr_monthly.innerHTML =
    weighbridge.weighbridge_west_saha_to_cr.monthly_tonnage;

  // seperation_saha_to_cr
  const saha_east =
    weighbridge.weighbridge_east_saha_to_cr.seperation_east_saha_to_cr;
  const saha_west =
    weighbridge.weighbridge_west_saha_to_cr.seperation_west_saha_to_cr;

  for (let i = 0; i <= 24; i++) {
    const number = Number(saha_east[i]) + Number(saha_west[i]);
    if (i != 24) {
      seperation_saha_to_cr[i].innerHTML = number;
    }
  }
  countDown(58);
    search.disabled = false;
  search.disabled = true;
  search.classList.toggle("d-none");
  loading.classList.toggle("d-none");
  message_success.classList.toggle("d-none");
  span_counter.classList.remove("d-none");
},61000)
//! ********************************************
  
});

saha_btn.addEventListener("click", () => {
  if (saha_report.classList.contains("d-none")) {
    saha_report.classList.remove("d-none");
    saha_sample_report.classList.add("d-none");
    main_report.classList.add("d-none");
  } else {
    saha_report.classList.add("d-none");
    saha_sample_report.classList.add("d-none");
    main_report.classList.remove("d-none");
  }
});
saha_sample_btn.addEventListener("click", () => {
  if (saha_sample_report.classList.contains("d-none")) {
    saha_report.classList.add("d-none");
    saha_sample_report.classList.remove("d-none");
    main_report.classList.add("d-none");
  } else {
    saha_report.classList.add("d-none");
    saha_sample_report.classList.add("d-none");
    main_report.classList.remove("d-none");
  }
});
function splitNumber(value) {
  var num = value.toLocaleString();
  return num;
}
