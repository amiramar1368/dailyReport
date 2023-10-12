import { jalaliToMiladi } from "../helper/toMiladi.js";
import { setDates } from "../helper/setDates.js";
import { baseURL, tonnages } from "../config.js";

import axios from "axios";
axios.defaults.baseURL = baseURL;

export class Report {
  static mainPage(req, res) {
    const can_access = process.env.can_access;
    res.render("weekly-report", {
      error: "",
      can_access,
      layout: "./layout/weeklyLayout.ejs",
    });
  }

  static async depoToCrusher(req, res) {
    try {
      let { start_at, end_at, config } = setDates(req);
    const { data } = await axios.post(
      "/report/standard/extraction-s5",
      { start_at, end_at },
      config,
    );

    var [magnet, oxide, robat, novin] = [0, 0, 0, 0];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].block.includes("D-CF3") ||
        data[i].block.includes("D-CF2") ||
        data[i].block.includes("D-CF3-LP") ||
        data[i].block.includes("D-DF") ||
        data[i].block.includes("D-CF2 W")
      ) {
        magnet += Number(data[i].total) * tonnages.belaz_ore_depo;
      } else if (data[i].block.includes("D-Robat")) {
        robat += Number(data[i].total) * tonnages.belaz_ore_depo;
      } else if (data[i].block.includes("D-OXIDE")) {
        oxide += Number(data[i].total) * tonnages.belaz_ore_depo;
      } else if (data[i].block.includes("D-")) {
        novin += Number(data[i].total) * tonnages.belaz_ore_other_depo;
      }
    }
    res.json({ magnet, robat, oxide, novin });
    } catch (err) {
      return false
    }
    
  }

  static async sahaToCrusher(req, res) {
    try {
      const { start_at, end_at, config } = setDates(req);
    const saha = {
      depo: 0,
      crusher: 0,
    };
    const { data } = await axios.post(
      "/report/weighbridge/w2",
      { start_at, end_at, destination_id: 1 },
      config,
    );

    for (let i = 0; i < data.length; i++) {
      saha.crusher += Number(data[i].weight_diff);
    }
    const { data:depo } = await axios.post(
      "/report/weighbridge/w2",
      { start_at, end_at, destination_id: 2},
      config,
    );

    for (let i = 0; i < depo.length; i++) {
      saha.depo += Number(depo[i].weight_diff);
    }
    res.json(saha);
    } catch (err) {
      return false
    }
    
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
      config,
    );
    const { data: unloading742 } = await axios.post(
      "/report/vehicle/vehicle-v6",
      { start_at, end_at, group_id: "3,7" },
      config,
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

    res.json({ record700, record742 });
    } catch (err) {
      return false
    }
   
  }

  static async fuel(req, res) {
    try {
      const { start_at, end_at, config } = setDates(req);
    const records700 = {
      loaderHoure: 0,
      shovelDieselHoure: 0,
      loaderFeul: 0,
      shovelDieselFeul: 0,
      truckHoure: 0,
      truckFeul: 0,
      truckDistance: 0,
    };
    const records742 = {
      truckHoure: 0,
      shovelHoure: 0,
      truckFeul: 0,
      shovelFeul: 0,
      truckDistance: 0,
    };

    const records_As = {
      truckHoure: 0,
      shovelHoure: 0,
      truckFeul: 0,
      shovelFeul: 0,
      truckDistance: 0,
    };
    const records_Ap = {
      truckHoure: 0,
      shovelHoure: 0,
      truckFeul: 0,
      shovelFeul: 0,
      truckDistance: 0,
    };

    const { data: fuel_truck700 } = await axios.post(
      "/report/fuel/f3",
      { start_at, end_at, group_id: 1, vehicle_type_id: 1 },
      config,
    );

    for (let i = 0; i < fuel_truck700.length; i++) {
      records700.truckFeul += Number(fuel_truck700[i].fuel);
      records700.truckDistance += Number(fuel_truck700[i].distance) / 1000;
      records700.truckHoure += Number(fuel_truck700[i].worktime) / 3600;
    }

    const { data: fuel_shovel700 } = await axios.post(
      "/report/fuel/f3",
      { start_at, end_at, group_id: 1, vehicle_type_id: 2 },
      config,
    );
    for (let i = 0; i < fuel_shovel700.length; i++) {
      if (
        fuel_shovel700[i].vehicle_name === "PC01" ||
        fuel_shovel700[i].vehicle_name === "PC06"
      ) {
        records700.shovelDieselFeul += Number(fuel_shovel700[i].fuel);
        records700.shovelDieselHoure +=
          Number(fuel_shovel700[i].worktime) / 3600;
      } else {
        records700.loaderFeul += Number(fuel_shovel700[i].fuel);
        records700.loaderHoure += Number(fuel_shovel700[i].worktime) / 3600;
      }
    }
    const { data: fuel_truckAs } = await axios.post(
      "/report/fuel/f3",
      { start_at, end_at, group_id: 3, vehicle_type_id: 1 },
      config,
    );

    for (let i = 0; i < fuel_truckAs.length; i++) {
      records_As.truckFeul += Number(fuel_truckAs[i].fuel);
      records_As.truckDistance += Number(fuel_truckAs[i].distance) / 1000;
      records_As.truckHoure += Number(fuel_truckAs[i].worktime) / 3600;
    }

    const { data: fuel_shovelAS } = await axios.post(
      "/report/fuel/f3",
      { start_at, end_at, group_id: 3, vehicle_type_id: 2 },
      config,
    );

    for (let i = 0; i < fuel_shovelAS.length; i++) {
      records_As.shovelFeul += Number(fuel_shovelAS[i].fuel);
      records_As.shovelHoure += Number(fuel_shovelAS[i].worktime) / 3600;
    }

    const { data: fuel_truckAP } = await axios.post(
      "/report/fuel/f3",
      { start_at, end_at, group_id: 7, vehicle_type_id: 1 },
      config,
    );

    for (let i = 0; i < fuel_truckAP.length; i++) {
      records_Ap.truckFeul += Number(fuel_truckAP[i].fuel);
      records_Ap.truckDistance += Number(fuel_truckAP[i].distance) / 1000;
      records_Ap.truckHoure += Number(fuel_truckAP[i].worktime) / 3600;
    }

    const { data: fuel_shovelAP } = await axios.post(
      "/report/fuel/f3",
      { start_at, end_at, group_id: 7, vehicle_type_id: 2 },
      config,
    );

    for (let i = 0; i < fuel_shovelAP.length; i++) {
      records_Ap.shovelFeul += Number(fuel_shovelAP[i].fuel);
      records_Ap.shovelHoure += Number(fuel_shovelAP[i].worktime) / 3600;
    }

    records742.truckHoure = records_As.truckHoure + records_Ap.truckHoure;
    records742.shovelHoure = records_As.shovelHoure + records_Ap.shovelHoure;
    records742.truckFeul = records_As.truckFeul + records_Ap.truckFeul;
    records742.shovelFeul = records_As.shovelFeul + records_Ap.shovelFeul;
    records742.truckDistance =
      records_As.truckDistance + records_Ap.truckDistance;

    res.json({ records700, records742 });
    } catch (err) {
      return false
    }
    
  }

  static async shovelPerformance(req, res) {
    try {
      const { start_at, end_at, config } = setDates(req);
    const record700 = {
      allShovelHour: 0,
      hour_ph: 0,
      service_ph: 0,
      tonnage_ph: 0,
      hour_diesel: 0,
      service_diesel: 0,
      tonnage_diesel: 0,
    };
    const { data } = await axios.post(
      "/report/vehicle/vehicle-v2",
      { start_at, end_at, group_id: 1 },
      config,
    );

    for (let i = 0; i < data.length; i++) {
      record700.allShovelHour += Number(data[i].worktime) / 3600;
      if (data[i].shovel_name.startsWith("PH")) {
        record700.hour_ph += Number(data[i].worktime) / 3600;
        record700.service_ph += Number(data[i].sumser);
        record700.tonnage_ph += Number(data[i].tonnage);
      } else if (
        data[i].shovel_name == "PC01" ||
        data[i].shovel_name == "PC06"
      ) {
        record700.hour_diesel += Number(data[i].worktime) / 3600;
        record700.service_diesel += Number(data[i].sumser);
        record700.tonnage_diesel += Number(data[i].tonnage);
      }
    }
    res.json(record700);
    } catch (err) {
      return false
    }
    
  }

  static async weighbridge(req, res) {
    try {
      const { start_at, end_at, config } = setDates(req);
    const records = {
      robat: 0,
      galmande: 0,
      novin: 0,
      khazar: 0,
      arjan: 0,
      karmania_sh: 0,
      karmania_ka: 0,
      chah_gaz: 0,
    };
    const { data: robat } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 1 },
      config,
    );
    for (let i = 0; i < robat.length; i++) {
      records.robat += Number(robat[i].weight_diff) / 1000;
    }
    const { data: galmande } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 2 },
      config,
    );
    for (let i = 0; i < galmande.length; i++) {
      records.galmande += Number(galmande[i].weight_diff) / 1000;
    }
    const { data: novin } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 3 },
      config,
    );
    for (let i = 0; i < novin.length; i++) {
      records.novin += Number(novin[i].weight_diff) / 1000;
    }
    const { data: khazar } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 5 },
      config,
    );
    for (let i = 0; i < khazar.length; i++) {
      records.khazar += Number(khazar[i].weight_diff) / 1000;
    }
    const { data: arjan } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 8 },
      config,
    );
    for (let i = 0; i < arjan.length; i++) {
      records.arjan += Number(arjan[i].weight_diff) / 1000;
    }
    const { data: karmania_sh } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 9 },
      config,
    );
    for (let i = 0; i < karmania_sh.length; i++) {
      records.karmania_sh += Number(karmania_sh[i].weight_diff) / 1000;
    }
    const { data: karmania_ka } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 11 },
      config,
    );
    for (let i = 0; i < karmania_ka.length; i++) {
      records.karmania_ka += Number(karmania_ka[i].weight_diff) / 1000;
    }
    const { data: chah_gaz } = await axios.post(
      "/report/weighbridge/w1",
      { start_at, end_at, weighbridge_id: 10 },
      config,
    );
    for (let i = 0; i < chah_gaz.length; i++) {
      records.chah_gaz += Number(chah_gaz[i].weight_diff) / 1000;
    }
    res.json(records);
    } catch (err) {
      return false
    }
    
  }

  static async depo(req, res) {
    try {
      const { start_at, end_at, config } = setDates(req);
    const records = {
      robat: 0,
      galmande: 0,
      novin: 0,
      khazar: 0,
      arjan: 0,
      karmania_sh: 0,
      karmania_ka: 0,
      chah_gaz: 0,
    };
    const { data } = await axios.post(
      "/report/management/m13",
      { workday: end_at },
      config,
    );
    res.json(data);
    } catch (err) {
      return false
    }
    
  }
}
