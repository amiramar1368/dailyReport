import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function transport_report(start_at,group_id,config){
    var start_at;
    start_at = start_at.split("/");
    start_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    var [ore,waste,depo]=[0,0,0];
    const {data} = await axios.post("/report/standard/transport-s2",{start_at,group_id},config);
    
    for (let i = 0; i < data.length; i++) {

        depo += Number(data[i].depo);
        ore += Number(data[i].ore);
        waste += Number(data[i].waste);
        
    }
    return {ore,waste,depo};
}