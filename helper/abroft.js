import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function abroft_report(start_at,group_id,config){
    var start_at;
    start_at = start_at.split("/");
    start_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    const {data} = await axios.post("http://192.168.10.20/report/standard/extraction-s1",{workday:start_at,group_id},config);
    let moj=0;
    let asfalt=0;
    let beh=0;
    let apa=0;

    for (let i = 0; i < data.data.length; i++) {
        if((data.data[i].loading_block.toLowerCase().includes("dump")) || (data.data[i].loading_block.toLocaleLowerCase().includes("ribar"))){
        if(group_id==1){
            moj += Number(data.data[i].total_service);
        }else if(group_id==3){
            asfalt += Number(data.data[i].total_service);
        } else if(group_id==6){
            beh += Number(data.data[i].total_service);
        } else if(group_id==7){
            apa += Number(data.data[i].total_service);
        } 
    }
    } 
    return {
         moj,
         asfalt,
         beh,
         apa
    }
}