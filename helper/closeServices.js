import {numberToDate} from '../helper/numberToDate.js';

export function closeService(services){
    var finalSer =[];
for(let shovel in services){
    for(let service of services[shovel]){
        var exit = service.exitShovel;
        if(exit>86400){
            exit -= 86400
        }
        var exitshovel = numberToDate(exit);

        finalSer.push({shovel:service['shovel_name'],truck:service.truck,exitshovel})
    }
}
  return finalSer; 
  }