let text1 = ["apple", "banana", "cat", "elephant", "dog"];
let text2 = [];
let text3 = "abc";

function filter(arr) {
    if (Array.isArray(arr)){
        if (arr.length == 0) {
            console.log("Mang khong co phan tu");
            return;
        }
        let resutl = arr.filter((item)=>{
            return item.length > 5;
        })
        console.log(resutl);
        
    }else{
        console.log("Du lieu khon ghop le");
    }
}
filter(text1);
filter(text2);
filter(text3);

