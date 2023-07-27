import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';
export async function extraction_report(start_at,group_id,config){
    var start_at,end_at,truck_start_with;
    start_at = start_at.split("/");
    start_at=end_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    const {data} = await axios.post("http://192.168.10.20/report/standard/extraction-s11",{start_at,end_at,group_id},config);
    const over_houres={700:[],742:[],apa:[],beh:[]}

    var omz_1=0;
    var omz_2=0;
    var omz_3=0;
    var dmh_1 =0;
    var dmh_2 =0;
    var di550_1 =0;
    var di550_2 =0;
    var di550_3 =0;
    var titon_1 = 0;
    var titon_2 = 0;
    
    if(group_id==1){
        for (let i = 0; i < data.length; i++) {
            if(data[i].vehicle_name=="DMH-1"){
                dmh_1 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="DMH-2"){
                dmh_2 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="DI550-1"){
                di550_1 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="DI550-2"){
                di550_2 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="DI550-3"){
                di550_3 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="OMZ-1"){
                omz_1 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="OMZ-2"){
                omz_2 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="OMZ-3"){
                omz_3 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="TIT600-1"){
                titon_1 = Number(data[i].worktime)/3600;
            }
            if(data[i].vehicle_name=="TIT600-2"){
                titon_2 = Number(data[i].worktime)/3600;
            }
        }
    }

    var truck_workTime=0;
    var truck_number =0;
    var truck_distance=0;
    var shovel_workTime=0;
    var shovel_number =0;
    var pc_worktime =0;
    var ph_worktime =0;
    var drillrig_workTime =0;
    var omz_number =0;
    var dmh_number =0;
    var drillWagon_workTime =0;
    var DI550_number=0;
    var Titon_number =0;
    var wheeldozer_workTime =0;
    var wheeldozer_number =0;
    var grader_workTime =0;
    var grader_16G_number =0;
    var grader_G705_number =0;

    var bulldozer_workTime =0;
    var bull_cat_number =0;
    var bull_komatsu_number =0;

    var fuel_workTime =0;
    var fuel_distance =0;
    var fuel_number =0;

    var loader_workTime =0;
    var loader_number =0;

    var stemming_workTime =0;
    var stemming_number =0;

    var anfo_workTime =0;
    var anfo_number =0;

    var sprinkler_workTime =0;
    var sprinkler_number =0;
    var sprinkler_distance =0;




 
    group_id!=1? truck_start_with="TA":truck_start_with="T";

    for (let i = 0; i < data.length; i++) {
        if(group_id==1){
            if(data[i].worktime/3600>18.99){
                over_houres[700].push(data[i])
            }
        }else if(group_id==3){
            if(data[i].worktime/3600>17.99){
                over_houres[742].push(data[i])
            }
        }else  if(group_id==6){
            if(data[i].worktime/3600>17.99){
                over_houres.beh.push(data[i])
            }
        }else  if(group_id==7){
            if(data[i].worktime/3600>18.5){
                over_houres.apa.push(data[i])
            }
        }
        // تراک
    if(data[i].vehicle_name.startsWith(truck_start_with)) {
        if(data[i].vehicle_name=="TA-HD325-11" || data[i].vehicle_name=="TIT600-1" || data[i].vehicle_name=="TIT600-2"){
        }else{
            var worktime =Number( data[i].worktime)/3600;
            var distance = Number(data[i].distance)/1000;
            truck_workTime+=worktime;
            truck_distance +=distance; 
        }
    } 
    // شاول
    if(group_id==1){


        if(data[i].vehicle_name.startsWith("PC") || data[i].vehicle_name.startsWith("PH")) {
        var worktime = Number(data[i].worktime)/3600;
        shovel_workTime+=worktime;
        if(data[i].vehicle_name.startsWith("PC")){
            pc_worktime +=worktime;
        }else{
            ph_worktime += worktime;
        }

        //دریلریگ 
        }else if(data[i].vehicle_name.startsWith("DMH") || data[i].vehicle_name.startsWith("OMZ")) {
            var worktime = Number(data[i].worktime)/3600;
            if(data[i].vehicle_name.startsWith("OMZ") && worktime >=1){
                omz_number +=1;
            }else if(data[i].vehicle_name.startsWith("DMH") && worktime >=1){
                dmh_number +=1;
            }
            
            drillrig_workTime+=worktime;


            //دریل واگن
        }else if(data[i].vehicle_name.startsWith("DI") || data[i].vehicle_name.includes("T600")) {
            var worktime = Number(data[i].worktime)/3600;
            if(data[i].vehicle_name.startsWith("DI") && worktime >=1){
                DI550_number +=1;
            }else if(data[i].vehicle_name.includes("T600") && worktime >=1){
                Titon_number +=1;
            }
            drillWagon_workTime+=worktime;

            // گریدر
        } else if(data[i].vehicle_name.includes("G")) {
            var worktime = Number(data[i].worktime)/3600;
            if(data[i].vehicle_name.includes("16G") && worktime>=1){
                grader_16G_number +=1;
            }else if(worktime>=1){
                grader_G705_number +=1;
            }
            grader_workTime+=worktime;

            //بولدوزر
        }else if(data[i].vehicle_name.startsWith("D")) {
            if(data[i].vehicle_name.startsWith("DI") || data[i].vehicle_name.startsWith("DM") ){
             }else{
                var worktime = Number(data[i].worktime)/3600;
                if((data[i].vehicle_name.includes("155") || data[i].vehicle_name.includes("275")) && worktime>=1){

                    bull_komatsu_number +=1;
                }else if(worktime>=1){
                    bull_cat_number +=1;
                }
                bulldozer_workTime+=worktime;
            } 

            // ویلدوزر
        }else if(data[i].vehicle_name.startsWith("Wheeldozer")) {
            var worktime = Number(data[i].worktime)/3600;
            if(worktime>=1){
                wheeldozer_number +=1;
            }
            wheeldozer_workTime+=worktime;

            //لودر
        }else if(data[i].vehicle_name.includes("L992")) {
            var worktime = Number(data[i].worktime)/3600;
            if(worktime>=1){
                loader_number +=1;
            }
            loader_workTime+=worktime;

            //سوخت رسان
        }else if(data[i].vehicle_name.includes("FT")) {
            var worktime = Number(data[i].worktime)/3600;
            if(worktime>=1){
                fuel_number +=1;
            }
            fuel_workTime+=worktime;
            fuel_distance += Number(data[i].distance)/1000;

            // گل گذار
        }else if(data[i].vehicle_name.includes("ST")) {
            var worktime = Number(data[i].worktime)/3600;
            if(worktime>=1){
                stemming_number +=1;
            }
            stemming_workTime+=worktime;

            //خرج گذار
        }else if(data[i].vehicle_name.startsWith("AT") || data[i].vehicle_name.startsWith("ET")) {
            var worktime =Number( data[i].worktime)/3600;
            if(worktime>=1){
                anfo_number +=1;
            }
            anfo_workTime+=worktime;

            //آبپاش
        }else if(data[i].vehicle_name.startsWith("SB") || data[i].vehicle_name.startsWith("TM")) {
            var worktime = Number(data[i].worktime)/3600;
            if(worktime>=1){
                sprinkler_number +=1;
            }
            sprinkler_workTime+=worktime;
            sprinkler_distance += Number(data[i].distance)/1000
        }

    } else{
        if(data[i].vehicle_name.startsWith("LA") || data[i].vehicle_name.startsWith("SA") || data[i].vehicle_name=="L700"){
            if(data[i].vehicle_name=="SA300"){
            } else{
                var worktime = Number(data[i].worktime)/3600;
                shovel_workTime+=worktime; 
            }  
        }
    } 
    
    

    }

    if(group_id==1){
        truck_number = truck_workTime/15.18;
        shovel_number = (pc_worktime/14.5)+(ph_worktime/9.5);
    }else if(group_id==3){
        truck_number = truck_workTime/15;
        shovel_number = shovel_workTime/15;
    }else if(group_id==6){
        truck_number = truck_workTime/16;
        shovel_number = shovel_workTime/16;
    }else if(group_id==7){
        truck_number = truck_workTime/17.5;
        shovel_number = shovel_workTime/17.5;
    }
    return {truck_workTime,
        truck_number,
         truck_distance,
         shovel_workTime,
         shovel_number,
         drillrig_workTime,
         drillWagon_workTime,
         grader_workTime,
         bulldozer_workTime,
         wheeldozer_workTime,
         wheeldozer_number,
         loader_workTime,fuel_workTime,
         stemming_workTime,
         anfo_workTime,
         sprinkler_workTime,
         omz_number,
         bull_cat_number,
         bull_komatsu_number,
         grader_16G_number,
         grader_G705_number,
         dmh_number,
         DI550_number,
         Titon_number,
         fuel_number,
         fuel_distance,
         loader_number,
         stemming_number,
         anfo_number,
         sprinkler_number,
        sprinkler_distance,
        omz_1,
        omz_2,
        omz_3,
        dmh_1,
        dmh_2,
        titon_1,
        titon_2,
        di550_1,
        di550_2,
        di550_3,
        over_houres
    }
}