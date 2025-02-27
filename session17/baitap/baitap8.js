let date1=new Date(prompt("Moi ban nhap ngay 1: "));
let date2=new Date(prompt("Moi ban nhap ngay 2: "));
let result=Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
alert(result);