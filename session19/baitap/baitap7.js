let number1 = +prompt("Nhap vao so thu nhat");
let number2 = +prompt("Nhap vao so thu hai");
let number3 = +prompt("Nhap vao so thu ba");

if (number1 > number2 && number1 > number3) {
    alert(`So lon nhat la ${number1}`);
} else if (number2 > number1 && number2 > number3) {
    alert(`So lon nhat la ${number2}`);
} else if (number3 > number1 && number3 > number2) {
    alert(`So lon nhat la ${number3}`);
} else {
    alert("3 so bang nhau");
}