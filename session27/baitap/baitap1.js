function cong(a, b) {
    return(a + b);
}
function tru(a, b) {
    return(a - b);
}
function nhan(a, b) {
    return (a * b);
}
function chia(a, b) {
    return (a / b);
}

let firstNum;
let secondNum;
let chose;


do {
    console.log("========MENU========");
    console.log("1. Cộng hai số.");
    console.log("2. Trừ hai số.");
    console.log("3. Nhân hai số.");
    console.log("4. Chia hai số.");
    console.log("5. Thoát.");

    chose = +prompt("Moi ban nhao lua chon");
    switch (chose) {
        case 1:
            firstNum = +prompt("moi nhap so thu nhat");
            secondNum = +prompt("moi nhap so thu hai");
            console.log(cong(firstNum, secondNum));
            break;
        case 2:
            firstNum = +prompt("moi nhap so thu nhat");
            secondNum = +prompt("moi nhap so thu hai");
            console.log(tru(firstNum, secondNum));
            break;
        case 3:
            firstNum = +prompt("moi nhap so thu nhat");
            secondNum = +prompt("moi nhap so thu hai");
            console.log(nhan(firstNum, secondNum));
            break;
        case 4:
            firstNum = +prompt("moi nhap so thu nhat");
            secondNum = +prompt("moi nhap so thu hai");
            console.log(chia(firstNum, secondNum));
            break;
        case 5:
            console.log("thoat chuong trinh");
            break;
        default:
            console.log("Khong hop le");
            break;
    }

} while (chose !== 5);