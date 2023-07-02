import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function pileNumber_report(start_at,config){
    var start_at;
    start_at = start_at.split("/");
    start_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    const {data} = await axios.get(`http://192.168.10.20/report/crusher/piles?workday=${start_at}`,config);
    
    return data;
}