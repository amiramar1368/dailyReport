import axios from "axios";
import { jalaliToMiladi } from "./toMiladi.js";

export async function trip_report(workday, config) {
  try {
    let start_at = workday.split("/");
    start_at = jalaliToMiladi(start_at[0], start_at[1], start_at[2]);
    const { data } = await axios.post(
      "http://192.168.10.20/trips/all",
      {report_at: start_at ,
      group_id:[1],
      review:1,
      shift:[],
      unloading_id:[]
      },
      config
    );
    const DepoToDepo =[];
    for (let i = 0; i < data.length; i++) {
   if(data[i].block_name.startsWith("D-") && !data[i].unloading_name.includes("سنگ شکن")){
      DepoToDepo.push(data[i])
   }      
    }
    return DepoToDepo;
  } catch (err) {
    console.log(err);
    return false
  }
}
