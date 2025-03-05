let s = +prompt("Moi ban nhap so tien gui (VND)");
let r = +prompt("Moi ban nhap so lai hang thang (%)");
let t = +prompt("moi ban nhap thoi gian gui tien (thang)");
let total = s * (r / 100) * t;
let interest = total - s;
if (s < 0 || r < 0 || t < 0 ) {
    console.log("Sai dinh dang, moi F5 nhap lai");
} else {
    console.log(`tien lai: ${Number(interest)} VND`);
    console.log(`tien nhan duoc: ${Number(total)} VND`);
}


