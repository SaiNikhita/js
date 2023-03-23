let m = new Map()
m.set(1,'a')
console.log(m);
console.log(m.keys);
console.log(m.has(1));
console.log(m.get(1));

for( let [k,v] of m){
    console.log(k,v);
}

//foreach same as array