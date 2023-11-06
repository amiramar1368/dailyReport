import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

export async function mis_report(start_at,pile,config){
    var start_at;
    start_at = start_at.split("/");
    start_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    
    const {data} = await axios.post("/report/crusher/crusher-c8",{pile,workday:start_at},config);
    
    return data;
}