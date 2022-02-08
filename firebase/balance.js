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

const renderTable = (users) => {
    userTableBody.innerHTML = ''
    console.log(users);
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