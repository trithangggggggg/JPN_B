function findMin(arr) {
    if (!Array.isArray(arr)) {
        alert("mang khong chua du lieu")
    }


    if (arr.length == 0) {
        alert("mang khong co phan tu nao ");
        return;
    }
    let minElement = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (minElement > arr[i]) {
            minElement = arr[i];
        }
        alert(`phan tu nho nhat cua mang la ${minElement}`);
    }
    return;
}
findMin([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
findMin([]);
findMin("hello");