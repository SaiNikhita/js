function a(){
    console.log('a')
}

a()

function b(){
    return "b"
}

let x = b()
console.log(x)

function c(p){
    return `Hi ${p}`
}

let y = c('N')
console.log(y)

//FUNCTION EXPRESSION
let d = function(p, q, r = 1){
    return p + q + r
}
console.log(d(2,3))
console.log(d(2)) //Nan no error

//ARROW FUNCTION
let e = (p, q, r = 1) => {
    return p + q + r
}
console.log(e(2,3))

let f = (p, q) =>  p + q

console.log(f(2,3))


//CONSTRUCTOR
function User(u,a) {
    this.username = u,
    this.age = a
}
let user1 = new User("a", 12)
console.log(user1)