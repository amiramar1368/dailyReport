import axios from 'axios';

import {jalaliToMiladi} from './toMiladi.js';

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
                    ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*115;
                    ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*115
                    ore_mine_to_road_tonnage += Number(data[i].ore_road)*115
                    ore_mine_to_oxide_tonnage += Number(data[i].oxid)*115
                    waste_west_tonnage += Number(data[i].waste_gh)*100
                    waste_east_tonnage += Number(data[i].waste_sh)*100
                    waste_south_tonnage += Number(data[i].waste_jo)*100
                    waste_road_tonnage += Number(data[i].waste_in)*100

                    ore_tonnage += ore*115;
                    waste_tonnage += waste*100;
                    depo_tonnage += Number(data[i].depo_cr) *125;
                }else {
                    ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*80;

                    ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*80;
                    ore_mine_to_road_tonnage += Number(data[i].ore_road)*80;
                    ore_mine_to_oxide_tonnage += Number(data[i].oxid)*80;
                    waste_west_tonnage += Number(data[i].waste_gh)*75;
                    waste_east_tonnage += Number(data[i].waste_sh)*75;
                    waste_south_tonnage += Number(data[i].waste_jo)*75;
                    waste_road_tonnage += Number(data[i].waste_in)*75;

                    ore_tonnage += ore*80;
                    waste_tonnage += waste*75;
                    depo_tonnage += Number(data[i].depo_cr) *80; 
                }
            }else{
                ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*80;

                ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*80;
                ore_mine_to_road_tonnage += Number(data[i].ore_road)*80;
                ore_mine_to_oxide_tonnage += Number(data[i].oxid)*80;
                waste_west_tonnage += Number(data[i].waste_gh)*75;
                waste_east_tonnage += Number(data[i].waste_sh)*75;
                waste_south_tonnage += Number(data[i].waste_jo)*75;
                waste_road_tonnage += Number(data[i].waste_in)*75;

                ore_tonnage += ore*80;
                waste_tonnage += waste*75;
                depo_tonnage += Number(data[i].depo_cr) *80;  
            }
        }else{ 
            ore_mine_to_cr_tonnage += Number(data[i].ore_cr)*115;
            ore_mine_to_magnet_tonnage += (Number(data[i].cf2)+Number(data[i].cf2E)+Number(data[i].cf3)+Number(data[i].lo))*115
            ore_mine_to_road_tonnage += Number(data[i].ore_road)*115
            ore_mine_to_oxide_tonnage += Number(data[i].oxid)*115
            waste_west_tonnage += Number(data[i].waste_gh)*100
            waste_east_tonnage += Number(data[i].waste_sh)*100
            waste_south_tonnage += Number(data[i].waste_jo)*100
            waste_road_tonnage += Number(data[i].waste_in)*100

            ore_tonnage += ore*115;
            waste_tonnage += waste*100;
            depo_tonnage += Number(data[i].depo_cr) *125;
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
