function sapXepNum(arr) {
    let soChan = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 === 0) {
            soChan.push(arr[i]);
        }
    }

    for (let i = 0; i < soChan.length - 1; i++) {
        for (let j = i + 1; j < soChan.length; j++) {
            if (soChan[i] > soChan[j]) {
                let temp = soChan[i];
                soChan[i] = soChan[j];
                soChan[j] = temp;
            }
        }
    }

    let i = 0;
    let result = [];
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] % 2 == 0) {
            result.push(soChan[i]);
            i++;
        } else {
            result.push(arr[j]);
        }
    }
    return result;
}
console.log(sapXepNum([5, 8, 6, 3, 4, 2, 7]));
