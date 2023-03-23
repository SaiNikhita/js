//IF
if(2<3)
    console.log("if")

//IF ELSE
if(2>3)
    console.log("if")
else {
    console.log("else")
    console.log("2")
}

//IF ELSEIF ELSE
if(2>3)
    console.log("if")
else if(2==2)
    console.log("a")
else {
    console.log("else")
    console.log("2")
}

//SWITCH
let day = "Wed"
switch(day){
    case "Mon":
        console.log(1)
        break
    case "Tue":
    case "Wed":
    case "Thurs":
        console.log(2)
        break
    default:
        console.log(0)
}