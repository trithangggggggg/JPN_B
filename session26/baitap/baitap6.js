function checkDate(arr) {
    if (!Array.isArray(arr)) {
        console.log("Dữ liệu không hợp lệ");
        return;
    } else if (arr.length === 0) {
        console.log("Mảng không có phần tử nào");
        return;
    } else {
        let result = []

        for (let i = 0; i < arr.length; i++) {
            let date = new Date(arr[i])
            if (!isNaN(date)) {
                let d = date.getDate(), m = date.getMonth() + 1, y = date.getFullYear()
                result.push((d < 10 ? "0" : "") + d + "/" + (m < 10 ? "0" : "") + m + "/" + y)
            }
        }
        return result
    }
}
console.log(checkDate(["2025-03-10", "2024-12-25", "2023-07-01"]))
console.log(checkDate([]))
console.log(checkDate("abc"))