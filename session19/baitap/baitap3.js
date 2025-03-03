let usd = 23000;
let vnd = 1 / 23000;
let input = +prompt(" 1. USD to VND || 2. VND to USD");
let money = +prompt("Nhap so tien can doi");
if (input === 1) {
    alert(`So tien doi duoc la: ${money * usd} VND`);
} else if (input === 2) {
    alert(`So tien doi duoc la: ${money * vnd} USD`);
} else {
    alert("Nhap sai dinh dang");
}