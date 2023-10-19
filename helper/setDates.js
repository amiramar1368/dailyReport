import { jalaliToMiladi } from "./toMiladi.js";

export function setDates(req) {
    let{ start_at, end_at,pile_number } = req.body;

    start_at = start_at.split("/");
    start_at = jalaliToMiladi(start_at[0], start_at[1], start_at[2]);

    end_at = end_at.split("/");
    end_at = jalaliToMiladi(end_at[0], end_at[1], end_at[2]);
    
    const token = process.env.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    return {start_at,end_at,pile_number ,config}
}