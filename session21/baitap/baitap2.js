let a = +prompt("Nhập vào số thu nhat: ");
let b = +prompt("Nhập vào số hai: ");
let c = +prompt("Nhập vào số ba : ");
let d = +prompt("Nhập vào số tu: ");
let e = +prompt("Nhập vào số nam: ");
let countC = 0;
let countL = 0;
console.log(a ,b, c ,d, e);
if (a % 2 == 0 ){
    countC++;
}else{
    countL++;
}

if (b % 2 == 0 ){
    countC++;
}else{
    countL++;
}

if (c % 2 == 0 ){
    countC++;
}else{
    countL++;
}

if (d % 2 == 0 ){
    countC++;
}else{
    countL++;
}

if (e % 2 == 0 ){
    countC++;
}else{
    countL++;
}
console.log(`So luong chan: ${countC}`);
console.log(`So luong le: ${countL}`);

