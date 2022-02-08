const db = firebase.firestore();
let userTableBody = document.getElementById('userTableBody');
db.collection("bills").orderBy('balance').orderBy('billNo').where("balance", "!=", 0)
    .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach((doc) => {
            let obj = {
                data: doc.data(),
                id: doc.id
            }
            users.push(obj);
        });
        renderTable(users);
    });
