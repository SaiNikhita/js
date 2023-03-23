//WHILE
let counter = 2
while(counter > 0){
    console.log("HI", counter)
    counter--
}

//FOR
for(let i = 0; i < 3; i++){
    console.log("HI", i)
}

for(let i = 0; i < 3;){
    console.log("HI", i)
    i++
}

//DO-WHILE
counter = 2
do{
    console.log("HI")
    counter--
}while(counter > 3)

//FOR IN
let a = {
    x:1,
    y:2,
    z:{
        p:1,
        q:2
    }
}
for(let i in a){
    console.log(i, a[i])
}


//FOR OF
let arr = [1,2,3,4,5,6,7,8,9]
for(let i of arr){
    console.log(i);
}
for(let i in arr){
    console.log(i, arr[i])
}