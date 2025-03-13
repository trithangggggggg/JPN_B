function findNumber(arr) {
    let sum = 0;
    let n = arr.length + 1;
    let hieu = arr[1] - arr[0];
    let soCuoi = arr[0] + (n - 1) * hieu;
    let total = (n * (arr[0] + soCuoi)) / 2; 
    
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    
    return total - sum;
}
console.log(findNumber([1, 2, 3, 55]));
console.log(findNumber("abc"));

