
var color,
  group_id,
  route_report_end_at,
  route_report_start_at,
  simulationSpeed,
  type,
  vehicle_id,
  vehicle_type_id,
  pointer,
  positionX,
  positionY;

  var forMap = document.getElementById("forMap");

  // close report page
  document.addEventListener("click",(event)=>{
    if(pointer!=undefined){
       pointer.close();
    }
  
   })

async function report(serviceId,vehicle_id,truck, group, start, end, date,dist,shovel_exit_date,dump_exit_date,shovel_exit_filter,dump_exit_filter) {
  const elem = document.getElementsByClassName(serviceId)[0];
  if(dump_exit_filter>shovel_exit_filter){
    return alert("خروج از تخلیه و خروج از شاول برای دو روز متفاوت می باشد. امکان اخذ گزارش مسیر در بازه های دو روزه وجود ندارد")
  }
  elem.style.backgroundColor=`rgba(255,99,88,.25)`;
  localStorage.setItem("truck", truck);
  localStorage.setItem("startTime", start);
  localStorage.setItem("endTime", end);
  localStorage.setItem("distanceTime", dist);
  
  const response = await axios.post("/service/detail-report",{truck,start,end})

  color = "#454eb2";
  if (group == "700") {
    group_id = 1;
  } else if ((group = "742")) {
    group_id = 3;
  } else if ((group = "behavand")) {
    group_id = 6;
  } else {
    group_id = 7;
  }
  if(shovel_exit_date==dump_exit_date){
    route_report_start_at = shovel_exit_date + " " + start + ":00";
    route_report_end_at = shovel_exit_date + " " + end + ":00";
  }else{
    route_report_start_at = dump_exit_date + " " + start + ":00";
    route_report_end_at = dump_exit_date + " " + "23:59:59";
  }
  simulationSpeed = 500;
  type = 1;
  vehicle_type_id = 1;
 const {data} = await axios.get("/map/get-token")
 if(data.token){
    const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization:"Bearer "+data.token
    },
  };
 try {

  const { data } = await axios.post("/map/route-report", {

    color,
    group_id,
    route_report_end_at,
    route_report_start_at,
    simulationSpeed,
    type,
    vehicle_id,
    vehicle_type_id,
  },config);  
  if (data.error.length == 0) {
    pointer = window.open("/get-map", "_blank",`width=${innerWidth/2.6},height=${innerHeight/1.8},top=${innerHeight/4},left=${innerWidth/4} `);
    localStorage.setItem("points", JSON.stringify(data.points));
    localStorage.setItem("start", JSON.stringify(data.start));
    localStorage.setItem("end", JSON.stringify(data.end));
  } else {
    alert(data.error);
  }
 } catch (err) {
  console.log(err);
 }
} else{
  alert("احراز هویت انجام نشد")
}
}


