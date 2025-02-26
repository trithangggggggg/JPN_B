let firstNumber = +prompt("Mời nhập số thứ nhất:");
let secondNumber = +prompt("Mời nhập số thứ hai:");
let min = Math.min(firstNumber, secondNumber);
let max = Math.max(firstNumber, secondNumber);
let x = Math.floor(Math.random() * (max - min + 1)) + min;
alert("Số ngẫu nhiên là: " + x);
