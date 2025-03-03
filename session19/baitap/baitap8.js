let month = +prompt("Nhap vao thang bat ki muon kiem tra");
if (month >=1 && month <= 3){
    alert("Mua xuan");
}else if (month >=4 && month <= 6){
    alert("Mua ha");
}else if (month >=7 && month <= 9){
    alert("Mua thu");
}else if (month >=10 && month <= 12){
    alert("Mua dong");   
}
else {
    alert("Nhap sai dinh dang (1-12)");
}     