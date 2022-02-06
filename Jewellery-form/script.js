let tBody = document.getElementById('tBody');
let table = document.getElementById('table');
let inpForm = document.getElementById('inpForm');
let inp_form = document.querySelector('.inpForm');
let customerName = document.getElementById('customerName');
let customerMob = document.getElementById('customerMob');
let customerAdd = document.getElementById('customerAdd');
let priceInput = document.getElementById('priceInput');
let priceBtn = document.getElementById('priceBtn');
let evaluate_btn = document.getElementById('evaluate-btn');
let overlay = document.getElementById('overlay');
let itemTotal = document.getElementById('itemTotal');
let gst = document.getElementById('gst');
let discount = document.getElementById('discount');
let discountedAmount = document.getElementById('discountedAmount');
let grandTotal = document.getElementById('grandTotal');
let paid = document.getElementById('paid');
let balance = document.getElementById('balance');
let goldPrice = 0;
let goldPriceGm = 0;
let silverPrice = 0;
let silverPriceGm = 0;
function getPrice(){
    try {
        let localItems = JSON.parse(window.localStorage.getItem('gold_silver_price'));
        let gold_price = document.getElementById('gold_price');
        let silver_price = document.getElementById('silver_price');
        gold_price.value = Number(localItems.gold_price);
        silver_price.value = Number(localItems.silver_price);
        goldPrice = Number(localItems.gold_price);
        silverPrice = Number(localItems.silver_price);
        goldPriceGm = goldPrice/10;
        silverPriceGm = silverPrice/1000;
    } catch (error) {
        console.log("Error Fetching Items");
    }
}
getPrice()
function addElem(elem) {
    let row = elem.parentNode.parentNode;
    let tableItem = row.children[1].children[0].value
    let tablePurity = row.children[2].children[0].value
    let tableWtGm = row.children[3].children[0].value
    let tableWtMg = row.children[4].children[0].value
    let tableAmount = row.children[5].children[0].value
    let tableMakingCharges = row.children[6].children[0].value
    tBody.innerHTML += `
    <tr>
        <td>${table.rows.length}</td>
        <td class="items">${tableItem}</td>
        <td>${tablePurity}</td>
        <td>${tableWtGm}</td>
        <td>${tableWtMg}</td>
        <td>${tableAmount}</td>
        <td class="w-200">${tableMakingCharges}</td>
        <td class="w-200">0</td>
    </tr>
    `
    inpForm.reset();
    trsget()
}
function eventHandle(e, tr) {
    if (e.key === 'Delete' && tr.style.backgroundColor === "lightblue") {
        tr.remove();
        document.removeEventListener('keyup', () => { eventHandle })
    }
}
trsget()
function trsget() {
    let trs = tBody.querySelectorAll('tr');
    trs.forEach(tr => {
        tr.addEventListener('click', (e) => {
            let item = e.target.parentNode;
            e.target.parentNode.style.backgroundColor = "lightblue";
            document.addEventListener('keyup', function(eventT){
                eventHandle(eventT, item)
            })
            e.target.parentNode.addEventListener('click', function(eDash){
                eDash.target.parentNode.style.backgroundColor = "white"
                document.removeEventListener('keyup', () => { eventHandle })
                trsget();
            })
        });
    })
}
function evaluateTable() {
    getPrice();
    let rows = table.rows;
    console.log(rows);
    let sum = 0;
    for (let i = 1; i < rows.length; i++) {
        console.log(rows[i]);
        let weight = Number(rows[i].children[3].innerHTML) + (Number(rows[i].children[4].innerHTML) / 10)
        let amount = weight*goldPriceGm;
        rows[i].children[5].innerHTML = amount;
        let finalAmount = amount + Number(rows[i].children[6].innerHTML)
        rows[i].children[7].innerHTML = finalAmount;
    }
    for (let j = 1; j < rows.length; j++) {
        sum = sum + Number(rows[j].children[7].innerHTML)
    }
    itemTotal.value = sum;
    discountedAmount.value = sum - (sum*(discount.value/100))
    grandTotal.innerHTML = discountedAmount.value - (discountedAmount.value*(gst.value/100));
    balance.value = Number(grandTotal.innerHTML) - paid.value
}

let flag1 = false
function togglePrice(){
    if (!flag1) {
        overlay.style.display = "block";
        priceInput.style.display = "block";
        flag1 = true;
    } else {
        overlay.style.display = "none";
        priceInput.style.display = "none";
        flag1 = false;
    }
}

window.addEventListener('beforeprint', () => {
    inp_form.style.display = "none";
    evaluate_btn.style.display = "none";
    priceBtn.style.display = "none"
})
window.addEventListener('afterprint', () => {
    inp_form.style.display = "";
    evaluate_btn.style.display = "";
    priceBtn.style.display = ""
})
function savePrice(){
    let gold_price = document.getElementById('gold_price');
    let silver_price = document.getElementById('silver_price');
    let obj = {
        gold_price: gold_price.value,
        silver_price: silver_price.value
    }
    window.localStorage.setItem('gold_silver_price', JSON.stringify(obj));
    togglePrice();
}
setInterval(() => {
    let dateString = getDate();
    datePara.innerHTML = `Date: ${dateString}`
}, 1000);
function getDate(){
    let newDate = new Date();
    let date, month;
    if (newDate.getDate() <= 9) {
        date = `0${newDate.getDate()}`
    }
    if (newDate.getMonth() <= 9) {
        month = `0${newDate.getMonth()}`
    }
    let dateString = `${date}-${month}-${newDate.getFullYear()}`
    return dateString;
}