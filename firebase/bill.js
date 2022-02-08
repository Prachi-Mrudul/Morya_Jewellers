const db = firebase.firestore();
let billNumber = document.getElementById('billNumber');
let bill_Number;
db.collection("bills").doc("Bill_Number")
    .onSnapshot((doc) => {
        bill_Number = doc.data().billNo
        handleBillNo(doc.data())
    });
function handleBillNo(data) {
    billNumber.innerHTML = data.billNo + 1;
}
function saveData() {
    evaluateTable();
    let objArr = []
    let rows = table.rows;
    let total = Number(itemTotal.value);
    let discountPercentage = Number(discount.value);
    let discountedTotalAmount = Number(discountedAmount.value);
    let gstPercentage = Number(gst.value);
    let grand_Total = Number(grandTotal.innerHTML);
    for (let i = 1; i < rows.length; i++) {
        let item = rows[i].children[1].innerHTML;
        let purity = rows[i].children[2].innerHTML;
        let weightGm = Number(rows[i].children[3].innerHTML);
        let weightMg = Number(rows[i].children[4].innerHTML);
        let rate = Number(rows[i].children[5].innerHTML);
        let makingCharges = Number(rows[i].children[6].innerHTML);
        let itemsTotal = Number(rows[i].children[7].innerHTML);
        let obj = {
            item: item,
            purity: purity,
            weightGm: weightGm,
            weightMg: weightMg,
            rate: rate,
            makingCharges: makingCharges,
            itemsTotal: itemsTotal,
        }
        objArr.push(obj)
    }
    let finalObj = {
        name: customerName.value,
        mobileNo: customerMob.value,
        address: customerAdd.value,
        total: total,
        discountPercentage: discountPercentage,
        discountedTotalAmount: discountedTotalAmount,
        gstPercentage: gstPercentage,
        grandTotal: grand_Total,
        items: objArr,
        date: document.getElementById("datePara").innerHTML,
        billNo: bill_Number + 1,
        paid: paid.value,
        balance: Number(balance.value)
    }
    db.collection('bills').add(finalObj)
        .then(function (doc) {
            db.collection("bills").doc("Bill_Number").set({
                billNo: bill_Number + 1
            })
        })
        .catch(function (err) {
            console.log(err.message);
        })
}