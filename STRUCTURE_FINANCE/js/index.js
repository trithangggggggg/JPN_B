let user = [
    {
        id: 1,
        username: "user1",
        password: "123123"
    },
    {
        id: 2,
        username: "user2",
        password: "123123"
    },
    {
        id: 3,
        username: "user3",
        password: "123123"
    }
]











function backAcc() {
    let confirmLogout = confirm("Bạn có chắc muốn thoát tài khoản?");
    if (confirmLogout) {
      window.location.href = "login.html";
    }
  }
  
  
  function showSnackbar(message) {
      let snackbar = document.getElementById("snackbar");
      snackbar.textContent = message;
      snackbar.className = "show";
      
      setTimeout(function () {
          snackbar.className = snackbar.className.replace("show", "");
        }, 3000);
    }
    
    function saveBudget() {
      let budgetInput = document.getElementById("budgetInput").value.trim();
      if (budgetInput === "") {
          showSnackbar("Vui lòng nhập số tiền trước khi lưu !");
          return;
      }
      showSnackbar("Ngân sách đã được lưu thành công!");
  }

