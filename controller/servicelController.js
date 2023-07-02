import axios from "axios";

import fs from 'fs';

import { stdDev } from "../helper/stdDeviation.js";
import { finalServices } from "../helper/finalServices.js";
import {closeService} from "../helper/closeServices.js"
import { filterOutliers } from "../helper/filterOutliers.js";
import { dateToNumber} from "../helper/dateToNumber.js";
import { jalaliToMiladi } from "../helper/toMiladi.js";
import {current} from '../helper/currentDate.js';

export class Service {

  static async deleteReport(req,res){
   try {
    let data = fs.readFileSync("logger.json");
    data= JSON.parse(data);
    let filtered_data = data.filter(item=>item.id!=req.params.id);
    fs.writeFileSync("logger.json",JSON.stringify(filtered_data,null,"   "))
    let detail = fs.readFileSync("detailLogger.json");
    detail=JSON.parse(detail);
    let filtered_detail = detail.filter(item=>item.userId!=req.params.id)
    fs.writeFileSync("detailLogger.json",JSON.stringify(filtered_detail,null,"   "))
    res.json({success:true})
   } catch (err) {
    res.json({success:false})
   }
  }

  static async doneReport(req,res){
    var length =[];
   try {
    var file = fs.readFileSync("logger.json");
    file= JSON.parse(file);
    var detail = fs.readFileSync("detailLogger.json");
    detail= JSON.parse(detail);
    file.filter(function(item){
      var filteredDetail = detail.filter(detail=>detail.userId==item.id)
      length.push(filteredDetail.length)
    });
    res.json({file,can_access:process.env.can_access,length});    
   } catch (err) {
    console.log(err);
    res.render("login",{can_access:"", error:"دیتابیس دچار مشکل شده است",layout:"/layout/loginLayout.ejs"})
   }
  }

static async fetcchUser(req,res,next){
  var users = fs.readFileSync("logger.json");
  users =JSON.parse(users);
  const user = users.find(item=>item.id==req.params.id);
  process.env.userId = user.id;
  next();
}

  static async fetchDetail(req,res){
    let userId = process.env.userId;
    const can_access = process.env.can_access;
    var users = fs.readFileSync("logger.json");
    users = JSON.parse(users);
    var user = users.find(user=>user.id==userId);
    var records = fs.readFileSync("detailLogger.json");
    records=JSON.parse(records);
   var filteredDetail = records.filter(item=>item.userId==userId);
   res.json({detail:filteredDetail,fullname:user.fullname,can_access})
  }

