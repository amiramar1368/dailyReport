export function stdDev(arr) {
  var sum =0 ;
   var total=0;
   var zeroTime =0;
    for (var i = 0; i < arr.length; i++) {
     sum += arr[i];
     if(arr[i]==0){
      zeroTime++;
     }
    }
    var mean = sum / arr.length;
 
    for (var i = 0; i < arr.length; i++) {
        var val = Math.pow((parseFloat(arr[i])-mean),2);
      total += val;
    }
    return Math.sqrt(total / (arr.length-zeroTime));
  }
