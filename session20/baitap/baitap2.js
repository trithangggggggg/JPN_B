let number = +prompt("Moi ban nhap vao so bat ki");
if (number < 0 || !Number.isInteger(number)) {
    alert("Moi ban nhap lai so nguyen duong va khong phai chu cai");
    number = +prompt("Moi ban nhap vao so bat ki");

}else{
    for(let i=0; i<=number; i++){
        ( i % 5 == 0)? console.log(i) : console.log("");
        if(i % 5==0) console.log();
    }
}