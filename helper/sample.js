import axios from 'axios';
import {jalaliToMiladi} from './toMiladi.js';


export async function sample_report(workday,config){
 try {
    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + parseInt(days));
        return this;
      };
    let start_at= workday.split("/");
    start_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    let previos =(new Date(start_at)).addDays(-1);
    const previos_day = previos.toISOString().split("T")[0];
    const {data:s1} = await axios.post("http://192.168.10.20/report/crusher/crusher-c4",{start_at:previos_day},config);
    const {data:s2} = await axios.post("http://192.168.10.20/report/crusher/crusher-c4",{start_at},config);
    const data=[...s1,...s2]
    return data;
 } catch (err) {
    console.log(err);
 }
}