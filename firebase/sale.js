const db = firebase.firestore();
let totalSale = document.getElementById('totalSale');
let paymentRecieved = document.getElementById('paymentRecieved');
function dateFilter(){
    let users = []
    let sale = 0;
    let received = 0;
    let dateInp = document.getElementById('dateInp');
    db.collection("bills").where("date", "==", dateInp.value)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            sale += doc.data().total;
            received += doc.data().paid;
            totalSale.innerHTML = sale;
            paymentRecieved.innerHTML = received
            let obj = {
                data: doc.data(),
                id: doc.id
            }
            users.push(obj);
        });
        renderTable(users);
    })
    .catch((error) => {
        window.alert("Error getting document");
    });
}

function billNoFilter(){
    let users = []
    let billNoInp = document.getElementById('billNoInp');
    db.collection("bills").where("billNo", "==", billNoInp.value)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let obj = {
                data: doc.data(),
                id: doc.id
            }
            users.push(obj);
        });
        renderTable(users);
    })
    .catch((error) => {
        window.alert("Error getting documents");
    });
}