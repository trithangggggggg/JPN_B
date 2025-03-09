let n = prompt("Moi ba nhap so phan tu muon nhap"); 
let arr = [];
let count = 0; 

for (let i = 0; i < n; i++) {
    let input = prompt(`Nhap phan tu thu ${i+1} cua mang: `);
    if (!isNaN(input)) {
        arr.push(Number(input));
    } else {
        arr.push(input);
    }
}
for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'number') {
        count++;
    }
}
console.log(`Số ký tự số trong mảng là: ${count}`);
