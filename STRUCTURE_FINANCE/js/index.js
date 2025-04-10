// Khởi tạo dữ liệu ban đầu 
let monthlyCategories = JSON.parse(localStorage.getItem("monthlyCategories")) || [];
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let monthlyReports = JSON.parse(localStorage.getItem("monthlyReports")) || [];

let selectedMonth = "";//chọn tháng 
let searchKeyword = "";//từ khóa tìm kiếm 
let sortOrder = "asc"; // ascending (tăng dần) "desc" (giảm dần)
let itemsPerPage = 5; // Số lượng giao dịch mỗi trang
let currentPage = 1;//trang hiện tại 

// Lưu dữ liệu vào localStorage
function saveToLocalStorage() {
    localStorage.setItem("monthlyCategories", JSON.stringify(monthlyCategories));
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("monthlyReports", JSON.stringify(monthlyReports));
    showNotification("Đã lưu dữ liệu thành công!");
}

// Làm mới giao diện
function refreshUI() {
    // Debug: Hiển thị dữ liệu từ localStorage
    console.log("monthlyCategories:", JSON.parse(localStorage.getItem("monthlyCategories")));
    console.log("transactions:", JSON.parse(localStorage.getItem("transactions")));
    console.log("monthlyReports:", JSON.parse(localStorage.getItem("monthlyReports")));

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (currentMonthData) {
        document.getElementById("remainingAmount").textContent = `${currentMonthData.amount.toLocaleString()} VND`;
    }
    displayCategories();
    displayTransactions();
    displayStats();
    checkCategoryLimits(); // Kiểm tra giới hạn danh mục
}

// Khi trang tải lấy tháng đã lưu và hiển thị dữ liệu 
document.addEventListener("DOMContentLoaded", () => {
    selectedMonth = localStorage.getItem("selectedMonth") || "";
    if (selectedMonth) {
        document.getElementById("monthInput").value = selectedMonth;
    }

    document.getElementById("account").addEventListener("change", function () {
        if (this.value === "logout") {
            logout();
        }
    });

    displayCategories();
    refreshUI();
});

// ===================================CHỨC NĂNG=========================================

// A - Chọn tháng
function chooseMonth() {
    selectedMonth = document.getElementById("monthInput").value;
    localStorage.setItem("selectedMonth", selectedMonth);
    if (!monthlyCategories.find(m => m.month === selectedMonth)) {
        monthlyCategories.push({
            id: monthlyCategories.length + 1,
            month: selectedMonth,
            categories: [],
            amount: 0
        });
    }
    currentPage = 1; // Reset về trang đầu tiên khi đổi tháng
    saveToLocalStorage();
    refreshUI();
}

// B - Lưu ngân sách
function storeBudget() {
    let input = document.getElementById("budgetInput");
    let valueString = input.value;
    let numberString = "";
    for (let i = 0; i < valueString.length; i++) {
        let char = valueString[i];
        if (char >= "0" && char <= "9") {
            numberString += char;
        }
    }
    let budget = parseInt(numberString);

    if (!selectedMonth) {
        showNotification("Vui lòng chọn tháng trước!");
        return;
    }
    if (isNaN(budget) || budget <= 0) {
        showNotification("Vui lòng nhập số tiền hợp lệ!");
        return;
    }

    let monthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (monthData) {
        monthData.amount = budget;
    }

    saveToLocalStorage();
    refreshUI();
    input.value = "";
    showNotification("Ngân sách đã được lưu thành công!");
}

// D - QUẢN LÝ DANH MỤC
// D.1: Hiển thị danh mục
function displayCategories() {
    let categoryList = document.getElementById("categoryList");
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        categoryList.innerHTML = "";
        return;
    }

    categoryList.innerHTML = currentMonthData.categories.map((category, index) => `
        <li>
            <span>${category.name} - Giới hạn: ${category.budget.toLocaleString()} VND</span>
            <div class="btn-group">
                <button class="edit-btn" onclick="updateCategory(${index})">Sửa</button>
                <button class="delete-btn" onclick="removeCategory(${index})">Xóa</button>
            </div>
        </li>
    `).join("");
    displayCategoryOptions();
}

