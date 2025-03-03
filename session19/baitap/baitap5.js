let chuoi = prompt("Moi ban nhap vao chuoi bat kì");
let count = 0;
for (let i = 0; i < chuoi.length; i++) {
    if (chuoi.charAt(i) === " ") {
        alert("Chuoi co chua dau cach");
    }
}
if (count === 0) {
    alert("Chuoi khong chua dau cach");
} else {
    alert("Chuoi chua dau cach");
}