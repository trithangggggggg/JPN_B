let a = +prompt("Moi ban nhap vao canh thu nhat cua tam giac");
let b = +prompt("Moi ban nhap vao canh thu hai cua tam giac");
let c = +prompt("Moi ban nhap vao canh thu ba cua tam giac");
if ( a <= 0 || b <= 0 || c <= 0 ){
    alert("Vui long nhap lai do dai 3 canh cua tam giac");
}else {
    if ( a + b > c && b + c > a && c + a > b){
        if ( a == b && b == c){
            alert("Day la tam giac deu");
        } else if ( a == b || b == c || c == a){
            alert("Day la tam giac can");
        } else if ( a*a + b*b == c*c || b*b + c*c == a*a || c*c + a*a == b*b){
            alert("Day la tam giac vuong");
        } else {
            alert("Day la tam giac thuong");
        }
    }
}