import fs from "fs";

import axios from "axios";
import { baseURL } from "../config.js";

axios.defaults.baseURL = baseURL;
export class Map {
  static async map(req, res) {
    const file = fs.readFileSync("map.txt", "utf-8");
    const geojsonFeature = JSON.parse(file);
    res.json(geojsonFeature);
  }
  static async report(req, res) {
    const points = [];
    if (!process.env.token) {
      res.render("login", {
        can_access: "",
        error: "زمان لاگین شما منقضی شده است",
        layout: "./layout/loginLayout.ejs",
      });
    } else {
      const token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const startTime = req.body.route_report_start_at.split(" ")[1].split(":");
      const endTime = req.body.route_report_end_at.split(" ")[1].split(":");

      const options = {
        color: "#f71a13",
        date: req.body.route_report_start_at.split(" ")[0],
        end_time: endTime[0] + ":" + endTime[1],
        start_time: startTime[0] + ":" + startTime[1],
        vehicle_id: Number(req.body.vehicle_id),
      };
     
      const { data } = await axios.post("/route-report/v2", [options], config);

      var start = [Number(data[req.body.vehicle_id][0].lat), Number(data[req.body.vehicle_id][0].lng)];
      var end = [
        Number(data[req.body.vehicle_id][data[req.body.vehicle_id].length - 1].lat),
        Number(data[req.body.vehicle_id][data[req.body.vehicle_id].length - 1].lng),
      ];
      data[req.body.vehicle_id].forEach((item) => {
        points.push([Number(item.lat), Number(item.lng)]);
      });
      var error = ["لاگ مسیر در این بازه زمانی وجود ندارد"];
      if (points.length > 0) {
        error = [];
      }

      res.json({ points, error, start, end });
    }
  }

  static async get_token(req, res) {
    const token = process.env.token;
    res.json({ token });
  }
}
