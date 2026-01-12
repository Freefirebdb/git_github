let num1="";
let num2="";
let operator="";
let two=false;

function p(x){
    if(typeof x==="number"){
        if(!two){
            num1+=x;
        }
        else{
            num2+=x;
        }
        return document.getElementById("display").value=num1+operator+num2;
    }
    operator=x;
    two=true;
    document.getElementById("display").value=num1+operator;
}
function cal(){
    let a=Number(num1);
    let b=Number(num2);
    let result=0;
    if(operator=="+"){
        result=a+b;
    }
    else if(operator=="-"){
        result=a-b;
    }
    else if(operator=="*"){
        result=a*b;
    }
    else if(operator=="/"){
        result=a/b;
    }
    document.getElementById("display").value=result;
    num1=result.toString();
    num2="";
    operator="";
    two=false;
}
function clr(){
    num1="";
    num2="";
    operator="";
    two=false;
    document.getElementById("display").value="";
}