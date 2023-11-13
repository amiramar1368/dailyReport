

import { extraction_report } from "../helper/extraction.js";
import { unloading_report } from "../helper/truck-unloading.js";
import { transport_report } from "../helper/transport.js";
import {
  weighbridge_report,
  weighbridge_report2,
} from "../helper/weighbridge.js";
import { depo_report } from "../helper/depo.js";
import { stop_report } from "../helper/stop.js";
import { speed_report } from "../helper/speed.js";
import { lab_report } from "../helper/lab.js";
import { mis_report } from "../helper/mis.js";
import { crusher_feed_report } from "../helper/crusherFeed.js";
import { loader_tonnage_report } from "../helper/loader-tonnage.js";
import { abroft_report } from "../helper/abroft.js";
import { pileNumber_report } from "../helper/pileNumber.js";
import {sample_report} from '../helper/sample.js';
import {trip_report} from '../helper/trip.js';
import { fuel_report, fuel_report_all } from "../helper/fuel.js";

export class Report {
    static daily(req,res) {
        var can_access =process.env.can_access;
        res.render("daily-report",{error:"",can_access,layout:"./layout/dailyLayout.ejs"});
     }

  static async abroft(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var abroft_700 = await abroft_report(start_at, 1, config);
      var abroft_742 = await abroft_report(start_at, 3, config);
      var abroft_Apa = await abroft_report(start_at, 7, config);
      res.json({ abroft_700, abroft_742, abroft_Apa });
    } catch (err) {
      res.json(false);
      console.log(err);
    }
  }

  static async extraction(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var extraction_700 = await extraction_report(start_at, 1, config);
      var extraction_742 = await extraction_report(start_at, 3, config);
      var extraction_Apa = await extraction_report(start_at, 7, config);
      // var extraction_Beh = await extraction_report(start_at, 6, config);
      res.json({
        extraction_700,
        extraction_742,
        extraction_Apa,
      });
    } catch (err) {
      res.json(false);
    }
  }

  static async unloading(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var unloading_700 = await unloading_report(start_at, 1, config);
      var unloading_742 = await unloading_report(start_at, 3, config);
      var unloading_Apa = await unloading_report(start_at, 7, config);
      // var unloading_Beh = await unloading_report(start_at, 6, config);
      // res.json({unloading_Beh});
      res.json({ unloading_700, unloading_742, unloading_Apa });
    } catch (err) {
      res.json(false);
    }
  }

  static async transport(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var transport_700 = await transport_report(start_at, 1, config);
      var transport_742 = await transport_report(start_at, 3, config);
      var transport_Apa = await transport_report(start_at, 7, config);
      // var transport_Beh = await transport_report(start_at, 6, config);
      res.json({ transport_700, transport_742, transport_Apa });
    } catch (err) {
      res.json(false);
    }
  }
  
  static async weighbridge(req, res) {
    
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var weighbridge_east_saha_to_cr = await weighbridge_report2(start_at,1,6,config);
      var weighbridge_east_saha_to_Depo = await weighbridge_report2(start_at,2,6, config);
      var weighbridge_west_saha_to_cr = await weighbridge_report2(start_at,1,7,config);
      var weighbridge_west_saha_to_Depo = await weighbridge_report2(start_at,2,7, config);
      
      var weighbridge_robat = await weighbridge_report(start_at, 1, config);
      var weighbridge_galmande = await weighbridge_report(start_at, 2, config);
      var weighbridge_novin = await weighbridge_report(start_at, 3, config);
      var weighbridge_saha = await weighbridge_report(start_at, 4, config);
      var weighbridge_khazar = await weighbridge_report(start_at, 5, config);
      var weighbridge_arjan = await weighbridge_report(start_at, 8, config);
      var weighbridge_poolad = await weighbridge_report(start_at, 9, config);
      var weighbridge_karmania_kashan = await weighbridge_report(start_at, 11, config);
      var weighbridge_chah_gaz = await weighbridge_report(start_at, 10, config);

      res.json({
        weighbridge_robat,
        weighbridge_galmande,
        weighbridge_novin,
        weighbridge_saha,
        weighbridge_khazar,
        weighbridge_arjan,
        weighbridge_chah_gaz,
        weighbridge_poolad,
        weighbridge_karmania_kashan,
        weighbridge_east_saha_to_cr,
        weighbridge_east_saha_to_Depo,
        weighbridge_west_saha_to_cr,
        weighbridge_west_saha_to_Depo
      });
    } catch (err) {
      res.json(false);
    }
  }

  static async depo(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var depo = await depo_report(start_at, config);
      res.json(depo);
    } catch (err) {
      res.json(false);
    }
  }

  static async stop(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var record_700 = await stop_report(start_at, start_at,1,config);
      var record_742 = await stop_report(start_at, start_at,3,config);
      var record_Ap = await stop_report(start_at, start_at,7,config);
      res.json({ record_700,record_742,record_Ap });
    } catch (err) {
      res.json(false);
    }
  }

  static async speed(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var speed_700 = await speed_report(start_at, 1, config);
      var speed_742 = await speed_report(start_at, 3, config);
      var speed_Apa = await speed_report(start_at, 7, config);
      // var speed_Beh = await speed_report(start_at, 6, config);
      res.json({ speed_700, speed_742, speed_Apa });
    } catch (err) {
      res.json(false);
    }
  }

  static async lab(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { pile } = req.body;
      var lab = await lab_report(pile, config);
      res.json(lab);
    } catch (err) {
      res.json(false);
    }
  }

  static async mis(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { pile, start_at } = req.body;
      var mis = await mis_report(start_at, pile, config);
      return res.json(mis);
    } catch (err) {
      res.json(false);
    }
  }

  static async pile(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var pile_nmber = await pileNumber_report(start_at, config);
      return res.json(pile_nmber);
    } catch (err) {
      res.json(false);
    }
  }
  static async semple(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;

      var samples = await sample_report(start_at, config);
      return res.json(samples);
    } catch (err) {
      res.json(false);
    }
  }
  static async trips(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      const trips700 = await trip_report(start_at,1, config);
      const trips742 = await trip_report(start_at,3, config);
      const tripsAp = await trip_report(start_at,7, config);
      return res.json({trips700,trips742,tripsAp});
    } catch (err) {
      res.json(false);
    }
  }

  static async fuel(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      const record_700 = await fuel_report(start_at,[1],config);
      const record_742 = await fuel_report(start_at,[3],config);
      const record_Apa = await fuel_report(start_at,[7],config);

      return res.json({record_700,record_742,record_Apa});
    } catch (err) {
      console.log(err);
      res.json(false);
    }
  }
  static async allFuel(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      const record = await fuel_report_all(start_at,config)

      return res.json(record);
    } catch (err) {
      console.log(err);
      res.json(false);
    }
  }

  static async crusher_feed(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var crusher_feed = await crusher_feed_report(start_at, config);
      res.json({ crusher_feed });
    } catch (err) {
      res.json(false);
    }
  }

  static async loader_tonnage(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      var { start_at } = req.body;
      var loader_tonnage = await loader_tonnage_report(start_at, config);
      res.json({ loader_tonnage });
    } catch (err) {
      res.json(false);
    }
  }
}