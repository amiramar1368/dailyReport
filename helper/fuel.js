import axios from 'axios';

import { jalaliToMiladi } from "./toMiladi.js";

export async function fuel_report(start_at,group_id,config){
    var start_at,end_at;
  start_at = start_at.split("/");
  start_at = end_at= jalaliToMiladi(start_at[0], start_at[1], start_at[2]);
  const records ={shovel:0,truck:0};
    const {data:truck} = await axios.post("/report/fuel/f1",{start_at,end_at,group_id,vehicle_type_id:1},config);
    const {data:shovel} = await axios.post("/report/fuel/f1",{start_at,end_at,group_id,vehicle_type_id:2},config);
    for (let i = 0; i < truck.length; i++) {
        records.truck += Number(truck[i].fuel)
    }
    for (let i = 0; i < shovel.length; i++) {
        records.shovel += Number(shovel[i].fuel)
    }

return records
}
export async function fuel_report_all(start_at,config){
    var start_at,end_at;
  start_at = start_at.split("/");
  start_at = end_at= jalaliToMiladi(start_at[0], start_at[1], start_at[2]);
  let allFuel = 0
    const {data} = await axios.post("/report/fuel/f1",{start_at,end_at,group_id:[]},config);
    for (let i = 0; i < data.length; i++) {
        allFuel += Number(data[i].fuel)
    }

return allFuel
}