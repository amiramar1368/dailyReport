import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';
import {tonnages} from '../config.js';

export async function unloading_report(start_at,group_id,config){
    var start_at,end_at;
    start_at = start_at.split("/");
    start_at = end_at = jalaliToMiladi(start_at[0],start_at[1],start_at[2]);
    
    var ore_service = 0;
    var waste_service = 0;
    var depo_to_cr_service = 0;
    var ore_tonnage = 0;
    var waste_tonnage = 0;
    var depo_tonnage = 0 ;
    var total_tonnage = 0;
    var tonnage_for_compare =0;
    var compare =true;

    var ore_mine_to_cr_tonnage = 0;
    var ore_mine_to_magnet_tonnage = 0;
    var ore_mine_to_road_tonnage = 0;
    var ore_mine_to_oxide_tonnage = 0;
    var waste_west_tonnage = 0;
    var waste_east_tonnage = 0;
    var waste_south_tonnage = 0;
    var waste_road_tonnage = 0;

    const {data} = await axios.post("http://192.168.10.20/report/vehicle/vehicle-v6",{start_at,end_at,group_id},config);
    
    for (let i = 0; i < data.length; i++) {
        tonnage_for_compare+= Number(data[i].tonnage)
        var ore =(Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo)+Number(data[i].ore_cr)+Number(data[i].ore_road)+Number(data[i].oxid));
        var waste =(Number(data[i].sumser)-Number(data[i].depo_cr)-ore);
        var ore_mine_to_cr = Number(data[i].ore_cr);
        var ore_mine_to_magnet = (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo));
        var ore_mine_to_road = Number(data[i].ore_road);
        var ore_mine_to_oxide = Number(data[i].oxid);
        var waste_west = Number(data[i].waste_gh);
        var waste_east = Number(data[i].waste_sh);
        var waste_south = Number(data[i].waste_jo);
        var waste_road = Number(data[i].waste_in);

        ore_service += ore;
        waste_service += waste;
        depo_to_cr_service += Number(data[i].depo_cr);

            
        if(group_id!=1){
            if(data[i].truck_name.startsWith("TA30") || data[i].truck_name.startsWith("TA40") || data[i].truck_name.startsWith("TA31") || data[i].truck_name.startsWith("TA41")){
                if(data[i].truck_name!="TA30" && data[i].truck_name!="TA31" && data[i].truck_name!="TA40" && data[i].truck_name!="TA41"){
                    ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*tonnages.big_truck_ore_mine;
                    ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*tonnages.big_truck_ore_mine
                    ore_mine_to_road_tonnage += Number(data[i].ore_road)*tonnages.big_truck_ore_mine
                    ore_mine_to_oxide_tonnage += Number(data[i].oxid)*tonnages.big_truck_ore_mine
                    waste_west_tonnage += Number(data[i].waste_gh)*tonnages.big_truck_waste
                    waste_east_tonnage += Number(data[i].waste_sh)*tonnages.big_truck_waste
                    waste_south_tonnage += Number(data[i].waste_jo)*tonnages.big_truck_waste
                    waste_road_tonnage += Number(data[i].waste_in)*tonnages.big_truck_waste

                    ore_tonnage += ore*tonnages.big_truck_ore_mine;
                    waste_tonnage += waste*tonnages.big_truck_waste;
                    depo_tonnage += Number(data[i].depo_cr) *tonnages.big_truck_ore_mine;
                }else {
                    ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*tonnages.small_truck_ore;
                    ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*tonnages.small_truck_ore;
                    ore_mine_to_road_tonnage += Number(data[i].ore_road)*tonnages.small_truck_ore;
                    ore_mine_to_oxide_tonnage += Number(data[i].oxid)*tonnages.small_truck_ore;
                    waste_west_tonnage += Number(data[i].waste_gh)*tonnages.small_truck_waste;
                    waste_east_tonnage += Number(data[i].waste_sh)*tonnages.small_truck_waste;
                    waste_south_tonnage += Number(data[i].waste_jo)*tonnages.small_truck_waste;
                    waste_road_tonnage += Number(data[i].waste_in)*tonnages.small_truck_waste;

                    ore_tonnage += ore*tonnages.small_truck_ore;
                    waste_tonnage += waste*tonnages.small_truck_waste;
                    depo_tonnage += Number(data[i].depo_cr) *tonnages.small_truck_ore; 
                }
            }else{
                ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*tonnages.small_truck_ore;

                ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*tonnages.small_truck_ore;
                ore_mine_to_road_tonnage += Number(data[i].ore_road)*tonnages.small_truck_ore;
                ore_mine_to_oxide_tonnage += Number(data[i].oxid)*tonnages.small_truck_ore;
                waste_west_tonnage += Number(data[i].waste_gh)*tonnages.small_truck_waste;
                waste_east_tonnage += Number(data[i].waste_sh)*tonnages.small_truck_waste;
                waste_south_tonnage += Number(data[i].waste_jo)*tonnages.small_truck_waste;
                waste_road_tonnage += Number(data[i].waste_in)*tonnages.small_truck_waste;

                ore_tonnage += ore*tonnages.small_truck_ore;
                waste_tonnage += waste*tonnages.small_truck_waste;
                depo_tonnage += Number(data[i].depo_cr) *tonnages.small_truck_ore;  
            }
        }else{ 
            ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*tonnages.belaz_ore_mine;
            ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*tonnages.belaz_ore_mine
            ore_mine_to_road_tonnage += Number(data[i].ore_road)*tonnages.belaz_ore_mine
            ore_mine_to_oxide_tonnage += Number(data[i].oxid)*tonnages.belaz_ore_mine
            waste_west_tonnage += Number(data[i].waste_gh)*tonnages.belaz_waste
            waste_east_tonnage += Number(data[i].waste_sh)*tonnages.belaz_waste
            waste_south_tonnage += Number(data[i].waste_jo)*tonnages.belaz_waste
            waste_road_tonnage += Number(data[i].waste_in)*tonnages.belaz_waste

            ore_tonnage += ore*tonnages.belaz_ore_mine;
            waste_tonnage += waste*tonnages.belaz_waste;
            depo_tonnage += Number(data[i].depo_cr) *tonnages.belaz_ore_depo;
        }
    }
    total_tonnage = ore_tonnage+waste_tonnage+depo_tonnage;
    if(tonnage_for_compare!=total_tonnage){
        compare=false;
    }
    return {ore_service,ore_tonnage,
        waste_service,
        waste_tonnage,
        depo_to_cr_service,
        depo_tonnage,
        total_tonnage,compare,
        ore_mine_to_cr_tonnage,
        ore_mine_to_magnet_tonnage,
        ore_mine_to_road_tonnage,
        ore_mine_to_oxide_tonnage,
        waste_west_tonnage,
        waste_east_tonnage,
        waste_south_tonnage,
        waste_road_tonnage
    };
   
}