  static async fetchServices(req, res,next) {
    var currentDate = current();
    const token = process.env.token;
    var { group_id, report_at, shift, accuracy  } = req.body;
    if(group_id==""){
      group_id = 1
    }else if(group_id!=""){
      group_id=Number(group_id);
    }
    if(accuracy==""){
      accuracy = 3
    }
    if(shift==""){
      shift = "";
    }
    if (report_at == "") {
      report_at = currentDate;
    } else {
      var yearJalali = report_at.split("/")[0];
      var monthJalali = report_at.split("/")[1];
      var dayJalali = report_at.split("/")[2];
      report_at = jalaliToMiladi(yearJalali, monthJalali, dayJalali);
    }
    if (!token){
      return res.redirect("/");
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.token,
        },
      };
      try {
        const { data } = await axios.post(
          "http://192.168.10.20/trips/report",
          {group_id, report_at, shift, review: 1},
          config
        );

        //Get services For Edit them
        //*********************************************************************
        // report_at=report_at.split(" ")[0];
        // console.log({ group_id,shift:Number(shift),stop_type:2,vehicle_type_id:1, workday});
          // const{date:trips} = await axios.post("http://192.168.10.20/trips/all",{ group_id:[group_id],shift:[Number(shift)],review:1, report_at:"2022-11-12"},config);
          // res.json(trips)


        //*********************************************************************
  
        //*********************************************************************
        // start to check
        var shovelList = [];
        var close_service= [];
         var shovelTimes = {};
        var allBlocks = [];
        var blockTimes = {};
       
        var blockAverageTime = {};
        const AllService = data;
        
        //delete extra keys
        for (var record of AllService) {
          delete record.uuid;
          delete record.ShovelID;
          delete record.DriverID;
          delete record.OperatorID;
          delete record.UnloadingID;
          delete record.LoadID;
          // delete record.shovel_name;
          delete record.driver_name;
          delete record.operator_name;
          delete record.unloading_name;
          delete record.BlockID;
          delete record.load_name;
          delete record.shovel_enter_at;
          delete record.unloading_zero_at;
          delete record.shovel_back;
          delete record.body;
          delete record.avg_speed_go;
          delete record.avg_speed_return;
          delete record.cycle_time;
          delete record.cycle_distance;
          delete record.loading_time;
          delete record.tonnage;
          delete record.mv_with_load;
          delete record.mv_without_load;
          record.truck = record.truck_name;
          record.exitShovel = dateToNumber(record.shovel_exit_at);
          record.exitDump = dateToNumber(record.unloading_exit_at);
          record.shovel_exit_date=record.shovel_exit_at.split(" ")[0];
          record.dump_exit_date=record.unloading_exit_at.split(" ")[0];
          record.block = record.block_name;
          delete record.block_name;
          delete record.truck_name;
          delete record.unloading_exit_at;
          delete record.shovel_exit_at;
  
          if (group_id == "7") {
            if (record.exitShovel < 23300) {
              record.exitShovel += 86400;
            }
            if (record.exitDump < 23300) {
              record.exitDump += 86400;
            }
          } else {
            if (record.exitShovel < 25190) {
              record.exitShovel += 86400;
            }
            if (record.exitDump < 25190) {
              record.exitDump += 86400;
            }
          }
        }
        
        var sortedService = AllService.sort(function (a, b) {
          return a.truck.localeCompare(b.truck) || a.exitShovel - b.exitShovel;
        });

        //**************************************************************************** 

    var AllServ_for_proximit = [...data];
   var  sortedService_for_proximity= AllServ_for_proximit.sort(function(a,b){
                  return a.shovel_name.localeCompare(b.shovel_name) || a.exitShovel - b.exitShovel;
                });

          // list of shovel
        for (let record of sortedService_for_proximity) {
          shovelList.push(record.shovel_name);
        }
        shovelList = shovelList.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
        // // list of shovel

        // //add empty array for each shovel
        for (let item of shovelList) {
          shovelTimes[item] = [];
        }
        // //add empty array for each shovel

        for (let i = 0; i < shovelList.length; i++) {
          for (let j = 0; j < sortedService_for_proximity.length; j++) {
            if (sortedService_for_proximity[j+1]){
              if (sortedService_for_proximity[j].shovel_name == shovelList[i]) {
                if((sortedService_for_proximity[j+1].shovel_name)==(sortedService_for_proximity[j].shovel_name)){
                  if (((sortedService_for_proximity[j+1].exitShovel )- (sortedService_for_proximity[j].exitShovel)) < 121) {
                    shovelTimes[shovelList[i]].push(sortedService_for_proximity[j]);
                  }
                }
              }
          }
          }
        }

        /***************************************************************************** */

        // // list of block
        for (let record of sortedService) {
          allBlocks.push(record.block);
        }
  
        allBlocks = allBlocks.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
        // // list of block
  
        // //add empty array for each block
        for (let item of allBlocks) {
          blockTimes[item] = [];
          blockAverageTime[item] = [];
        }
        // //add empty array for each block
  
        // //add back Time to each block
        for (let i = 0; i < allBlocks.length; i++) {
          for (let j = 1; j < sortedService.length; j++) {
            if (sortedService[j].block == allBlocks[i]) {
              if (
                sortedService[j].exitShovel - sortedService[j - 1].exitDump > 2000 ||
                sortedService[j].exitShovel - sortedService[j - 1].exitDump < 60
              ) {
                continue;
              } else {
                blockTimes[allBlocks[i]].push(sortedService[j].exitShovel - sortedService[j - 1].exitDump);
              }
            }
          }
        }
  
        // //add back Time to each block
  
        var filteredForStdDev = {};
        var stdOfBlocks = {};
  
        // //calc average for each block
        for (let item in blockTimes) {
          let records = blockTimes[item];
          var filteredREc = filterOutliers(records);
          filteredForStdDev[item] = filteredREc;
          if (filteredREc.length != 0) {
            var average = filteredREc.reduce((a, b) => a + b, 0) / filteredREc.length;
            blockAverageTime[item] = Number(average.toFixed(1));
          } else {
            var average = records.reduce((a, b) => a + b, 0) / records.length;
            blockAverageTime[item] = Number(average.toFixed(1));
          }
          filteredForStdDev[item] = filteredREc;
        }
  
        // //calc average for each block
        for (let item in filteredForStdDev) {
          var std = stdDev(filteredForStdDev[item]);
          if (isNaN(std)) {
            std = 100;
          }
          if (std > 200) {
            std = 100;
          }
          stdOfBlocks[item] = std;
        }
  
        var services = [];
        for (let i = 0; i < sortedService.length; i++) {
          if (sortedService[i + 1]) {
            if (sortedService[i].truck == sortedService[i + 1].truck) {
              if (
                sortedService[i + 1].exitShovel - sortedService[i].exitDump >=
                blockAverageTime[sortedService[i].block] + accuracy * stdOfBlocks[sortedService[i].block]
              ) {
                let serviceDistance = sortedService[i + 1].exitShovel - sortedService[i].exitDump;
                if (sortedService[i + 1].exitShovel > 86400) {
                  sortedService[i + 1].exitShovel -= 86400;
                }
                if (sortedService[i].exitDump > 86400) {
                  sortedService[i].exitDump -= 86400;
                }
                services.push({
                  TruckID: sortedService[i].TruckID,
                  truck: sortedService[i].truck,
                  exitSH: sortedService[i + 1].exitShovel,
                 shovel_exit_date:sortedService[i+1].shovel_exit_date,
                 dump_exit_date:sortedService[i].dump_exit_date,
                  exitDu: sortedService[i].exitDump,
                  dist: (serviceDistance / 60).toFixed(1),
                  preBlock: sortedService[i].block,
                  nextBlock: sortedService[i + 1].block,
                });
              }
            }
          } else {

            var group = "700";
              if (group_id == 3) {
                group = "742";
              } else if (group_id == 6) {
                group = "Behavand";
              } else if (group_id == 7) {
                group = "Apadana";
              }
            var AllServ = finalServices(services,group);
            var closeSer = closeService(shovelTimes)
            
  
            if (req.body.report_at == "") {
              var jalaliDate = "امروز";
            } else {
              var jalaliDate = req.body.report_at;
            }
            if(shift==1){
              shift="شیفت صبح";
            }else if(shift==2){
              shift = "شیفت عصر";
            }else if(shift==3){
              shift="شیفت شب"
            }else{
              shift = "کل روز"
            };
            res.json({
              closeSer,
              AllServ,
              group,
              shift,
              accuracy: accuracy,
              date: report_at,
              jalaliDate,
             can_access: process.env.can_access
            });
          }
        }
        // end check
      } catch (err) {
        
        res.json({error:"خطا در برقراری ارتباط با سرور"});
      }
    }
  }
}
