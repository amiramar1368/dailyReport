import {jalaliToMiladi} from '../helper/toMiladi.js';
import {current} from '../helper/currentDate.js';
import {numberToDate} from '../helper/numberToDate.js';
import {baseURL} from '../config.js';

import axios from 'axios';
axios.defaults.baseURL=baseURL;
import { dateToNumber } from '../helper/dateToNumber.js';
export class Fuel{
    static async get_data(req,res){
        var currentDate = current();
        var {group_id, date} = req.body;
        if (date == "") {
          date = currentDate;
        } else {
          var yearJalali = date.split("/")[0];
          var monthJalali = date.split("/")[1];
          var dayJalali = date.split("/")[2];
          date = jalaliToMiladi(yearJalali, monthJalali, dayJalali);
        }
        const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + process.env.token,
            },
          };
            const { data } = await axios.post("/report/fuel/f1",{group_id, start_at:date, end_at:date},config);
            for (let record of data) {
              delete record.fuel_id;
              delete record.fuel_time;
              delete record.group_id;
              delete record.id;
              delete record.operator_name;
              delete record.shift;
              delete record.user_id;
              delete record.vehicle_id;
              delete record.vehicle_name;
              delete record.vehicle_type_id;
              record.time=record.created_at.split(" ")[1];
              record.time = dateToNumber(record.created_at);              
              record.fuel = Number(record.fuel );              
              record.total = Number(record.total );              
            }
            var sorted_data = data.sort(function (a, b) {
              return a.fuel_name.localeCompare(b.fuel_name) || a.time - b.time;
            });
            var filterd_data =[];
            var dist_litr =[];
            var dist_time =[];
            for (let i = 0; i < sorted_data.length; i++) {
              if(sorted_data[i+1]){
                if(sorted_data[i].fuel_name==sorted_data[i+1].fuel_name){
                 
                  if(((sorted_data[i+1].fuel + sorted_data[i].total-sorted_data[i+1].total)>15 || (sorted_data[i+1].fuel + sorted_data[i].total-sorted_data[i+1].total)<-15) && (sorted_data[i+1].time-sorted_data[i].time)<14000){
                    dist_litr.push((sorted_data[i+1].fuel + sorted_data[i].total-sorted_data[i+1].total));
                     filterd_data.push(sorted_data[i])
                     dist_time.push(numberToDate(sorted_data[i+1].time-sorted_data[i].time));
                  }
                }
              }
            }
        res.json({filterd_data,dist_litr,dist_time})
    }
}
