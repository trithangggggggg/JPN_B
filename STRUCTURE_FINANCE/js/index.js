// ==================================================================================
// Khởi tạo dữ liệu
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let dulieuMonthly = JSON.parse(localStorage.getItem("monthlyData")) || [];
let selectedMonth = "";
let pageHienTai = 1;
let itemsPage = 5;
let search = "";
let sortOrder = "asc";


// Lưu dữ liệu vào localStorage
function saveData() {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("monthlyData", JSON.stringify(dulieuMonthly));
}

// Khi trang tải, lấy tháng đã lưu và hiển thị dữ liệu
document.addEventListener("DOMContentLoaded", () => {
    selectedMonth = localStorage.getItem("selectedMonth") || ""; // Lấy tháng đã lưu, nếu không có thì rỗng
    if (selectedMonth) {
        document.getElementById("monthInput").value = selectedMonth; // Đặt tháng vào ô chọn
        updateUI(); // Cập nhật giao diện
    }
    renderCategories(); // Hiển thị danh mục
});

// Cập nhật giao diện
function updateUI() {
    let duLieuThangNay = dulieuMonthly.find(m => m.month === selectedMonth);
    if (duLieuThangNay) {
        document.getElementById("remainingAmount").textContent = `${duLieuThangNay.remaining.toLocaleString()} VND`;
    }
    renderTransactions();
    renderStats();
}

//   ========================= CHỨC NĂNG =====================


// chọn tháng tháng
function selectMonth() {
    selectedMonth = document.getElementById("monthInput").value; // Lấy tháng từ ô chọn
    localStorage.setItem("selectedMonth", selectedMonth); // Lưu tháng vào localStorage
    if (!dulieuMonthly.find(m => m.month === selectedMonth)) {
        dulieuMonthly.push({ month: selectedMonth, budget: 0, expenses: [], remaining: 0 });
    }
    saveData(); // Lưu dữ liệu
    updateUI(); // Cập nhật giao diện
}







// Lưu ngân sách
function saveBudget() {
    let o = document.getElementById("budgetInput");
    let giaTriChuoi = o.value;

    // Xóa ký tự không phải số
    let chuoiSo = "";
    for (let i = 0; i < giaTriChuoi.length; i++) {
        let kyTu = giaTriChuoi[i];
        if (kyTu >= "0" && kyTu <= "9") {
            chuoiSo += kyTu;
        }
    }

    let nganSach = parseInt(chuoiSo);

    // Kiểm tra đã chọn tháng chưa
    if (!selectedMonth) {
        showSnackbar("Vui lòng chọn tháng trước!");
        return;
    }

    // Kiểm tra giá trị hợp lệ
    if (isNaN(nganSach) || nganSach <= 0) {
        showSnackbar("Vui lòng nhập số tiền hợp lệ!");
        return;
    }

    // Tìm dữ liệu của tháng đã chọn
    let duLieu = null;
    for (let i = 0; i < dulieuMonthly.length; i++) {
        if (dulieuMonthly[i].month === selectedMonth) {
            duLieu = dulieuMonthly[i];
        }
    }

    // Nếu tìm được thì cập nhật ngân sách và số tiền còn lại
    if (duLieu != null) {
        duLieu.budget = nganSach;

        let tongChi = 0;
        for (let i = 0; i < duLieu.expenses.length; i++) {
            tongChi += duLieu.expenses[i].amount;
        }

        duLieu.remaining = nganSach - tongChi;
    }

    saveData();
    updateUI();
    o.value = "";
    showSnackbar("Ngân sách đã được lưu thành công!");
}








// Hiển thị danh sách danh mục
function renderCategories() {
    let danhSachDanhMuc = document.getElementById("categoryList");
    danhSachDanhMuc.innerHTML = categories.map((category, index) => `
  <li>
  <span>${category.name} - Giới hạn: ${category.limit.toLocaleString()} VND</span>
  <div class="btn-group">
  <button class="edit-btn" onclick="editCategory(${index})">Sửa</button>
  <button class="delete-btn" onclick="deleteCategory(${index})">Xóa</button>
  </div>
  </li>
  `).join("");
    renderCategoryOptions();
}













// Hiển thị tùy chọn danh mục trong form giao dịch
function renderCategoryOptions() {
    let danhMucChiTieu = document.getElementById("expenseCategory");
    danhMucChiTieu.innerHTML = "<option value=''>Chọn danh mục</option>";
    for (let i = 0; i < categories.length; i++) {
        danhMucChiTieu.innerHTML += "<option value='" + i + "'>" + categories[i].name + "</option>";
    }
}









// Thêm danh mục
function addCategory() {
    let tenDanhMuc = document.getElementById("categoryName").value.trim();
    let gioiHan = parseInt(document.getElementById("categoryLimit").value.trim());
    if (!tenDanhMuc || isNaN(gioiHan) || gioiHan <= 0) {
        showSnackbar("Vui lòng nhập đầy đủ và hợp lệ!");
        return;
    }
    categories.push({ name: tenDanhMuc, limit: gioiHan });
    saveData();
    renderCategories();
    document.getElementById("categoryName").value = "";
    document.getElementById("categoryLimit").value = "";
    showSnackbar("Đã thêm danh mục thành công!");
}










