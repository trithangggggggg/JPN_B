let arr = [1, 6, 7, 1, 3, 4, 3, 9, 3, 1];
let maxCount = 0;
let minElement;

for ( let i = 0; i < 10; i++){
    let count = 0;
    for( let j = 0; j < 10; j++){
        if(arr[i] == arr[j]){
            count ++;
        }
    }
    if (count > maxCount){
        maxCount = count;
        minElement = arr[i];
    } else if (count == maxCount && minElement > arr[i]) {
        minElement = arr[i];
    }
}
console.log(`Phan tu xuat hien nhieu nhat: ${minElement}`);
console.log(`So lan xuat hien: ${maxCount}`);