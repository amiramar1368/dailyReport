import axios from 'axios';
import {jalaliToMiladi} from './toMiladi.js';

export async function sample_report(workday,config){
    let start_at= workday.split("/");
    start_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    const {data} = await axios.post("http://192.168.10.20/report/crusher/crusher-c4",{start_at},config);
    return data;
}