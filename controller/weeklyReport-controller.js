import { jalaliToMiladi } from "../helper/toMiladi.js";
import { baseURL, tonnages } from "../config.js";

import axios from "axios";
axios.defaults.baseURL = baseURL;

let config, start_at, end_at;
export class Report {
  static mainPage(req, res) {
    const token = process.env.token;
    config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    var can_access = process.env.can_access;
    res.render("weekly-report", {
      error: "",
      can_access,
      layout: "./layout/weeklyLayout.ejs",
    });
  }
  static async depoToCrusher(req, res) {
    ({ start_at, end_at } = req.body);

    start_at = start_at.split("/");
    start_at = jalaliToMiladi(start_at[0], start_at[1], start_at[2]);

    end_at = end_at.split("/");
    end_at = jalaliToMiladi(end_at[0], end_at[1], end_at[2]);

    const { data } = await axios.post(
      "/report/standard/extraction-s5",
      { start_at, end_at },
      config
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
  }

  static async sahaToCrusher(req, res) {
    const { data } = await axios.post(
      "/report/weighbridge/w2",
      { start_at, end_at, destination_id: 1 },
      config
    );
    let monthly_tonnage = 0;
    for (let i = 0; i < data.length; i++) {
      monthly_tonnage += Number(data[i].weight_diff);
    }
    res.json(monthly_tonnage);
  }

  static async truckUnloading(req, res) {
    const record700 = {
      oreToDepo: 0,
      oreToCrusher: 0,
      ore_road: 0,
      waste_sh: 0,
      waste_gh: 0,
      waste_jo: 0,
      waste_road: 0,
    };
    const record742 = {
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
      record700.oreToDepo +=
        Number(unloading700[i].cf2) +
        Number(unloading700[i].cf2E) +
        Number(unloading700[i].cf3) +
        Number(unloading700[i].lo) +
        Number(unloading700[i].ore_road) +
        Number(unloading700[i].oxid);
      record700.oreToCrusher += Number(unloading700[i].ore_cr);
      record700.ore_road += Number(unloading700[i].ore_road);
      record700.waste_gh += Number(unloading700[i].waste_gh);
      record700.waste_jo += Number(unloading700[i].waste_jo);
      record700.waste_road += Number(unloading700[i].waste_in);
      record700.waste_sh += Number(unloading700[i].waste_sh);
    }

    for (let i = 0; i < unloading742.length; i++) {
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
          Number(unloading742[i].ore_road) +
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
          Number(unloading742[i].ore_road) +
          Number(unloading742[i].oxid);
        record742.oreToCrusher_smallTruck += Number(unloading742[i].ore_cr);
        record742.ore_road_smallTruck += Number(unloading742[i].ore_road);
        record742.waste_gh_smallTruck += Number(unloading742[i].waste_gh);
        record742.waste_jo_smallTruck += Number(unloading742[i].waste_jo);
        record742.waste_road_smallTruck += Number(unloading742[i].waste_in);
        record742.waste_sh_smallTruck += Number(unloading742[i].waste_sh);
      }
    }

    res.json({ record700, record742 });
  }
}
