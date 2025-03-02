let year = +prompt("Moi ban nhan so nam kinh nghiem");
if (year < 1) {
    alert("Moi vao nghe");
}else if (year <= 3) {
    alert("Nhan vien co kinh nghiem");
}else if (year <= 6) {
    alert("Chuyen vien");
}else {
    alert("Quan ly");
}