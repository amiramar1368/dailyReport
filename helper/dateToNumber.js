


  export function dateToNumber(dateString) {
    var time = dateString.split(" ")[1]
    var h = Number(time.split(":")[0]);
    var m = Number(time.split(":")[1]);
    var s = Number(time.split(":")[2]);
    return h * 3600 + m * 60 + s;
  }