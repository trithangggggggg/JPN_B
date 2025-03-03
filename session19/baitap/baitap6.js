let a = +prompt("Moi ban nhap vao gia tri a cua phuong trinh aX^2 + bX + c = 0");
let b = +prompt("Moi ban nhap vao gia tri b cua phuong trinh aX^2 + bX + c = 0");
let c = +prompt("Moi ban nhap vao gia tri c cua phuong trinh aX^2 + bX + c = 0");

let denta = b*b + 4*a*c;
let x1 = (-b + Math.sqrt(denta)) / (2*a);
let x2 = (-b - Math.sqrt(denta)) / (2*a);
if (denta < 0) {
    alert("Phuong trinh vo nghiem");
} else if (denta === 0) {
    alert(`Phuong trinh co nghiem kep x1 = x2 = ${x1}`);
} else {
    alert(`Phuong trinh co 2 nghiem phan biet x1 = ${x1} va x2 = ${x2}`);
}