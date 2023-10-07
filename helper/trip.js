import axios from "axios";
import { jalaliToMiladi } from "./toMiladi.js";

export async function trip_report(workday, group_id, config) {
  try {
    let start_at = workday.split("/");
    start_at = jalaliToMiladi(start_at[0], start_at[1], start_at[2]);
    // const { data } = await axios.post(
    //   "http://192.168.10.20/trips/all",
    //   {report_at: start_at ,
    //   group_id:[1],
    //   review:1,
    //   shift:[],
    //   unloading_id:[]
    //   },
    //   config
    // );
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
    const DepoToCrusher = [];
    const _4_bogh = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].load_name === "چهار بوق" || data[i].load_name === "چهاربوق") {
        _4_bogh.push(data[i]);
      }
      if (data[i].block_name.startsWith("D-")) {
        DepoToCrusher.push(data[i]);
        if (!data[i].unloading_name.includes("سنگ شکن")) {
          if (
            data[i].block_name.includes("D-CF3") ||
            data[i].block_name.includes("D-CF2") ||
            data[i].block_name.includes("D-CF3-LP") ||
            data[i].block_name.includes("D-DF") ||
            data[i].block_name.includes("D-CF2 W")
          ) {
            DepoToDepo.mine_depo ++;
          }else{
            DepoToDepo.other_depo ++
          }
        }
      }
    }
   if(group_id==1){
     global.Other_D_TO_D = DepoToDepo.other_depo;
     global.Mine_D_TO_D = DepoToDepo.mine_depo;
    }
    return { DepoToCrusher, _4_bogh, DepoToDepo };
  } catch (err) {
    console.log(err);
    return false;
  }
}
