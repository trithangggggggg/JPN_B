let a = +prompt("Nhập vào số thu nhat: ");
let b = +prompt("Nhập vào số hai: ");
let c = +prompt("Nhập vào số ba : ");
let d = +prompt("Nhập vào số tu: ");
let e = +prompt("Nhập vào số nam: ");
let count = 0;
let sum = 0;
console.log(a ,b, c ,d, e);
if (a % 2 == 0 ){
    count = 0;
}else{
    sum += a;
}

if (b % 2 == 0 ){
    count = 0;
}else{
    sum += b;
}

if (c % 2 == 0 ){
    count = 0;
}else{
    sum += c;
}

if (d % 2 == 0 ){
    count = 0;
}else{
    sum += d;
}

if (e % 2 == 0 ){
    count = 0;
}else{
    sum += e;
}
console.log(sum);
