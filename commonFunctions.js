const renderTable = (users) => {
    userTableBody.innerHTML = ''
    users.forEach(user => {
        userTableBody.innerHTML += `
        <tr name="${user.id}" onclick="handleUpdate('${user.id}')">
            <td>${user.data.billNo}</td>
            <td>${user.data.date}</td>
            <td>${user.data.name}</td>
            <td>${user.data.total}</td>
            <td>${user.data.paid}</td>
            <td>${user.data.balance}</td>
        </tr>`
    });
}
function getDate() {
    let newDate = new Date();
    let date, month;
    if (newDate.getDate() <= 9) {
        date = `0${newDate.getDate()}`
    }
    if (newDate.getMonth() <= 9) {
        month = `0${newDate.getMonth()+1}`
    }
    let dateString = `${newDate.getFullYear()}-${month}-${date}`
    return dateString;
}

try {
    let search = document.getElementById('search');
    let items;
    search.addEventListener('input', (e) => {
        items = userTableBody.querySelectorAll('tr')
        let searchQuery = e.target.value.toLowerCase();
        items.forEach(item => {
            let query1 = item.children[0].innerText.toLowerCase()
            let query2 = item.children[1].innerText.toLowerCase()
            let query3 = item.children[2].innerText.toLowerCase()
            let flag = query1.includes(searchQuery) || query2.includes(searchQuery) || query3.includes(searchQuery);
            if (flag) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    })
} catch (error) {
    if (window.location.href.includes('billing')) {
        return;
    }else{
        window.alert(error.message);
    }
}
function handleUpdate(name) {
    window.localStorage.setItem('currentCustomer', name);
    setTimeout(() => {
        window.location.href = '/billing/?update=true';
    }, 1000);
}