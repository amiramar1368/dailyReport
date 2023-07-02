// async function fetchDetailLog(id) {
//     var records ="";
//     var tbody  =document.getElementById("detail");
//     var element = document.getElementsByClassName(id)[0];
//     const{data} = await axios.get("/service/fetch-user/"+id);
//     element.style.backgroundColor=`rgba(255,99,88,.25)`;
//     // window.open("/service/fetch-details", "_blank"); 
//     show_elements("detail_rep")  
//     console.log(data); 
//     for (let i = 0; i < data.detail.length; i++) {
        
//     }
// }

// const deleteBtn = document.getElementById("delete");

// async function deleteRow(id,element){ 
//     const {data} =await axios.get("/delete-report/"+id)
//    element.parentNode.remove();

// }