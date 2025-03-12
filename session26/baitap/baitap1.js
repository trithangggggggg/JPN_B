let text1 = [2,434,64,3,23,42,65,32,23];
let text2 = [];
let text3 = "afsaf"
function filter(arr) {
    if (Array.isArray(arr)) {
        if (arr.length == 0) {
            console.log("Mang ko co phan tu");
            return;
        }
        let resutl = arr.filter((item)=>{
            return item >= 10;
        })
        console.log(resutl);
    }else{
        console.log("du lieu khong hop le");   
    }
}
filter(text1);
filter(text2);
filter(text3);