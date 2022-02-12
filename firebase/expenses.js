let amount = document.getElementById('amount');
let item = document.getElementById('item');
let name = document.getElementById('name');
let date = document.getElementById('date');
// let userTableBody = document.getElementById('userTableBody');
let dateInp = document.getElementById('dateInp');
let totalExpenses = document.getElementById('totalExpenses');
function getDate() {
    let newDate = new Date();
    let date, month;
    if (newDate.getDate() <= 9) {
        date = `0${newDate.getDate()}`
    }else{
        date = newDate.getDate()
    }
    if (newDate.getMonth() <= 9) {
        month = `0${newDate.getMonth()+1}`
    }else{
        month = newDate.getMonth()+1
    }
    let dateString = `${newDate.getFullYear()}-${month}-${date}`;
    return dateString;
}
let todayDate = getDate();
dateInp.value = todayDate;
function addExpensesData(){
    db.collection('expenses').doc().set({
        item: item.value,
        name: name.value,
        date: date.value,
        amount: Number(amount.value)
    })
    .then(function(){
        window.alert('Data Saved')
    })
    .catch(function(err){
        window.alert(err.message);
    })
}
const db = firebase.firestore();
let userTableBody = document.getElementById('userTableBody');
db.collection("expenses").where("date", "==", todayDate)
    .onSnapshot((querySnapshot) => {
        var users = [];
        let expensesAmount = 0;
        querySnapshot.forEach((doc) => {
            expensesAmount += doc.data().amount
            let obj = {
                data: doc.data(),
                id: doc.id
            }
            users.push(obj);
        });
        renderExpensesTable(users);
        totalExpenses.innerHTML = expensesAmount;
    });

function renderExpensesTable(users){
    userTableBody.innerHTML = '';
    users.forEach(user => {
        userTableBody.innerHTML += `
        <tr>
            <td>${user.data.date}</td>
            <td>${user.data.item}</td>
            <td>${user.data.name}</td>
            <td>${user.data.amount}</td>
        </tr>
    ` 
    });
}
function fetchData(){
    todayDate = dateInp.value;
    db.collection("expenses").where("date", "==", todayDate)
    .onSnapshot((querySnapshot) => {
        let expensesAmount = 0;
        var users = [];
        querySnapshot.forEach((doc) => {
            let obj = {
                data: doc.data(),
                id: doc.id
            }
            users.push(obj);
            expensesAmount += doc.data().amount
        });
        renderExpensesTable(users);
    });
    totalExpenses.innerHTML = expensesAmount;
}