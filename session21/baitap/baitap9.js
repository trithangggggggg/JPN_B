let number = +prompt("Moi ban nhap so nguyen bat ki");
let count = 0;
for (let i = 0; i <= number; i++) {
    if (number % i == 0) {
        count++;
    }
}
if(count==2){
    console.log(`${number} la so nguyen to`);
}else{
    console.log(`${number} khong phai so nguyen to`);
}