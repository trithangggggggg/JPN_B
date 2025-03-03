let number = +prompt("Moi ban nhap vao 1 so bat kl tu 0 den 999");
let tram = Math.floor(number / 100);
let chuc = Math.floor((number % 100) / 10);
let donvi = number % 10;
let resuilt = "";
if (number < 0 || number > 999) {
    alert("Moi ban nhap lai so tu 0 den 999");
}else {
    switch (tram) {
        case 1:
            resuilt = "Mot tram ";
            break;
        case 2:
            resuilt = "Hai tram ";
            break;
        case 3:
            resuilt = "Ba tram ";
            break;
        case 4:
            resuilt = "Bon tram ";
            break;
        case 5:
            resuilt = "Nam tram ";
            break;
        case 6:
            resuilt = "Sau tram ";
            break;
        case 7:
            resuilt = "Bay tram ";
            break;
        case 8:
            resuilt = "Tam tram ";
            break;
        case 9:
            resuilt = "Chin tram ";
            break;
    }
    switch (chuc) {
        case 1:
            resuilt += "muoi ";
            break;
        case 2:
            resuilt += "hai muoi ";
            break;
        case 3:
            resuilt += "ba muoi ";
            break;
        case 4:
            resuilt += "bon muoi ";
            break;
        case 5:
            resuilt += "nam muoi ";
            break;
        case 6:
            resuilt += "sau muoi ";
            break;
        case 7:
            resuilt += "bay muoi ";
            break;
        case 8:
            resuilt += "tam muoi ";
            break;
        case 9:
            resuilt += "chin muoi ";
            break;
    }
    switch (donvi) {
        case 1:
            resuilt += "mot";
            break;
        case 2:
            resuilt += "hai";
            break;
        case 3:
            resuilt += "ba";
            break;
        case 4:
            resuilt += "bon";
            break;
        case 5:
            resuilt += "nam";
            break;
        case 6:
            resuilt += "sau";
            break;
        case 7:
            resuilt += "bay";
            break;
        case 8:
            resuilt += "tam";
            break;
        case 9:
            resuilt += "chin";
            break;
    }
    alert(resuilt);
}
