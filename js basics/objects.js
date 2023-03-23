let a = {}

let b = {
    x : 1,
    y:2,
    'a b' : 4,
}

console.log(b)
console.log(b.x)
console.log(b['x'])
console.log(b['a b'])

delete b.x
console.log(b)


let c = {
    x:{
        p:1
    }
}

console.log(c.x.p)
console.log(c.x.p1) //undefined
//console.log(c.x1.p) //error
console.log(c.x1?.p) //undefined

let d = {
    x: () =>{
        console.log("Hi")
    }
}
d.x()