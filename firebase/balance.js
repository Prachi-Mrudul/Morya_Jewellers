const db = firebase.firestore();
let userTableBody = document.getElementById('userTableBody');
db.collection("bills").where("balance", "!=", 0)
    .onSnapshot((querySnapshot) => {
        var users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        renderTable(users);
    });

const renderTable = (users) => {
    users.forEach(user => {
        userTableBody.innerHTML = `
        <tr>
            <td>${user.billNo}</td>
            <td>${user.date}</td>
            <td>${user.name}</td>
            <td>${user.total}</td>
            <td>${user.balance}</td>
        </tr>`
    });
} 