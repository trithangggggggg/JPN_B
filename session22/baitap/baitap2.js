let numberArr = [2, 5, 7, 4, 1, 8, 6];
let numberLucky = +prompt("Moi ban nhap so may man bat ki");
let flag = 0;
for (let i = 0; i < numberArr.length; i++) {
    if (numberLucky == numberArr[i]) {
        flag++;
    }
}
if(flag > 0){
    console.log("bingo");
}else{
    console.log("Chuc ban may man lan sau");
}
