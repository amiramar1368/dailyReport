import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function depo_report(workday,config){
    var workday;
    workday = workday.split("/");
    workday = jalaliToMiladi(workday[0],workday[1],workday[2]);
    var [magnet,other,robat,novin]=[0,0,0,0];
    const {data} = await axios.post("/report/management/m13",{workday},config);
    for (let i = 0; i < data.length; i++) {
        if(data[i].depo=="سایر"){
            other = Number(data[i].remaind);
        }else if(data[i].depo=="رباط"){
            robat = Number(data[i].remaind);
        }else if(data[i].depo=="مگنت"){
            magnet = Number(data[i].remaind);
        }else if(data[i].depo=="نوین فراوران"){
            novin = Number(data[i].remaind);
        }
        
    }
    return {other,robat,novin,magnet};
}