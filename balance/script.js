let search = document.getElementById('search');
let items;

search.addEventListener('input', (e) => {
    items = userTableBody.querySelectorAll('tr')
    let searchQuery = e.target.value.toLowerCase();
    items.forEach(item => {
        let billNo = item.children[0].innerText.toLowerCase()
        let name = item.children[2].innerText.toLowerCase()
        let flag = billNo.includes(searchQuery) || name.includes(searchQuery);
        if (flag) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
})
function handleUpdate(name){
    window.localStorage.setItem('currentCustomer', name);
    setTimeout(() => {
        window.location.href = '/billing/?update=true';
    }, 1000);
}