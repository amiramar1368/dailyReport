import {numberToDate} from '../helper/numberToDate.js';
import {add_description} from '../helper/add-description.js';

export function finalServices(services,group){
    var finalSer =[];
  for(let i=0 ; i<services.length; i++){
   
      var exitSH = numberToDate(services[i].exitSH);
    var exitDu= numberToDate(services[i].exitDu);
      finalSer.push({id:i+1,
      truckId:services[i].TruckID,
      truck:services[i].truck,
      exitSH,
      shovel_exit_date:services[i].shovel_exit_date,
      exitDu,
      dump_exit_date:services[i].dump_exit_date,
      dist:services[i].dist,
      description:add_description(group,services[i].exitDu,services[i].exitSH),
      // exitShovelforFilter:services[i].exitSH,
      // exitDumpforFilter:services[i].exitDu,
      preBlock:services[i].preBlock,
      nextBlock:services[i].nextBlock
    })
  }
  return finalSer; 
  }