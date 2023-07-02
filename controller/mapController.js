import fs from "fs";

import axios from "axios";

export class Map {
  static async map(req, res) {
    const file = fs.readFileSync("map.txt", "utf-8");
    const geojsonFeature = JSON.parse(file);
    res.json(geojsonFeature);
  }
  static async report(req, res) {
    const points = [];
    if (!process.env.token){
      res.render("login", {can_access:"", error: "زمان لاگین شما منقضی شده است",layout:"./layout/loginLayout.ejs" });
    } else {
      const token = "Bearer " + process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axios.post("http://192.168.10.20/route-report", req.body, config);
      var start=[Number(data[0].lat),Number(data[0].lng)];
      var end =[Number(data[data.length-1].lat),Number(data[data.length-1].lng)];
      data.forEach((item) => {
        points.push([Number(item.lat), Number(item.lng)]);
      });
      var error = ["لاگ مسیر در این بازه زمانی وجود ندارد"];
      if (points.length > 0) {
        error = [];
      };
     
      res.json({ points, error,start,end });
    }
  }

  static async get_token(req,res){
    const token =process.env.token;
    res.json({token})
  }
}
