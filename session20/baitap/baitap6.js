let n = +prompt("Moi ban nhap 1 so nguyen");
let flag = 0;
if (n < 2) {
    flag = 1;
} else {
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            flag = 1;
            break;
        }
    }
}
if (flag === 0) {
    alert(n + " là số nguyên tố");
} else {
    alert(n + " không phải số nguyên tố");
}