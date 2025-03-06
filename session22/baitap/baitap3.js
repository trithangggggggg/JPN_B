const numbers = +prompt("Moi nhap day so bat ki muon doi nguoc");
if (!Number.isInteger(numbers)) {
    console.log("Day khong hop le");
}else{
    let numbersAffter = numbers.toString().split("").reverse().join("");
    console.log(numbersAffter);
}