//D.2: Hiển thị tùy chọn danh mục
function displayCategoryOptions() {
    let expenseCategory = document.getElementById("expenseCategory");
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        expenseCategory.innerHTML = "<option value=''>Chọn danh mục</option>";
        return;
    }

    expenseCategory.innerHTML = "<option value=''>Chọn danh mục</option>" +
        currentMonthData.categories.map(category => `<option value='${category.id}'>${category.name}</option>`).join("");
}

// D.3: Thêm danh mục
function createCategory() {
    let categoryName = document.getElementById("categoryName").value.trim();
    let categoryLimit = parseInt(document.getElementById("categoryLimit").value.trim());
    if (!categoryName || isNaN(categoryLimit) || categoryLimit <= 0) {
        showNotification("Vui lòng nhập đầy đủ và hợp lệ!");
        return;
    }

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        showNotification("Vui lòng chọn tháng trước!");
        return;
    }

    let newId = currentMonthData.categories.length > 0
        ? Math.max(...currentMonthData.categories.map(c => c.id)) + 1
        : 1;

    currentMonthData.categories.push({ id: newId, name: categoryName, budget: categoryLimit });
    saveToLocalStorage();
    displayCategories();
    document.getElementById("categoryName").value = "";
    document.getElementById("categoryLimit").value = "";
    showNotification("Đã thêm danh mục thành công!");
}

//D4: Sửa danh mục
function updateCategory(index) {
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) return;

    let tenMoi = prompt("Nhập tên danh mục mới:", currentMonthData.categories[index].name);
    let gioiHanMoi = prompt("Nhập giới hạn mới (VND):", currentMonthData.categories[index].budget);
    if (tenMoi && gioiHanMoi) {
        let giaTriGioiHan = parseInt(gioiHanMoi);
        if (isNaN(giaTriGioiHan) || giaTriGioiHan <= 0) {
            showNotification("Giới hạn không hợp lệ!");
            return;
        }
        currentMonthData.categories[index] = {
            id: currentMonthData.categories[index].id,
            name: tenMoi.trim(),
            budget: giaTriGioiHan
        };
        saveToLocalStorage();
        displayCategories();
        showNotification("Đã sửa danh mục thành công!");
    }
}

//D5: Xóa danh mục
function removeCategory(index) {
    if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
        let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
        if (currentMonthData) {
            // Lấy category ID trước khi xóa
            const categoryId = currentMonthData.categories[index].id;

            // Xóa tất cả giao dịch liên quan đến danh mục này
            transactions = transactions.filter(t =>
                !(t.month === selectedMonth && t.categoryId === categoryId)
            );

            // Cập nhật báo cáo tháng
            let report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);
            if (report) {
                // Tính tổng chi tiêu của danh mục này
                const categoryDetails = report.details.filter(d => d.categoryId === categoryId);
                const totalCategoryAmount = categoryDetails.reduce((sum, d) => sum + d.amount, 0);

                // Cập nhật tổng chi tiêu trong báo cáo
                report.totalAmount -= totalCategoryAmount;

                // Xóa chi tiết của danh mục này
                report.details = report.details.filter(d => d.categoryId !== categoryId);
            }

            // Xóa danh mục
            currentMonthData.categories.splice(index, 1);

            saveToLocalStorage();
            displayCategories();
            refreshUI();
            showNotification("Đã xóa danh mục và các giao dịch liên quan thành công!");
        }
    }
}

