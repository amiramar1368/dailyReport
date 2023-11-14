import axios from "axios";

import {tonnages} from '../config.js';
import { setDates } from "../helper/setDates.js";

export class Morning{
    static async mainPage(req,res){
        const can_access = process.env.can_access;
        res.render("morning", {
            error: "",
            can_access,
            layout: "./layout/morningLayout.ejs",
          })
    }

    static async shovel(req,res){
        const {mofid_700,mofid_742,mofid_apadana} = req.body
      let { start_at,config } = setDates(req);
      let truck_700_hour= 0
      let truck_742_hour= 0
      let truck_apadana_hour= 0
      let shovel_700_hour= 0
      let shovel_742_hour= 0
      let shovel_apadana_hour= 0
      const {data:truck_700} =await axios.post("http://192.168.10.20/report/vehicle/vehicle-v6",
      {start_at,end_at:start_at,group_id:"1"},config);
      const {data:truck_742} =await axios.post("http://192.168.10.20/report/vehicle/vehicle-v6",
      {start_at,end_at:start_at,group_id:"3"},config);
      const {data:truck_apadana} =await axios.post("http://192.168.10.20/report/vehicle/vehicle-v6",
      {start_at,end_at:start_at,group_id:"7"},config);
      
      for (let i = 0; i < truck_700.length; i++) {
          truck_700_hour += Number(truck_700[i].worktime)/3600
        }
        for (let i = 0; i < truck_742.length; i++) {
            truck_742_hour += Number(truck_742[i].worktime)/3600
        }
        for (let i = 0; i < truck_apadana.length; i++) {
            truck_apadana_hour += Number(truck_apadana[i].worktime)/3600
        }
        const {data:shovel_700} =await axios.post("http://192.168.10.20/report/vehicle/vehicle-v2",
        {start_at,end_at:start_at,group_id:"1"},config);
        const {data:shovel_742} =await axios.post("http://192.168.10.20/report/vehicle/vehicle-v2",
        {start_at,end_at:start_at,group_id:"3"},config);
        const {data:shovel_apadana} =await axios.post("http://192.168.10.20/report/vehicle/vehicle-v2",
        {start_at,end_at:start_at,group_id:"7"},config);
        
        for (let i = 0; i < shovel_700.length; i++) {
            if(!shovel_700[i].shovel_name.includes("VR")){
                shovel_700_hour += Number(shovel_700[i].worktime)/3600
            }
        }
        for (let i = 0; i < shovel_742.length; i++) {
            if(!shovel_742[i].shovel_name.includes("VR")){
                shovel_742_hour += Number(shovel_742[i].worktime)/3600
            }
        }
        for (let i = 0; i < shovel_apadana.length; i++) {
            if(!shovel_apadana[i].shovel_name.includes("VR")){
                shovel_apadana_hour += Number(shovel_apadana[i].worktime)/3600
            }
        }
        const numberOfTruck_700 = truck_700_hour/Number(mofid_700);
        const numberOfTruck_742 = truck_742_hour/Number(mofid_742);
        const numberOfTruck_apadana = truck_apadana_hour/Number(mofid_apadana);
        const numberOfShovel_700 = shovel_700_hour/Number(mofid_700);
        const numberOfShovel_742 = shovel_742_hour/Number(mofid_742);
        const numberOfShovel_apadana = shovel_apadana_hour/Number(mofid_apadana);
      res.json({
        numberOfTruck_700,
        numberOfTruck_742,
        numberOfTruck_apadana,

        numberOfShovel_700,
        numberOfShovel_742,
        numberOfShovel_apadana
    });
    }

