let arr = [];
let count = 0;
for (let i = 0; i < 10; i++) {
    let num = parseInt(prompt(`nhap phan tu thu ${i+1} cua mang: `));
    arr.push(num);
}
for( let i = 0; i < arr.length; i++){
    if( arr[i] > 10){
        count++;
    }
}
console.log(`Co ${count} so lon hon 10 trong mang`);
