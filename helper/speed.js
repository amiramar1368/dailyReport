import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function speed_report(start_at,group_id,config){
    var start_at,end_at;
    start_at = start_at.split("/");
    start_at = end_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    var total_speed=0;
    var duration =0;
    var speed=0
    const {data} = await axios.post("http://192.168.10.20/report/driver/driver-d10",{start_at,end_at,group_id,vehicle_type:1},config);
    let counter =0;
    if(data.length>0){
        for (let i = 0; i < data.length; i++) {
            if(Number(data[i].average_speed)>=40){
                counter++;
                total_speed += Number(data[i].average_speed);
                duration += Number(data[i].duration);
            }
        }
        speed= total_speed/counter;
        if(counter==0){
            speed= 0;
        }
    }else{
        speed=0;
    }

    return {duration,speed};
}