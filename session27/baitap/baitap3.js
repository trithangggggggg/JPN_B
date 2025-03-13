function dienTichHinhTron() {
    let r = +prompt("Nhap ban kinh r:");
    let s = Math.PI * r * r;
    console.log("Dien tich hinh tron:"+ s);
}

function chuViHinhTron() {
    let r = +prompt("Nhap ban kinh r:");
    let c = 2 * Math.PI * r;
    console.log("Chu vi hinh tron:" + c);
}

function dienTichHinhChuNhat() {
    let d = +prompt("Nhap chieu dai d:");
    let r = +prompt("Nhap chieu rong r:");
    let s = d * r;
    console.log("Dien tich hinh chu nhat:"+ s);
}

function chuViHinhChuNhat() {
    let d = +prompt("Nhap chieu dai d:");
    let r = +prompt("Nhap chieu rong r:");
    let c = 2 * (d + r);
    console.log("Chu vi hinh chu nhat:"+ c);
}

let chon;
do {
    console.log("========MENU========");
    console.log("1. Tinh dien tich hinh tron.");
    console.log("2. Tinh chu vi hinh tron.");
    console.log("3. Tinh dien tich hinh chu nhat.");
    console.log("4. Tinh chu vi hinh chu nhat.");
    console.log("5. Thoat.");

    chon = +prompt("Moi ban nhap lua chon:");

    switch (chon) {
        case 1:
            dienTichHinhTron();
            break;
        case 2:
            chuViHinhTron();
            break;
        case 3:
            dienTichHinhChuNhat();
            break;
        case 4:
            chuViHinhChuNhat();
            break;
        case 5:
            console.log("Thoat chuong trinh.");
            break;
        default:
            console.log("Lua chon khong hop le, vui long nhap lai.");
            break;
    }

} while (chon !== 5);
