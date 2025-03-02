let house = +prompt("Moi ban nhap vao so gio (0-23)");
let muite = +prompt("Moi ban nhap vao so phut (0-59)");
let second = +prompt("Moi ban nhap vao so giay (0-59) ");
if (house < 0 || house > 23 || muite < 0 || muite > 59 || second < 0 || second > 59) {
    alert("Thoi gian nhap sai dinh dang");
} else {
    let time = house%12;
    if (house <= 12){
        alert(`${time}:${muite}:${second} AM`);
    }else {
        alert(`${time}:${muite}:${second} PM`);
    }
}       