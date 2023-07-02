import fs from 'fs';

var id;
export class logger{


static detailDoneReport(req,res,next){
  const{truck,start,end}=req.body;
  const userId = process.env.userId ;
  var lastId;
  try {
  let file = fs.readFileSync("detailLogger.json");
  file= JSON.parse(file);
  if(file.length>0){
    lastId = file[file.length-1].id;
  }else{
    lastId=1}
  id=lastId+1;
  file.push({id,userId,truck,start,end});
  fs.writeFileSync("detailLogger.json",JSON.stringify(file,null,"   "))
  next();
  } catch (err) {
    res.render("login",{error:"دیتابیس دچار مشکل شده است"})
  }
}

  static isDBExist(req,res,next){
    const isExist = fs.existsSync("logger.json");
    const isExist2 = fs.existsSync("detailLogger.json");
      if(!isExist){
         fs.writeFileSync("logger.json",'[]');
       };
       if(!isExist2){
        fs.writeFileSync("detailLogger.json",'[]');
      };
       next();
  }
  static async saveToDB(req,res,next){
    let{group_id:group,shift:shift_id} = req.body;
     var lastId
    if(group==undefined){
      group=1;
    };
    if(group==1){
group="مجتمع"
    }else if(group==3){
group="آسفالت طوس"
    }else if(group==6){
group="بهاوند"
    }else{
    group=  "آپادانا"
    };
    if(shift_id==undefined){
      shift_id="1 , 2 , 3"
    }
  try {
     if(process.env.token){
      var can_access=false;
      if(process.env.can_access){
        can_access =process.env.can_access
      }; 
      const fullname = process.env.full_name;
      var d = new Date();
      const time =d.getHours()+":"+d.getMinutes()+":"+d.getSeconds(); 
      const date = d.toLocaleDateString("fa-IR");
      var file = fs.readFileSync("logger.json");
      file= JSON.parse(file);
      if(file.length>0){
          lastId = file[file.length-1].id;
      }else{
        lastId=0;
      }
      id=lastId+1;
      process.env.userId =id;
      var user_data={id,fullname,group,shift_id,date,time,can_access};
      process.env.fullname = fullname;
      process.env.date = date;
      process.env.time = time;
      file.push(user_data)
      fs.writeFileSync("logger.json",JSON.stringify(file,null,"   "))
     }
    next();
    } catch (err) {
      console.log("eeee",err);
      res.render("login",{error:"دیتابیس دچار مشکل شده است"})
    }
    }

    static async deleteFromDB(){
    var date = getPreDate();
    try {
    var logContent = fs.readFileSync("logger.json");
    logContent = JSON.parse(logContent);
    var filterLog= logContent.filter((log=>log.date!=date));
    fs.writeFileSync("logger.json",JSON.stringify(filterLog));
    } catch (err) {
      // res.render("login",{error:"دیتابیس دچار مشکل شده است"})
    }
    };
    
}