let math=+prompt("Moi ban nhap vao diem muon toan ");
let  poet=+prompt("Moi ban nhap vao diem muon van ");
let english=+prompt("Moi ban nhap vao diem muon anh ");
let sum = (math + poet + english)/3;
if (sum >= 8) {
    alert(`Hoc luc gioi, diem tb: ${sum}`);
}else if (sum >= 6.5) {
    alert(`Hoc luc kha, diem tb: ${sum}`);
}else if (sum >= 5) {
    alert(`Hoc luc trung binh, diem tb: ${sum}`);
}else {
    alert(`Hoc luc yeu, diem tb: ${sum}`);
}
