function maxNumber() {
    let array = [];
    
    for (let i = 0; i < 10; i++) {
        array.push(parseInt(prompt(`Nhập số thứ ${i + 1}:`)));
    }

    let maxNum = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] > maxNum) {
            maxNum = array[i];
        }
    }

    let position = array.indexOf(maxNum);

    console.log(`Số lớn nhất: ${maxNum}, vị trí: ${position}`);
}

maxNumber();
