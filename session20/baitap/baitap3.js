let number = +prompt("Moi ban nhap mot so bat ki");

if (isNaN(number) || !Number.isInteger(number)) {
    alert("So khong hop le");
} else {
    let str = number.toString();
    for (let i = 0; i <= Math.floor(str.length / 2); i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            alert("Day khong phai so doi xung");
            return;
        }
    }
    alert("Day la so doi xung");
}