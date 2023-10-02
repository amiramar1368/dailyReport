import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';
import {tonnages} from '../config.js';

export async function crusher_feed_report(start_at,config){
    var start_at,end_at;
    start_at = start_at.split("/");
    start_at=end_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    var [magnet,oxide,robat,novin,all_service]=[0,0,0,0,0];
    const {data} = await axios.post("http://192.168.10.20/report/standard/extraction-s5",{start_at,end_at},config);
    for (let i = 0; i < data.length; i++) {
        all_service += Number(data[i].total)
        if(data[i].block.includes("D-CF3")|| data[i].block.includes("D-CF2")|| data[i].block.includes("D-CF3-LP") || data[i].block.includes("D-DF") || data[i].block.includes("D-CF2 W")){
            magnet +=Number(data[i].total)*tonnages.belaz_ore_depo;
        } else if(data[i].block.includes("D-Robat")){
            robat +=Number(data[i].total)*tonnages.belaz_ore_depo;
        }else if(data[i].block.includes("D-OXIDE")){
            oxide +=Number(data[i].total)*tonnages.belaz_ore_depo;
        }else if(data[i].block.includes("D-")){
            novin += Number(data[i].total)*tonnages.belaz_ore_other_depo;
        }
    }
    process.env.novin = novin/tonnages.belaz_ore_other_depo;
    return {magnet,oxide,robat,novin,all_service};
}