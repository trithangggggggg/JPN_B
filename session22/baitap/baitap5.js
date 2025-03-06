let arr = [1, 4 ,8 ,7, 3];
let sumC = 0;
let sumL = 0;
for( let i = 0; i< arr.length; i++){
    if(arr[i] % 2 !== 0){
        sumL += arr[i];
    }else{
        sumC += arr[i];
    }
}
console.log("Tổng các số chẵn là: " + sumC);
console.log("Tổng các số lẻ là: " + sumL);
