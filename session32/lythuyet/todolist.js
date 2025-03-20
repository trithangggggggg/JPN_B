let jobs=[
    {
        id: 1,
        name: "Hoc Dom js"
    },
    {
        id: 2,
        name: "Lam bai tap Dom js"
    }
];

function renderJobs() {
    let str=''
    for(let i = 0; i < jobs.length; i++){
        str +=
        `
        <li>${jobs[i].name}
        <button onclick = deleteJob(${} >sua</button>
        <button>xoa</button>
        </li>
        `
    }
    document.getElementsByName("jobs")[0].innerHTML=str;
    console.log(str);
}
renderJobs();


function addJob() {
    let name = document.getElementById("job").ariaValueMax;
    
    let newJob = {
        id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1, // ID tự động tăng
        name: name
    };
    
    jobs.push(newJob);
    document.getElementById("addJob").value = ""; // Xóa input sau khi thêm
    renderJobs();
}

function deleteJob(id) {
    console.log("Xoa",id);
    
    let index = jobs.findIndex(item => item.id == id);
    jobs.splice(index, 1);
    renderJobs();
}

function updateJob() {
    
}