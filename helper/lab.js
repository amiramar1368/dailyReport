import axios from 'axios';

export async function lab_report(pile,config){
    const {data} = await axios.post("/report/lab/lab-l2",{pile:pile[0].pile,type:1},config);
    const average=data.avg;
    const fromTo = data.fromTo;
    const index = fromTo.indexOf("CR",10);
    let last_sample = fromTo.substring(index+2).trim();
    if(index==-1){
        last_sample="دستی وارد گردد"
    }
    return {average,last_sample};
}