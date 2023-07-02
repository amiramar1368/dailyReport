export function add_description(group,exit_dump,exit_shovel) {
    var description="";
    if(group=="Apadana"){
        if(exit_shovel<50400 && exit_dump>41700 && exit_dump<44400 && exit_shovel>48600 ){
            description="احتمالا استراحت ظهر";
        }else if(exit_shovel>81000 && exit_shovel<81900 && exit_dump>75000 && exit_dump<75900){
            description="احتمالا استراحت شب";
        }else{
            description="";
        }
    } else if(group=="700"){
        if(exit_shovel<50400 && exit_dump>41700 && exit_dump<44400 && exit_shovel>48600 ){
            description="احتمالا استراحت ظهر";
        }else if(exit_shovel>59400 && exit_shovel<60600 && exit_dump>56200 && exit_dump<57900){
            description="احتمالا تعویض شیفت";
        }else if (exit_shovel>75600 && exit_shovel<77000 &&  exit_dump>68400 &&  exit_dump<70500 ){
            description="احتمالا استراحت شب";
        }else if(exit_shovel>5400 && exit_shovel<6600 && exit_dump>2150 && exit_dump<3600 ){
            description="احتمالا تعویض شیفت";
        }else{
            description="";
        }
    }else if(group=="742"){
        if(exit_shovel<50400 && exit_dump>41700 && exit_dump<44400 && exit_shovel>48600){
            description="احتمالا استراحت ظهر";
        }else if(exit_shovel>59400 && exit_shovel<60600 && exit_dump>56200 && exit_dump<57900 ){
            description="احتمالا تعویض شیفت";
        }else if(exit_shovel>75600 && exit_shovel<77000 &&  exit_dump>68400 &&  exit_dump<70500){
            description="احتمالا استراحت شب";
        } else if(exit_shovel>5400 && exit_shovel<6600 && exit_dump>2150 && exit_dump<3600){
            description="احتمالا تعویض شیفت";
        }else{
            description="";
        }
    } else if(group=="Behavand"){
        if(exit_shovel<50400 && exit_dump>41700 && exit_dump<44400 && exit_shovel>48600 ){
            description="احتمالا استراحت ظهر";
        }else if(exit_shovel>61800 && exit_shovel<62400 && exit_dump>60300 && exit_dump<60900){
            description="احتمالا تعویض شیفت";
        }else if(exit_shovel>80300 && exit_shovel<81000 && exit_dump>72600 && exit_dump<73200){
            description="احتمالا استراحت شب";
        }else{
            description="";
        }
    }
    return description;
}