let a = +prompt("Moi ban nhap so a");
let b = +prompt("Moi ban nhap so b");
let result = 1;
if (isNaN(a) || isNaN(b)) {
    alert("khong hop le");
} else {
    for (let i = 0; i < b; i++) {
        result *= a;
    }
    alert(result);
}