// E - THÊM VÀ QUẢN LÝ GIAO DỊCH
//E1 - Thêm giao dịch 
function createExpense() {
    let rawAmount = document.getElementById("expenseAmount").value;
    let amount = parseInt(rawAmount.replace(/[^\d]/g, '')); // Lọc ra chỉ số

    let categoryId = parseInt(document.getElementById("expenseCategory").value);
    let note = document.getElementById("expenseNote").value.trim();

    if (!selectedMonth) {
        showNotification("Vui lòng chọn tháng trước!");
        return;
    }

    if (isNaN(amount) || amount <= 0 || isNaN(categoryId) || note === "") {
        showNotification("Vui lòng điền đầy đủ thông tin hợp lệ!");
        return;
    }

    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData) {
        showNotification("Không tìm thấy dữ liệu tháng hiện tại!");
        return;
    }

    if (currentMonthData.amount === 0) {
        showNotification("Vui lòng thiết lập ngân sách trước!");
        return;
    }

    // Tìm category để lấy tên
    let category = currentMonthData.categories.find(c => c.id === categoryId);
    if (!category) {
        showNotification("Danh mục không hợp lệ!");
        return;
    }

    // Lấy ID mới dựa vào giao dịch hiện có
    let newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;

    // Format date theo định dạng "YYYY-MM-DD"
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let formattedDate = `${yyyy}-${mm}-${dd}`;

    // Tạo giao dịch mới và thêm thuộc tính month
    let newTransaction = {
        id: newId,
        date: formattedDate,
        amount: amount,
        description: note,
        categoryId: categoryId,
        monthCategoryId: categoryId,
        month: selectedMonth
    };

    transactions.push(newTransaction);

    let report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);

    if (!report) {
        report = {
            userId: 1,
            month: selectedMonth,
            totalAmount: 0,
            details: []
        };
        monthlyReports.push(report);
    }

    report.details.push({
        categoryId: categoryId,
        amount: amount
    });

    report.totalAmount += amount;

    currentMonthData.amount -= amount;

    saveToLocalStorage();
    refreshUI();

    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseCategory").value = "";
    document.getElementById("expenseNote").value = "";

    showNotification("Đã thêm giao dịch thành công!");

    // Kiểm tra giới hạn danh mục sau khi thêm giao dịch
    checkCategoryLimits();
}

// E2 - Hiển thị giao dịch
function displayTransactions() {
    let transactionList = document.getElementById("transactionList");

    if (!selectedMonth) {
        transactionList.innerHTML = "<li class='no-transaction'>Vui lòng chọn tháng</li>";
        return;
    }

    // Debug: Kiểm tra giao dịch trước khi hiển thị
    console.log("Transactions before filtering:", transactions);
    console.log("Selected month:", selectedMonth);

    // Lọc các giao dịch theo tháng và từ khóa tìm kiếm
    searchKeyword = document.getElementById("searchInput").value.toLowerCase();

    // Chỉ lấy các giao dịch trong tháng đã chọn
    let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    let monthPrefix = selectedMonth.split("-")[0] + "-" + selectedMonth.split("-")[1];

    let filteredTransactions = transactions.filter(t => {
        // Ưu tiên kiểm tra thuộc tính month trước
        if (t.month === selectedMonth) return true;

        // Nếu không có month, kiểm tra date
        if (t.date && t.date.startsWith(monthPrefix)) return true;

        return false;
    });

    console.log("Filtered by month:", filteredTransactions); // check 

    // Lọc tiếp theo từ khóa tìm kiếm nếu có
    if (searchKeyword) {
        filteredTransactions = filteredTransactions.filter(t => {
            // Tìm kiếm trong description
            const descMatch = t.description && t.description.toLowerCase().includes(searchKeyword);

            // Tìm kiếm tên danh mục
            let categoryName = "";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === t.categoryId);
                if (category) categoryName = category.name.toLowerCase();
            }

            return descMatch || categoryName.includes(searchKeyword);
        });
    }

    console.log("Filtered by keyword:", filteredTransactions);

    // Sắp xếp theo số tiền
    if (sortOrder === "asc") {
        filteredTransactions.sort((a, b) => a.amount - b.amount);
    } else {
        filteredTransactions.sort((a, b) => b.amount - a.amount);
    }

    // Tính toán phân trang

    let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    if (totalPages === 0) {
        totalPages = 1; // Đảm bảo luôn có ít nhất 1 trang
    }

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredTransactions.length);
    const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

    console.log("111:", paginatedTransactions);

    // Hiển thị giao dịch
    if (paginatedTransactions.length === 0) {
        transactionList.innerHTML = "<li class='no-transaction'>Không có giao dịch nào</li>";
    } else {
        let html = "";

        paginatedTransactions.forEach(expense => {
            // Tìm tên danh mục từ ID
            let categoryName = "Không xác định";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === expense.categoryId);
                if (category) categoryName = category.name;
            }

            html += `
                <li>
                    <span>${categoryName} - ${expense.description}: ${expense.amount.toLocaleString()} VND</span>
                    <button class='delete-btn' onclick='removeExpense(${expense.id})'>Xóa</button>
                </li>
            `;
        });

        transactionList.innerHTML = html;
    }

    // Cập nhật nút phân trang
    updatePagination(totalPages);
}

