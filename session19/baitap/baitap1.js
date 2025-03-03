let thang = +prompt ("Moi ban nhap vao thang muon kiem tra (1-12)");
if (thang < 1 || thang > 12) {
    alert("Thang khong hop le");
}else {
    switch (thang) {
        case 1:
            alert("Thang 1 co 31 ngay");
            break;
        case 2:
            alert("Thang 2 co 28 hoac 29 ngay");
            break;
        case 3:
            alert("Thang 3 co 31 ngay");
            break;
        case 4:
            alert("Thang 4 co 30 ngay");
            break;
        case 5:
            alert("Thang 5 co 31 ngay");
            break;
        case 6:
            alert("Thang 6 co 30 ngay");
            break;
        case 7:
            alert("Thang 7 co 31 ngay");
            break;
        case 8: 
            alert("Thang 8 co 31 ngay");
            break;
        case 9: 
            alert("Thang 9 co 30 ngay");
            break;
        case 10:
            alert("Thang 10 co 31 ngay");
            break;
        case 11:
            alert("Thang 11 co 30 ngay");
            break;
        case 12:
            alert("Thang 12 co 31 ngay");
            break;
    }
}