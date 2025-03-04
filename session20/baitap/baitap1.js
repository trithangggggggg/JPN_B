let number =+prompt("Moi ban nhap so bat ki");
let sum=+0;
if( number<0 || !Number.isInteger(number)){
    alert("khong duoc nhap so am hoac chu cai");
    number =+prompt("Yeu cau ban nhap so bat ki");
}else{
    for( let i=0; i<=number; i++){
        sum+=i;
    }
    alert(` tổng tất cả các số nguyên từ 1 đến một số ${number} là ${sum}`);
}