// Cập nhật nút phân trang
function updatePagination(totalPages) {
    const pagination = document.querySelector(".pagination");


    let paginationHTML = `
        <button class="btn2" onclick="previousPage()" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
    `;
    const maxPage = totalPages;
    for (let i = 1; i <= maxPage; i++) {
        paginationHTML += `<button onclick="goToPage(${i})" ${currentPage === i ? 'class="active"' : ''}>${i}</button>`;
    }

    paginationHTML += `
        <button class="btn2" onclick="nextPage()" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;


    pagination.innerHTML = paginationHTML;
}

//E3 - Xóa giao dịch
function removeExpense(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "Bạn có chắc muốn xóa giao dịch này ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, hãy xóa nó !"
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        // === Bắt đầu xóa khi người dùng xác nhận ===

        let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
        if (!currentMonthData) return;

        let expense = transactions.find(t => t.id === id);
        if (!expense) return;

        // Xóa giao dịch
        transactions = transactions.filter(t => t.id !== id);

        // Cập nhật báo cáo tháng
        let report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);
        if (report) {
            report.details = report.details.filter(d =>
                !(d.categoryId === expense.categoryId && d.amount === expense.amount)
            );
            report.totalAmount -= expense.amount;
        }

        // Cập nhật số dư
        currentMonthData.amount += expense.amount;

        saveToLocalStorage();
        refreshUI();
        showNotification("Đã xóa giao dịch thành công!");

        // Thông báo thành công bằng SweetAlert
        Swal.fire({
            title: "Deleted !",
            text: "Giao dịch đã được xóa.",
            icon: "success"
        });
    });
}

//E4 - Tìm kiếm giao dịch
function filterTransactions() {
    currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
    displayTransactions();
}

//E5 - Sắp xếp giao dịch
function sortTransactionsByAmount() {
    sortOrder = sortOrder === "asc" ? "desc" : "asc";
    document.getElementById("sortBtn").textContent = sortOrder === "asc" ? "Sắp xếp theo giá ↑" : "Sắp xếp theo giá ↓";
    displayTransactions();
}

// Phân trang - ĐÃ SỬA
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTransactions();
    }
}

function nextPage() {
    // Tính tổng số trang dựa trên số giao dịch đã lọc
    let filteredTransactions = transactions.filter(t => {
        if (t.month === selectedMonth) return true;

        let monthPrefix = selectedMonth.split("-")[0] + "-" + selectedMonth.split("-")[1];
        return t.date && t.date.startsWith(monthPrefix);
    });

    if (searchKeyword) {
        let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
        filteredTransactions = filteredTransactions.filter(t => {
            const descMatch = t.description && t.description.toLowerCase().includes(searchKeyword);

            let categoryName = "";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === t.categoryId);
                if (category) categoryName = category.name.toLowerCase();
            }

            return descMatch || categoryName.includes(searchKeyword);
        });
    }

    let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;

    if (currentPage < totalPages) {
        currentPage++;
        displayTransactions();
    }
}

function goToPage(page) {
    // Tính tổng số trang như trong nextPage()
    let filteredTransactions = transactions.filter(t => {
        if (t.month === selectedMonth) return true;

        let monthPrefix = selectedMonth.split("-")[0] + "-" + selectedMonth.split("-")[1];
        return t.date && t.date.startsWith(monthPrefix);
    });

    if (searchKeyword) {
        let currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
        filteredTransactions = filteredTransactions.filter(t => {
            const descMatch = t.description && t.description.toLowerCase().includes(searchKeyword);

            let categoryName = "";
            if (currentMonthData) {
                const category = currentMonthData.categories.find(c => c.id === t.categoryId);
                if (category) categoryName = category.name.toLowerCase();
            }

            return descMatch || categoryName.includes(searchKeyword);
        });
    }

    let totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    if (totalPages === 0) totalPages = 1;

    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayTransactions();
    }
}

// Kiểm tra giới hạn danh mục và hiển thị cảnh báo
function checkCategoryLimits() {
    const tb = document.getElementById("thongbao");
    tb.style.display = "none";

    if (!selectedMonth) return;

    const currentMonthData = monthlyCategories.find(m => m.month === selectedMonth);
    if (!currentMonthData || !currentMonthData.categories.length) return;

    const report = monthlyReports.find(r => r.month === selectedMonth && r.userId === 1);
    if (!report) return;


    // Tính tổng chi tiêu cho mỗi danh mục
    for (let i = 0; i < currentMonthData.categories.length; i++) {
        const category = currentMonthData.categories[i];
        let categoryExpenses = 0;

        report.details.forEach(detail => {
            if (detail.categoryId === category.id) {
                categoryExpenses += detail.amount;
            }
        });

        if (categoryExpenses > category.budget) {
            tb.innerHTML = `Danh mục "${category.name}" đã vượt giới hạn: ${categoryExpenses.toLocaleString()} / ${category.budget.toLocaleString()} VND`;
            tb.style.display = "block";
            tb.style.color = "red";
            return; // Hiển thị cảnh báo đầu tiên tìm thấy
        }
    }
}

// F - Hiển thị thống kê
function displayStats() {
    let statsBody = document.getElementById("statsBody");
    statsBody.innerHTML = monthlyCategories.map(data => {
        let report = monthlyReports.find(r => r.month === data.month && r.userId === 1);
        let totalExpenses = report ? report.totalAmount : 0;

        // Ngân sách ban đầu: Lấy tổng số tiền hiện tại + tổng chi tiêu
        let initialBudget = data.amount + totalExpenses;

        return `
            <tr>
                <td>${data.month}</td>
                <td>${totalExpenses.toLocaleString()} VND</td>
                <td>${initialBudget.toLocaleString()} VND</td>
                <td class="${data.amount >= 0 ? 'status-ok' : 'status-over'}">
                    ${data.amount >= 0 ? 'Đạt ✅' : 'Không đạt ❌'}
                </td>
            </tr>
        `;
    }).join("");
}

// Đăng xuất
function logout() {
    Swal.fire({
        title: "Bạn có chắc muốn thoát?",
        text: "Bạn sẽ không thể hoàn tác điều này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Vâng, tôi muốn thoát!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Đã thoát account thành công!!",
                text: "Tài khoản của bạn đã được đăng xuất",
                icon: "success",
            }).then(() => {
                window.location.href = "login.html";
            });
        }
        document.getElementById("account").value = "user";
    });
}




// Reset dữ liệu (để kiểm tra)
function resetData() {
    if (confirm("Bạn có chắc muốn xóa tất cả dữ liệu không?")) {
        localStorage.removeItem("monthlyCategories");
        localStorage.removeItem("transactions");
        localStorage.removeItem("monthlyReports");
        localStorage.removeItem("selectedMonth");

        // Khởi tạo lại các biến
        monthlyCategories = [];
        transactions = [];
        monthlyReports = [];
        selectedMonth = "";

        // Reset UI
        document.getElementById("monthInput").value = "";
        document.getElementById("remainingAmount").textContent = "0 VND";

        location.reload(); // Tải lại trang
        showNotification("Đã xóa tất cả dữ liệu thành công!");
    }
}

// Hiển thị thông báo snackbar 
function showNotification(message) {
    let snackbar = document.getElementById("snackbar");
    snackbar.textContent = message;
    snackbar.className = "show";
    setTimeout(() => snackbar.className = snackbar.className.replace("show", ""), 3000);
}