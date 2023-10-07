import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function loader_tonnage_report(start_at,config){
    var start_at,end_at,start,end;
    start_at = start_at.split("/");
    start_at=end_at=start=end = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    var tonnage=0
    const {data} = await axios.post("/report/vehicle/vehicle-v2",{start_at,end_at,group_id:1,start,end},config);
    
    for (let i = 0; i < data.length; i++) {
        if(data[i].shovel_name.startsWith("L99")){
        tonnage += Number(data[i].tonnage);
        }   
    }
    return tonnage;
}