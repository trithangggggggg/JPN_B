let email1 = ["john.doe@gmail.com", "invalidemail.com", "hello@domain.net", "space@out.com"];
let email2 = [];
let email3 = "abc";

function checkEmail(arr) {
    if (!Array.isArray(arr)) {
        console.log("Du lieu khong hop le");
        return;
    }
    if (arr.length === 0) {
        console.log("Khong co phan tu");
        return;
    }
    let result = arr.filter((email) => {
       return email.includes("@") && !email.includes(" ")
    });
    console.log(result);
}
checkEmail(email1);
checkEmail(email2);
checkEmail(email3);