    static async truckUnloading(req, res) {
        try {
          const { start_at, end_at, config } = setDates(req);
    
          const record700 = {
            allTonnage: 0,
            oreToDepo: 0,
            oreToCrusher: 0,
            ore_road: 0,
            waste_sh: 0,
            waste_gh: 0,
            waste_jo: 0,
            waste_road: 0,
            sumSer: 0,
            depo_cr: 0,
          };
          const record742 = {
            allTonnage: 0,
            oreToDepo_bigTruck: 0,
            oreToCrusher_bigTruck: 0,
            ore_road_bigTruck: 0,
            waste_sh_bigTruck: 0,
            waste_gh_bigTruck: 0,
            waste_jo_bigTruck: 0,
            waste_road_bigTruck: 0,
    
            oreToDepo_smallTruck: 0,
            oreToCrusher_smallTruck: 0,
            ore_road_smallTruck: 0,
            waste_sh_smallTruck: 0,
            waste_gh_smallTruck: 0,
            waste_jo_smallTruck: 0,
            waste_road_smallTruck: 0,
            sumSer: 0,
            depo_cr: 0,
          };
          const { data: unloading700 } = await axios.post(
            "/report/vehicle/vehicle-v6",
            { start_at, end_at, group_id: 1 },
            config
          );
          const { data: unloading742 } = await axios.post(
            "/report/vehicle/vehicle-v6",
            { start_at, end_at, group_id: "3,7" },
            config
          );
          for (let i = 0; i < unloading700.length; i++) {
            record700.allTonnage += Number(unloading700[i].tonnage);
            record700.oreToDepo +=
              Number(unloading700[i].cf2) +
              Number(unloading700[i].cf2E) +
              Number(unloading700[i].cf3) +
              Number(unloading700[i].lo) +
              Number(unloading700[i].oxid);
            record700.depo_cr += Number(unloading700[i].depo_cr);
            record700.sumSer += Number(unloading700[i].sumser);
            record700.oreToCrusher += Number(unloading700[i].ore_cr);
            record700.ore_road += Number(unloading700[i].ore_road);
            record700.waste_gh += Number(unloading700[i].waste_gh);
            record700.waste_jo += Number(unloading700[i].waste_jo);
            record700.waste_road += Number(unloading700[i].waste_in);
            record700.waste_sh += Number(unloading700[i].waste_sh);
          }
    
          for (let i = 0; i < unloading742.length; i++) {
            record742.allTonnage += Number(unloading742[i].tonnage);
            if (
              (unloading742[i].truck_name.startsWith("TA30") ||
                unloading742[i].truck_name.startsWith("TA40") ||
                unloading742[i].truck_name.startsWith("TA31") ||
                unloading742[i].truck_name.startsWith("TA41")) &&
              unloading742[i].truck_name.length > 4
            ) {
              record742.oreToDepo_bigTruck +=
                Number(unloading742[i].cf2) +
                Number(unloading742[i].cf2E) +
                Number(unloading742[i].cf3) +
                Number(unloading742[i].lo) +
                Number(unloading742[i].oxid);
              record742.oreToCrusher_bigTruck += Number(unloading742[i].ore_cr);
              record742.ore_road_bigTruck += Number(unloading742[i].ore_road);
              record742.waste_gh_bigTruck += Number(unloading742[i].waste_gh);
              record742.waste_jo_bigTruck += Number(unloading742[i].waste_jo);
              record742.waste_road_bigTruck += Number(unloading742[i].waste_in);
              record742.waste_sh_bigTruck += Number(unloading742[i].waste_sh);
            } else {
              record742.oreToDepo_smallTruck +=
                Number(unloading742[i].cf2) +
                Number(unloading742[i].cf2E) +
                Number(unloading742[i].cf3) +
                Number(unloading742[i].lo) +
                Number(unloading742[i].oxid);
              record742.oreToCrusher_smallTruck += Number(unloading742[i].ore_cr);
              record742.ore_road_smallTruck += Number(unloading742[i].ore_road);
              record742.waste_gh_smallTruck += Number(unloading742[i].waste_gh);
              record742.waste_jo_smallTruck += Number(unloading742[i].waste_jo);
              record742.waste_road_smallTruck += Number(unloading742[i].waste_in);
              record742.waste_sh_smallTruck += Number(unloading742[i].waste_sh);
            }
            record742.depo_cr += Number(unloading742[i].depo_cr);
            record742.sumSer += Number(unloading742[i].sumser);
          }
          const ore_700=(record700.oreToCrusher+record700.oreToDepo)*tonnages.belaz_ore_mine;
          const waste_700=(record700.waste_gh+record700.waste_sh+record700.waste_jo)*tonnages.belaz_waste;
          const ore_742_bigTruck = (record742.oreToCrusher_bigTruck+record742.oreToDepo_bigTruck)*tonnages.big_truck_ore_mine;
          const ore_742_smallTruck = (record742.oreToCrusher_smallTruck+record742.oreToDepo_smallTruck)*tonnages.small_truck_ore;
          const ore_742 = ore_742_bigTruck+ore_742_smallTruck;
          const waste_742_bigTruck =(record742.waste_gh_bigTruck+record742.waste_jo_bigTruck+record742.waste_sh_bigTruck)*tonnages.big_truck_waste;
          const waste_742_smallTruck =(record742.waste_gh_smallTruck+record742.waste_jo_smallTruck+record742.waste_sh_smallTruck)*tonnages.small_truck_waste;
          const waste_742 = waste_742_bigTruck+waste_742_smallTruck;

          res.json({ ore_700, waste_700,ore_742,waste_742 });
        } catch (err) {
          return false;
        }
      }
}