//Viết chương trình kiểm tra một chuỗi  nhập vào là chữ cái hay không. neu co 1 so bat ki thi se hien ra la ko phai chuoi chi toan chu cai 
let str = prompt("Nhap vao chuoi kiem tra");
let check = true;
for (let i = 0; i < str.length; i++) {
    if (str[i] >= '0' && str[i] <= '9') {
        check = false;
        break;
    }
}
if (check) {
    alert("Chuoi chi toan chu cai");
} else {
    alert("Chuoi khong chi toan chu cai");
}