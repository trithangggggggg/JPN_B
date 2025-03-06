let n = +prompt("Moi ban nhap day so bat ki");
if (!Number.isInteger(n)) {
    console.log("day so khong hop le");
} else {
    let arr = n.toString().split("");
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
    }console.log(max);
    
}