let n = prompt("Nhap so phan tu cua mang:");
let arr = [];
let isFibonacci = true; 
for (let i = 0; i < n; i++) {
    let num = Number(prompt(`Nhap phan tu thu ${i + 1}:`));
    arr.push(num);
}
if (n < 3) {
    isFibonacci = false; 
} else {
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] !== arr[i - 1] + arr[i - 2]) {
            isFibonacci = false;
        }
    }
}
if (isFibonacci === true) {
    console.log("Mang la day Fibonacci.");
} else {
    
    console.log("Mang khong phai la day Fibonacci.");
}