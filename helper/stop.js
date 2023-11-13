import axios from "axios";

import { jalaliToMiladi } from "./toMiladi.js";

export async function stop_report(
  start_at,
  end_at,
  group_id,
  config
) {
  var start_at, end_at;
  start_at = start_at.split("/");
  start_at = end_at = jalaliToMiladi(start_at[0], start_at[1], start_at[2]);
  const record = {working:{truck: 0, shovel: 0, loader: 0}, stop:{truck: 0, shovel: 0, loader: 0},ready:{truck: 0, shovel: 0, loader: 0} };
  const { data: truck } = await axios.post(
    "/maintenance/reports/stops",
    { start_at, end_at, group_id, vehicle_type_id: 1 },
    config
  );
  const { data: shovel } = await axios.post(
    "/maintenance/reports/stops",
    { start_at, end_at, group_id, vehicle_type_id: 2 },
    config
  );

  for (let i = 0; i < shovel.length; i++) {
   if(group_id===1){
    if (
        !shovel[i].vehicle_name.includes("L99") &&
        !shovel[i].vehicle_name.includes("VR")
      ) {
        record.stop.shovel += Number(shovel[i].maintenance);
        record.ready.shovel += Number(shovel[i].ready);
        record.working.shovel += Number(shovel[i].working);
      } else if (shovel[i].vehicle_name.includes("L99")) {
       record. stop.loader += Number(shovel[i].maintenance);
       record. ready.loader += Number(shovel[i].ready);
       record. working.loader += Number(shovel[i].working);
      }
   }else{
    if (!shovel[i].vehicle_name.includes("VR")) {
        record.stop.shovel += Number(shovel[i].maintenance);
        record.ready.shovel += Number(shovel[i].ready);
        record.working.shovel += Number(shovel[i].working);
      } 
   }
  }
  for (let i = 0; i < truck.length; i++) {
    record.stop.truck += Number(truck[i].maintenance);
    record.ready.truck += Number(truck[i].ready);
    record.working.truck += Number(truck[i].working);
  }
  return record;
}
