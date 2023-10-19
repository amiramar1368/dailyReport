import axios from "axios";
import { baseURL } from "../config.js";

const personal_code = [600882, 600880, 600712, 600723, 600500, 700159,700280];

axios.defaults.baseURL = baseURL;
export class Login {
  static loginPage(req, res) {
    res.render("login", {
      can_access: "",
      error: "",
      layout: "./layout/loginLayout.ejs",
    });
  }
  static async getUser(req, res) {
    const { login, password } = req.body;
    if (login == "" || password == "") {
      return res.render("login", {
        can_access: "",
        error: "نام کاربری و رمز عبور الزامی می باشد",
        layout: "./layout/loginLayout.ejs",
      });
    }
    try {
      // const { data } = await axios.post("/api/login", { login, password });
       const device_name = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
       const { data } = await axios.post("/users/login", { login, password,device_name });
      if (!data.message) {
       // process.env.token = data.user.token;
         process.env.token = data.access_token;
        process.env.full_name = data.user.full_name;
        var can_access = personal_code.includes(
          Number(data.user.personnel_code)
        );
        var can_access = true
        process.env.can_access = can_access;
        res.render("home", { error: "", can_access });
      } else {
        res.render("login", {
          can_access: "",
          error: "کاربری با این مشخصات وجود ندارد",
          layout: "./layout/loginLayout.ejs",
        });
      }
    } catch (err) {
      console.log(err);
      res.render("login", {
        can_access: "",
        error: "کاربری با این مشخصات وجود ندارد",
        layout: "./layout/loginLayout.ejs",
      });
    }
  }

  static async logout(req, res) {
    try {
      var token = process.env.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post("/users/logout", {}, config);
      res.render("login", {
        can_access: "",
        error: "کاربری با این مشخصات وجود ندارد",
        layout: "./layout/loginLayout.ejs",
      });
    } catch (err) {
      res.render("login", {
        can_access: "",
        error: "کاربری با این مشخصات وجود ندارد",
        layout: "./layout/loginLayout.ejs",
      });
    }
  }
}
