const get_fuel_data = document.getElementById("get_fuel_data");
const check_service_form = document.getElementById("check_service_form");
const showOrHide = document.querySelectorAll(".showOrHide");
const done_report = document.getElementById("done_report");


//for hide or show
const fuel_report = document.getElementById("fuel");
const detail_rep = document.getElementById("detail_rep");
const file_rep = document.getElementById("file_rep");
const proximates = document.getElementById("proximates");
const services = document.getElementById("services");

 function show_elements(id) {
    fuel_report.classList.add("hide");
    detail_rep.classList.add("hide");
    file_rep.classList.add("hide");
    proximates.classList.add("hide");
    services.classList.add("hide");
    var element= document.getElementById(id);
    element.classList.remove("hide");
}

function show_done_report() {
    show_elements("file_rep")
}


if(get_fuel_data){
    get_fuel_data.addEventListener("click",async ()=>{
        var record="";
        var date = document.getElementById("jalali").value;
        var fuel_table = document.getElementById("fuel_table");
        show_elements("fuel")
        const {data} = await axios.post("/fuel/get-data",{date,group_id: []});
        for (let i = 0; i < data.filterd_data.length; i++) {
            var time = data.filterd_data[i].created_at.split(" ")[1].substring(0,8)
            record += ` <tr class="rows">
            <td scope="col">${i+1}</td>
            <td scope="col">${data.filterd_data[i].fuel_name}</td>
            <td scope="col">${data.filterd_data[i].fuel.toFixed(3)}</td>
            <td scope="col">${data.filterd_data[i].total.toFixed(3)}</td>
            <td style="direction:ltr" scope="col">${data.dist_litr[i].toFixed(3)}</td>
            <td scope="col">${data.dist_time[i]}</td>
            <td scope="col">${time}</td>
          </tr>` 
        }
        fuel_table.innerHTML = record;
    })
}
if(check_service_form){
    check_service_form.addEventListener("submit",async(event)=>{
        event.preventDefault();
        show_elements("services");
        var service = document.getElementById("service");
        var group_shift = document.getElementById("group_shift");
        var date = document.getElementById("date");
        var records1 ="";
        var records2 ="";
        const group_id = document.getElementById("group").value;
        const shift = document.getElementById("shift").value;
        const accuracy = document.getElementById("accuracy").value;
        const report_at = document.getElementById("jalali").value;
        const{data} = await axios.post("service/fetch-services",{group_id,shift,accuracy,report_at});
        showOrHide[1].classList.remove("hide");
        fuel_report.classList.add("hide");
        for(let i=0 ; i<data.AllServ.length ; i++){
            records1 +=`<tr class="rows ${data.AllServ[i].id}" ondblclick="report('${data.AllServ[i].id}','${data.AllServ[i].truckId}','${data.AllServ[i].truck}','${data.group}','${data.AllServ[i].exitDu}','${data.AllServ[i].exitSH}','${data.date}','${data.AllServ[i].dist}','${data.AllServ[i].shovel_exit_date}','${data.AllServ[i].dump_exit_date}','${data.AllServ[i].exitShovelforFilter}','${data.AllServ[i].exitDumpforFilter}')">
              <td scope="col">${i+1}</td>
              <td scope="col">${data.AllServ[i].truck}</td>
              <td scope="col">${data.AllServ[i].exitDu}</td>
              <td scope="col">${data.AllServ[i].exitSH}</td>
              <td scope="col">${data.AllServ[i].dist}</td>
              <td class="persian" scope="col">${data.AllServ[i].description}</td>
              <td scope="col">${data.AllServ[i].preBlock}</td>
              <td scope="col">${data.AllServ[i].nextBlock}</td>
          </tr>`; 
        }
        service.innerHTML = records1;
        group_shift.innerHTML =data.group + " "+ data.shift;
        date.innerHTML = data.jalaliDate;
        var proximate = document.getElementById("proximate");
        for(let i=0 ; i<data.closeSer.length ; i++){
            records2 +=`<tr class="rows" ondblclick='this.style.backgroundColor="rgba(255,99,88,.25)";this.style.fontWeight="bold"' >
              <td scope="col">${i+1}</td>
              <td scope="col">${data.closeSer[i].truck}</td>
              <td scope="col">${data.closeSer[i].shovel}</td>
              <td scope="col">${data.closeSer[i].exitshovel}</td>
          </tr>`
        }
        proximate.innerHTML = records2;
    })
}

if(done_report){
    done_report.addEventListener("click",async()=>{
        show_elements("file_rep");
        var records ="";
        var reports  = document.getElementById("file")
        const {data} = await axios.get("/service/done-report");
        console.log(data);
        for (let i = 0; i < data.file.length; i++) {
            var shift=data.file[i].shift_id;
            if(shift==""){
                shift="1 ,2 , 3"
            }
        records+= `<tr class="rows ${data.file[i].id}" ondblclick="fetchDetailLog('${data.file[i].id}')">
        <td scope="col">${i+1}</td>
        <td class="persian" scope="col">${data.file[i].fullname} <span class="badge"> ${data.length[i]} </span> </td>
        <td class="persian" scope="col">${data.file[i].group}</td>
        <td scope="col">${shift}</td>
        <td scope="col">${data.file[i].date}</td>
        <td scope="col">${data.file[i].time}</td>
        <td id="del_cell" class="persian td${data.file[i].id}" onclick="deleteRow('${data.file[i].id}')" scope="col">حذف</td>
     </tr>`            
        }
reports.innerHTML = records;
    })
}

async function fetchDetailLog(id) {
    var records ="";
    var tbody  =document.getElementById("detail");
    console.log(tbody);
    var element = document.getElementsByClassName(id)[0];
    const{data} = await axios.get("/service/fetch-user/"+id);
    element.style.backgroundColor=`rgba(255,99,88,.25)`;
    // window.open("/service/fetch-details", "_blank"); 
    show_elements("detail_rep")  
    console.log(data); 
    for (let i = 0; i < data.detail.length; i++) {
        records += `<tr class="rows">
        <td scope="col">${i+1}</td>
        <td class="persian" scope="col">${data.fullname}</td>
        <td scope="col">${data.detail[i].truck}</td>
        <td scope="col">${data.detail[i].start}</td>
        <td scope="col">${data.detail[i].end}</td>
       </tr>`
    }
    tbody.innerHTML = records;
}

const deleteBtn = document.getElementById("delete");

async function deleteRow(id){ 
    var element = document.getElementsByClassName("td"+id)[0];
    const {data} =await axios.get("/service/delete-report/"+id)
   if(data.success){
    element.parentNode.remove();
   }

}

// const td = document.getElementsByClassName("test");
// for(let i=0; i<td.length ; i++){
// td[i].parentElement.style.backgroundColor = '#e9b770'
// }
function changeReportType(){
fuel_report.classList.add("hide")
for(let i=0 ; i<showOrHide.length ; i++){
showOrHide[i].classList.toggle("hide");
}
}









































(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);


