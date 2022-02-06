const db = firebase.firestore();
function saveData(){
    let objArr = []
    let rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        let item = rows[i].children[1].innerHTML;
        let purity = rows[i].children[2].innerHTML;
        let weightGm = Number(rows[i].children[3].innerHTML);
        let weightMg = Number(rows[i].children[4].innerHTML);
        let rate = Number(rows[i].children[5].innerHTML);
        let makingCharges = Number(rows[i].children[6].innerHTML);
        let itemsTotal = Number(rows[i].children[7].innerHTML);
        let total = Number(itemTotal.value);
        let discountPercentage = Number(discount.value);
        let discountedTotalAmount = Number(discountedAmount.value);
        let gstPercentage = Number(gst.value);
        let grand_Total = Number(grandTotal.innerHTML);
        let obj = {
            item: item,
            purity: purity,
            weightGm: weightGm,
            weightMg: weightMg,
            rate: rate,
            makingCharges: makingCharges,
            itemsTotal: itemsTotal,
            total: total,
            discountPercentage: discountPercentage,
            discountedTotalAmount: discountedTotalAmount,
            gstPercentage: gstPercentage,
            grandTotal: grand_Total
        }
        console.log(obj);
        objArr.push(obj)
    }
    let finalObj = {
        name: customerName.value,
        mobileNo: customerMob.value,
        address: customerAdd.value,
        items: objArr,
        date: document.getElementById("datePara").innerHTML,
        billNo: 1,
        paid: paid.value,
        balance: balance.value
    }
    console.log(finalObj);
    db.collection('bills').doc(`${getDate()}`).collection('users').add(finalObj)
    .then(function(doc){
        if (balance.value != 0) {
            db.collection('pending').add(finalObj)
            .then(function(docref){
                console.log(docref);
            })
            .catch(function(err){
                console.log(err.message);
            })
        }
    })
    .catch(function(err){
        console.log(err.message);
    })
}