// Sửa danh mục
function editCategory(index) {
    let tenMoi = prompt("Nhập tên danh mục mới:", categories[index].name);
    let gioiHanMoi = prompt("Nhập giới hạn mới (VND):", categories[index].limit);
    if (tenMoi && gioiHanMoi) {
        let giaTriGioiHan = parseInt(gioiHanMoi);
        if (isNaN(giaTriGioiHan) || giaTriGioiHan <= 0) {
            showSnackbar("Giới hạn không hợp lệ!");
            return;
        }
        categories[index] = { name: tenMoi.trim(), limit: giaTriGioiHan };
        saveData();
        renderCategories();
        showSnackbar("Đã sửa danh mục thành công!");
    }
}

// Xóa danh mục
function deleteCategory(index) {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
        categories.splice(index, 1);
        saveData();
        renderCategories();
        showSnackbar("Đã xóa danh mục thành công!");
    }
}









// Thêm giao dịch
function addExpense() {
    let soTien = parseInt(document.getElementById("expenseAmount").value.replace(/[^0-9]/g, ""));
    let categoryItem = parseInt(document.getElementById("expenseCategory").value);
    let ghiChu = document.getElementById("expenseNote").value.trim();
    if (!selectedMonth) {
        showSnackbar("Vui lòng chọn tháng trước!");
        return;
    }
    if (isNaN(soTien) || soTien <= 0 || isNaN(categoryItem) || !ghiChu) {
        showSnackbar("Vui lòng điền đầy đủ thông tin hợp lệ!");
        return;
    }
    let duLieuThangNay = dulieuMonthly.find(m => m.month === selectedMonth);
    if (duLieuThangNay.budget === 0) {
        showSnackbar("Vui lòng thiết lập ngân sách trước!");
        return;
    }
    // Bỏ kiểm tra ngân sách còn lại và giới hạn danh mục
    duLieuThangNay.expenses.push({
        id: Date.now(),
        categoryIndex: categoryItem,
        amount: soTien,
        note: ghiChu,
        date: new Date().toLocaleDateString("vi-VN")
    });
    duLieuThangNay.remaining = duLieuThangNay.budget - duLieuThangNay.expenses.reduce((sum, e) => sum + e.amount, 0);
    saveData();
    updateUI();
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseNote").value = "";
    showSnackbar("Đã thêm giao dịch thành công!");
}












// Hiển thị lịch sử giao dịch
function renderTransactions() {
    let duLieuThangNay = dulieuMonthly.find(m => m.month === selectedMonth);
    let danhSachGiaoDich = document.getElementById("transactionList");
    if (!duLieuThangNay) {
        danhSachGiaoDich.innerHTML = "";
        return;
    }

    let duLieuLoc = duLieuThangNay.expenses
        .filter(e => e.note.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount);

    let tongSoTrang = Math.ceil(duLieuLoc.length / itemsPage);
    let duLieuPhanTrang = duLieuLoc.slice(
        (pageHienTai - 1) * itemsPage,
        pageHienTai * itemsPage
    );

    danhSachGiaoDich.innerHTML = duLieuPhanTrang.map(expense => `
    <li>
      <span>${categories[expense.categoryIndex].name} - ${expense.note}: ${expense.amount.toLocaleString()} VND (${expense.date})</span>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Xóa</button>
    </li>
  `).join("");

    document.getElementById("pageNumbers").textContent = `${pageHienTai}/${tongSoTrang || 1}`;
}








// Xóa giao dịch
function deleteExpense(id) {
    let duLieuThangNay = dulieuMonthly.find(m => m.month === selectedMonth);
    let giaoDich = duLieuThangNay.expenses.find(e => e.id === id);
    duLieuThangNay.expenses = duLieuThangNay.expenses.filter(e => e.id !== id);
    duLieuThangNay.remaining += giaoDich.amount;
    saveData();
    updateUI();
    showSnackbar("Đã xóa giao dịch thành công!");
}

// Tìm kiếm giao dịch
function searchTransactions() {
    search = document.getElementById("searchInput").value;
    pageHienTai = 1;
    renderTransactions();
}

// Sắp xếp giao dịch
function sortTransactions() {
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    renderTransactions();
}

// // Phân trang
// function prevPage() {
//   if (pageHienTai > 1) {
//     pageHienTai--;
//     renderTransactions();
//   }
// }

// function nextPage() {
//   let duLieuThangNay = dulieuMonthly.find(m => m.month === selectedMonth);
//   let tongSoTrang = Math.ceil(duLieuThangNay?.expenses.length / itemsPage) || 1;
//   if (pageHienTai < tongSoTrang) {
//     pageHienTai++;
//     renderTransactions();
//   }
// }

// Hiển thị thống kê
function renderStats() {
    let bangThongKe = document.getElementById("statsBody");
    bangThongKe.innerHTML = dulieuMonthly.map(data => `
    <tr>
      <td>${data.month}</td>
      <td>${data.expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()} VND</td>
      <td>${data.budget.toLocaleString()} VND</td>
      <td class="${data.remaining >= 0 ? 'status-ok' : 'status-over'}">
        ${data.remaining >= 0 ? 'Đạt ✅' : 'Không đạt ❌'}
      </td>
    </tr>
  `).join("");
}

// Thoát tài khoản
function backAcc() {
    if (confirm("Bạn có chắc muốn thoát tài khoản?")) {
        window.location.href = "login.html";
    }
}

// Hiển thị snackbar
function showSnackbar(message) {
    let snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 3000);
}

// Khởi tạo khi tải trang
document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    updateUI();
});