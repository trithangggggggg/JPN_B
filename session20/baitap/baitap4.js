let str = prompt("Moi ban nhap 1 chuoi ky tu");
let search = prompt("Moi ban nhap 1 ky tu muon tim kiem");
let flag = 0;
for (let i = 0; i < str.length; i++) {
    if (str[i] === search) {
        flag = 1;
        break;
    }
}
flag == 1 ? alert("Ton tai") : alert("Khong ton tai");
