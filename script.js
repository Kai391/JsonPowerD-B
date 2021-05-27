resetForm = () => {
    document.getElementById("empId").value = "";
    document.getElementById("empName").value = "";
    document.getElementById("empEmail").value = "";
    document.getElementById("empId").focus();
}
// <----------------------------------All AVlidations-------------------------->
// This is for get
validGetResqAndJsonStr = (ele) => {
    if (document.getElementById(ele.value).value === "") {
        alert("Please Fill every required GET Field!");
        document.getElementById(ele.value).focus();
        return "";
    }
    else {
        if (ele.value === "getempId") {
            let jsonStr = {
                empId: document.getElementById(ele.value).value,
            }
            return jsonStr;
        }
        else if (ele.value === "getempName") {
            let jsonStr = {
                empName: document.getElementById(ele.value).value,
            }
            return jsonStr;
        }
        else if (ele.value === "getempEmail") {
            let jsonStr = {
                empEmail: document.getElementById(ele.value).value,
            }
            return jsonStr;
        }
    }
}
// This is for create request
validateAndGetFormData = () => {
    let empIdvar = document.getElementById("empId").value;
    let empNamevar = document.getElementById("empName").value;
    let empEmailvar = document.getElementById("empEmail").value;
    if (empIdvar === "") {
        alert("Please Enter the ID");
        document.getElementById("empId").focus();
        return "";
    }
    if (empNamevar === "") {
        alert("Please Enter the Name");
        document.getElementById("empName").focus();
        return "";
    }
    if (empEmailvar === "") {
        alert("Please Enter the Email");
        document.getElementById("empEmail").focus();
        return "";
    }
    let jsonStr = {
        empId: empIdvar,
        empName: empNamevar,
        empEmail: empEmailvar
    };
    return JSON.stringify(jsonStr);
}

// for remove
validRemoveAndJsonStr = (ele)=>{
    if(document.getElementById(ele.value).value===""){
        alert("Please Fill every required REMOVE Field!");
        document.getElementById(ele.value).focus();
        return "";   
    }
    let jsonStr=document.getElementById(ele.value).value
    return jsonStr;
}

// for updation
validUpdateAndJsonStr = (ele) =>{
    let spltval = ele.value.split(" ");
    for(let i=0;i<3;i++)
    {
        if(document.getElementById(spltval[i]).value===""){
            alert("Please Fill all required UPDATE fields!");
            document.getElementById(ele.value.split(" ")[i]).focus();
            return "";
        }
    }
    var record = parseInt(document.getElementById(spltval[0]).value);
    var column = document.getElementById(spltval[1]).value;
    var value = document.getElementById(spltval[2]).value;
    let jsonStr = {
        [record]:{
            [column] :value
        }
    }
    return jsonStr;
}

// ---------------------------------------------------------------------------------------

// <------------------------------------------command execution------------------
createCmdReq = (Token, Cmd, dbName,rel, jsonStr) => {
    let str = {
        "token": Token,
        "cmd" : Cmd,
        "dbName":dbName,
        "rel":rel,
        "jsonStr":jsonStr
    }
    return JSON.stringify(str);
}
createRemReq=(Token, Cmd, dbName,rel, record) =>{
    let str = {
        "token": Token,
        "cmd" : Cmd,
        "dbName":dbName,
        "rel":rel,
        "record":parseInt(record)
    }
    return JSON.stringify(str);
}

createUpdtreq = (Token, dbName,rel, jsonStr)=>{
    let str = {
        "token": Token,
        "cmd" : "UPDATE",
        "dbName":dbName,
        "rel":rel,
        "jsonStr":jsonStr
    }
    return JSON.stringify(str);
}

//  --------------------------------------------------------------------------------------------

function saveEmployee() {
    var jsonStr = validateAndGetFormData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest("90935637|-31948840361129428|90933412",
        jsonStr, "Employee", "Emp-Rel1");
    confirm("Are you sure to submit form?");
    fetch("http://api.login2explore.com:5577/api/iml",{
        method:"POST",
        body:putReqStr
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Recieve:",data);
        alert(data['message']);
    });
    resetForm();
}

// GET Request
executeGet = (ele) => {
    let jsonStr = validGetResqAndJsonStr(ele);
    if(jsonStr==="")
    {
        return;
    }
    console.log(jsonStr);
    let getReqStr = createCmdReq("90935637|-31948840361129428|90933412", "GET", "Employee", "Emp-Rel1", jsonStr);
    console.log(getReqStr);
    fetch("http://api.login2explore.com:5577/api/irl",{
        method:"POST",
        body:getReqStr
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Recieve:",data);
        alert(data['data']);
    });
}


// Delete Request
executeRem=(ele)=>{
    let jsonStr = validRemoveAndJsonStr(ele);
    if(jsonStr==="")
    {
        return;
    }
    let remjsonStr = createRemReq("90935637|-31948840361129428|90933412","REMOVE","Employee", "Emp-Rel1", jsonStr);
    // console.log(remjsonStr);
    fetch("http://api.login2explore.com:5577/api/iml",{
        method:"POST",
        body:remjsonStr
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Recieve:",data);
        alert(data['message']);
    });
}
// Update Request
executeUpdt = (ele) => {
    let jsonStr = validUpdateAndJsonStr(ele);
    if(jsonStr==="")
    {
        return;
    }
    let updtJsonReq = createUpdtreq("90935637|-31948840361129428|90933412","Employee", "Emp-Rel1", jsonStr);
    // console.log(updtJsonReq);
    fetch("http://api.login2explore.com:5577/api/iml",{
        method:"POST",
        body:updtJsonReq
    })
    .then(response=>response.json())
    .then(data=>{
        console.log("Recieve:",data);
        alert(data['message']);
    });
}
