let n = +prompt("Nhap so luong phan tu trong mang");
let arr = [];

if (n < 0) {
    alert("So luong phan tu khong duoc am");
} else if (n === 0) {
    alert("Mang khong co phan tu");
} else {
    for (let i = 0; i < n; i++) {
        let value = prompt(`Nhap phan tu thu ${i + 1}`);
        arr.push(value);
    }
}

let number = [];
let sum = 0;
for (let i = 0; i < arr.length; i++) {
    let num = Number(arr[i]);
    if (!isNaN(num)) { 
        number.push(num);
        sum += num;
    }
}
if (number.length > 0) {
    console.log("Tong cac so trong mang la: " + sum);

} else {
    console.log("Khong co ky tu so");
    
}
