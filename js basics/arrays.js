let arr = [5,2]
console.log(arr)
console.log(arr.length)
console.log(arr[0]);
console.log(arr[2]); //undefined
let [a,b] = arr
console.log(a);
let [x,] = arr
console.log(x);

arr.push(7)
//push, pop, shift, unshift, splice, foreach, filter, map
arr[3] = 4
let [p,,...r] = arr
console.log(r);

arr.forEach(i => {
    console.log(i);
})
arr.forEach((v,k,arr) => {
    console.log(k,v,arr);
})

arr.filter(i => i%2 == 0).map(i => i*2).forEach(i => {
    console.log(i);
})

console.log(arr.filter(i => i%2 == 0).map(i => i*2).reduce((a,b) => a + b))

arr[5] = 4 // [ 5, 2, 7, 4, <1 empty item>, 4 ] no error
console.log(arr)

let arr2 = [2, 'a', {b:2}, function(){return 1}]
console.log(arr2)
console.log(arr2[3]())