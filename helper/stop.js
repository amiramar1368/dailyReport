import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function stop_report(start_at,end_at,vehicle_type_id,group_id,config){
    var start_at,end_at;
    start_at = start_at.split("/");
    start_at =end_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    var stop=0;
    const {data} = await axios.post("http://192.168.10.20/maintenance/reports/stops",{start_at,end_at,group_id,vehicle_type_id},config);
    
    for (let i = 0; i < data.length; i++) {
        if(data[i].vehicle_name.includes("L99") || data[i].vehicle_name.includes("VR")){}
        else{
           stop += Number(data[i].maintenance); 
        }
        
    }
    return stop;
}