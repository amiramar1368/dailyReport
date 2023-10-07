import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function weighbridge_report(start_at,weighbridge_id,config){
    var start_at,end_at;
    start_at = start_at.split("/");
    var first_date = jalaliToMiladi(start_at[0],start_at[1],"01");
    start_at = end_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    var daily_tonnage = 0
    var monthly_tonnage = 0
    const {data:daily} = await axios.post("/report/weighbridge/w1",{start_at,end_at,weighbridge_id},config);
    for (let i = 0; i < daily.length; i++) {
        daily_tonnage += Number(daily[i].weight_diff)
    }
    
    const {data:monthly} = await axios.post("/report/weighbridge/w1",{start_at:first_date,end_at,weighbridge_id},config);
    for (let i = 0; i < monthly.length; i++) {
        monthly_tonnage += Number(monthly[i].weight_diff)
    }

    return {daily_tonnage,monthly_tonnage};
}

export async function weighbridge_report2(start_at,destination_id,weighbridge_id,config){
    const east_saha_to_cr =[];
    const seperation_east_saha_to_cr ={};
    const west_saha_to_cr =[];
    const seperation_west_saha_to_cr ={};
    var start_at,end_at;
    start_at = start_at.split("/");
    var first_date = jalaliToMiladi(start_at[0],start_at[1],"01");
    start_at = end_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    var daily_tonnage = 0
    var monthly_tonnage = 0
    const {data:daily} = await axios.post("/report/weighbridge/w2",{start_at,end_at,destination_id,weighbridge_id},config);
    for (let i = 0; i < daily.length; i++) {
        daily_tonnage += Number(daily[i].weight_diff);
        if(daily[i].destination_id==1 && daily[i].weighbridge_id==6){
            east_saha_to_cr.push(daily[i]);
        }
        if(daily[i].destination_id==1 && daily[i].weighbridge_id==7){
            west_saha_to_cr.push(daily[i]);
        }
    }
for (let i = 0; i <= 24; i++) {
    seperation_east_saha_to_cr[i] = east_saha_to_cr.filter(record => record.first_time.split(":")[0] == i).length;
    seperation_west_saha_to_cr[i] = west_saha_to_cr.filter(record => record.first_time.split(":")[0] == i).length;
}



    const {data:monthly} = await axios.post("/report/weighbridge/w2",{start_at:first_date,end_at,weighbridge_id,destination_id},config);
    for (let i = 0; i < monthly.length; i++) {
        monthly_tonnage += Number(monthly[i].weight_diff)
    }

    return {daily_tonnage,monthly_tonnage,seperation_east_saha_to_cr,seperation_west_saha_to_cr,east_saha_to_cr,west_saha_to_cr};

}


