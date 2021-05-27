let con = document.querySelectorAll(".form");
for(let i=1;i<con.length;i++)
{
    con[i].style.display="none";
}
container = (ele) =>{
    for(let i=0;i<con.length;i++)
    {
        if(ele.value === con[i].id){
            con[i].style.display = "block";
        }
        else{
            con[i].style.display="none";
        }
    }
}

let getcon = document.querySelectorAll(".get");
for(let i=1;i<getcon.length;i++)
{
    getcon[i].style.display = "none";
}
getVal = (ele) =>{
    for(let i=0;i<getcon.length;i++)
    {
        if(ele.value === getcon[i].id)
        {
            getcon[i].style.display = "block";
        }
        else{
            getcon[i].style.display="none";
        }
    }
}
