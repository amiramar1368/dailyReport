import axios from 'axios';

export async function lab_report(pile,config){
    const {data} = await axios.post("http://192.168.10.20/report/lab/lab-l2",{pile:pile[0].pile,type:1},config);
    var average=data.avg;
    var fromTo = data.fromTo;
    var index = fromTo.indexOf("CR",10);
    var last_sample = fromTo.substring(index+2).trim();
    return {average,last_sample};
}