let number1 = +prompt("Moi ban nhap vao so a");
let operation = prompt("Moi ban nhap vao phep toan (+, -, *, /)");
let number2 = +prompt("Moi ban nhap vao so b");
if (operation === "+") {
    alert(`ket qua cua phep tinh tre a + b = ${number1 + number2}`);
} else if (operation === "-") {
    alert(`ket qua cua phep tinh tren a - b = ${number1 - number2}`);
} else if (operation === "*") {
    alert(`ket qua cua phep tinh tren a * b = ${number1 * number2}`);
} else if (operation === "/") {
    if (number2 === 0) {
        alert("Khong the chia cho 0, moi nhap lai so b");
    } else {
        alert(`ket qua cua phep tinh tren a / b = ${number1 / number2}`);
    }
}