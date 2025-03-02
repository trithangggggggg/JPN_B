let userName = prompt("moi ban nhap vao ten dang nhap");
if (userName === "ADMIN"){
    let passWord = prompt("Moi ban nhap vao mat khau");
    if (passWord === "TheMaster"){
        alert("Welcome");
    }else if (passWord === null){
        alert("Canceled");
    }else {
        alert("Wrong password");
    }
}else if (userName === null){
    alert("Canceled");  
}
else {
    alert("I Don't know you");
}