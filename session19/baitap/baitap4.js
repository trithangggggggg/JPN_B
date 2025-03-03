let number = +prompt("Nhap vao mot so muon kiem tra ");
if (number % 5 == 0 && number %3 == 0){
    alert(`${number}chia het cho ca 3 va 5`);
}else if (number % 5 == 0){
    alert (`${number} chia het cho 5 khong chia het cho 3`);
}else if (number % 3 == 0){
    alert(`${number} chia het cho 3 khong chia het cho 5`);
}
else {
    alert(`${number} khong chia het cho ca 3 va 5`);    
}