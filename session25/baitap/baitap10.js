//
let products = [["mì tôm", 5, 5000], ["bánh mì", 12, 15000],
["bánh bao", 5, 8000], ["mèn mén", 30, 20000]];
let cart = [];// đây là giỏ hàng
let choice;
do {
    choice = +prompt("mời bạn nhập lựa chọn");
    /* 
        1.Xem danh sách sản phẩm có sẵn trong cửa hàng.
        2.Chọn sản phẩm để mua bằng cách nhập tên sản phẩm.
            Sản phẩm không có trong cửa hàng hiển thị thông báo.
            Sản phẩm có trong cửa hàng khi mua số lượng sẽ giảm đi một, 
            khi số lượng về 0 thì thông báo sản phẩm đã hết.
            Sản phẩm khi mua đã có trong giỏ hàng thì tăng số lượng lên một
            VD giỏ hàng sau khi mua:  [[“mèn mén”, 4, 20000], [“bánh bao”, 3, 8000]]

        3Tính tổng tiền và hiển thị hóa đơn.
        
    */
   switch (choice) {
    case 1:
        // hiển thị danh sách cách sản phẩm trong cửa hàng
        showProduct();
        break;
    case 2:
        // tiến hành đi mua hàng
        addToCart();
        break;
    case 3:
        // thanh toán
        pay();
        break;
    default:
        break;
   }
} while (choice != 4);

// khai báo hàm hiển thị danh sách sản phẩm trong giỏ hàng
 function showProduct() {
    for (let i = 0; i < products.length; i++) {
        console.log(`sản phẩm thứ ${i+1} có tên là :
             ${products[i][0]}- còn số lượng : ${products[i][1]}
              giá - ${products[i][2]} ` );  
    }
 }
 // khai báo hàm đi mua hàng
 function addToCart() {
    // cho người dùng nhập tên sản phẩm
    let productName= prompt("mời bạn nhập tên sản phẩm muốn mua");
    // kiểm tra xem sản phẩm có trong cửa hàng hay không
    let flag=-1;
    for (let i = 0; i < products.length; i++) {
        if(products[i][0]==productName){
            flag=i;
            break;
        }
    }
    // đi kiểm tra biến flag
    if(flag==-1){
        console.log("sản phẩm không có trong cửa hàng");   
    }else{
        // sản phẩm có trong cửa hàng tiến hành đi mua
        console.log("sản phẩm có trong cửa hàng đi mua");
        // đi kiểm tra sản phẩm còn hàng hay hết hàng
        if(products[flag][1]==0){
            console.log("sản phẩm đã hết hàng");
        }else{
            // cho người dùng mua, số lượng sản phẩm -1
            products[flag][1]--;
            // thêm vào giỏ hàng của người mua
            /* 
            kiểm tra xem trong giỏ hàng người mua đã tồn tại sản phẩm đấy chưa
            */
           let index=-1;
           for (let i = 0; i < cart.length; i++) {
                if(cart[i][0]==products[flag][0]){
                    index=i;
                    break;
                }
           }
           if(index==-1){
            // chứng tỏ sản phẩm chưa có trong giỏ hàng
            cart.push([products[flag][0],1,products[flag][2]]);
           }else{
            // tiến hành tăng số lượng
            cart[index][1]++;
           }
        }
    }
 }
 // khai báo hàm tiến hành thanh toán
 function pay(){
    console.log("giỏ hàng", cart);
    let total=0;
    for (let i = 0; i < cart.length; i++) {
        total+=cart[i][1]*cart[i][2];
        
    }
    console.log("giá phải trả", total);
    console.log("products",products);
 }