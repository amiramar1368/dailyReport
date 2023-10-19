import axios from "axios";

import { jalaliToMiladi } from "./toMiladi.js";
import { baseURL } from "../config.js";

export async function pileNumber_report(start_at, config) {
  try {
    axios.defaults.baseURL = baseURL;
    var start_at;
    start_at = start_at.split("/");
    start_at = jalaliToMiladi(start_at[0], start_at[1], start_at[2]);
    const { data } = await axios.get(
      `/report/crusher/piles?workday=${start_at}`,
      config
    );
    return data;
  } catch (err) {
    // console.log(err);
    return false;
  }
}