let n = +prompt("Moi ba nhap so phan tu muon nhap");
let arr = [];
let count = 0;
for (let i = 0; i < n; i++) {
    let num = parseInt(prompt(`nhap phan tu thu ${i+1} cua mang: `));
    arr.push(num);
}

for( let i = 0; i < arr.length; i++){
    if(arr[i] < 0){
        count ++;
    }
}
console.log(arr);
console.log(`Co ${count} so nguyen am`);
