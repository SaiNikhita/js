console.log("Hi")
console.log(2+2)


//VARIABLES
num = 2 + 2 //not good but allowed
let user
let n = 2
const pi = 3.14
user = "Nikhita"

//primitive types: number, BigInt, string, boolean, null, undefined, symbol 
//numbers: 5.8, 1.5e12, 0xf, 1_00_000, 5/0 (Infinity)
//BigInt: 175368726328638257386289787n
//String: a+b
//boolean: true, false
console.log(typeof num)

let a = null
console.log(a)
console.log(typeof a) //null is a object
let b
console.log(b)
console.log(typeof b)
console.log(5/"a") //NaN
console.log(typeof (5/"a")) //number

//TYPE CONVERSION
let n1 = String(6)
let n2 = Number("123")

//TYPE COERSION
console.log(2 + "3") //23
console.log("3" + 2) //32
console.log(typeof (2 + "")) //string
console.log(+"2") //string to number
console.log("6" - 2) // number 4
console.log(typeof ("6" - 2))
console.log(2 - "6") //number -4
console.log("2" > 1)
let x = "123 abc"
console.log(Number(x))
console.log(parseInt(x))
x = "N 123 abc"
console.log(parseInt(x))
//falsy values 0, null, undefined Boolean(0)

//ARITHMETIC OPERATORS
/*numbers: +, -, /, *, %, +=, -=, /=, *=, ++, --, **
boolean: + (add truthy and falsy value true + true = 2)
*/

//COMPARISION OPERATORS
/* numbers: <,>,<=,>=, ==, ===
string: characterwise based on ascii
*/
console.log("2" == 2)
console.log("2" === 2)
console.log('' == false)

//LOGICAL OPERATORS
// &, |, !, &&, ||

//TERNARY OPERATOR
result = num%2===0? "Even" : "Odd"
console.log(result)

//LITERALS
console.log("The addition of " + n1 + "and " + n2)
console.log(`The addition of ${n1} and ${n2} `)