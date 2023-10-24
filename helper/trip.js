import axios from "axios";
import { jalaliToMiladi } from "./toMiladi.js";

export async function trip_report(workday, group_id, config) {
  try {
    let start_at = workday.split("/");
    start_at = jalaliToMiladi(start_at[0], start_at[1], start_at[2]);
    const { data } = await axios.post(
      "http://192.168.10.20/trips/report",
      {
        report_at: start_at,
        group_id,
        review: 1,
        shift: [],
        unloading_id: [],
        block_id: [],
      },
      config
    );

    const DepoToDepo = { mine_depo: 0, other_depo: 0 };
    let allService = 0;
    let number_of_over_distance = 0;
    let number_of_over_time = 0;
    let depo_cr_distance = 0;
    let depo_cr_time = 0;
    const DepoToCrusher = [];
    const _4_bogh = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].load_name === "چهار بوق" || data[i].load_name === "چهاربوق") {
        _4_bogh.push(data[i]);
      }
      if (data[i].block_name.startsWith("D-")) {
        allService++;
        if (
          Number(data[i].cycle_distance) > 2400 ||
          Number(data[i].cycle_distance) < 600
        ) {
          number_of_over_distance++;
        } else {
          depo_cr_distance += Number(data[i].cycle_distance);
        }
        if (
          Number(data[i].cycle_time) > 1200 ||
          Number(data[i].cycle_time) < 300
        ) {
          number_of_over_time++;
        } else {
          depo_cr_time += Number(data[i].cycle_time);
        }
        DepoToCrusher.push(data[i]);
        if (!data[i].unloading_name.includes("سنگ شکن")) {
          if (
            data[i].block_name.includes("D-CF3") ||
            data[i].block_name.includes("D-CF2") ||
            data[i].block_name.includes("D-CF3-LP") ||
            data[i].block_name.includes("D-DF") ||
            data[i].block_name.includes("D-CF2 W")
          ) {
            DepoToDepo.mine_depo++;
          } else {
            DepoToDepo.other_depo++;
          }
        }
      }
    }
    if (group_id == 1) {
      global.Other_D_TO_D = DepoToDepo.other_depo;
      global.Mine_D_TO_D = DepoToDepo.mine_depo;
    }
    const average_depo_to_cr_distance =
      depo_cr_distance / (allService - number_of_over_distance);
    const average_depo_to_cr_time =
      depo_cr_time / (allService - number_of_over_time);
    const total_distance =
      (depo_cr_distance +
        average_depo_to_cr_distance * number_of_over_distance) /
      1000;
    const total_time =
      (depo_cr_time + average_depo_to_cr_time * number_of_over_time) / 3600;
    return { DepoToCrusher, _4_bogh, DepoToDepo,total_distance,total_time };
  } catch (err) {
    console.log(err);
    return false;
  }
}
