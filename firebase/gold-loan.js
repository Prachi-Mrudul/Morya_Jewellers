let name = document.getElementById('name');
let dateInp = document.getElementById('dateInp');
let date = document.getElementById('date');
let jewellers = document.getElementById('jewellers');
let number = document.getElementById('number');
let amount = document.getElementById('amount');
let weight = document.getElementById('weight');
let installment = document.getElementById('installment');
let paid = document.getElementById('paid');
let balance = document.getElementById('balance');
let form = document.getElementById('form');
const db = firebase.firestore();
const addData = () => {
    let queryString = window.location.search;
    let urlParam = new URLSearchParams(queryString);
    let update = Boolean(urlParam.get('update'));
    console.log(update)
    let obj = {
        name: name.value,
        date: date.value,
        jewellers: jewellers.value,
        number: number.value,
        amount: Number(amount.value),
        weight: Number(weight.value),
        installment: installment.value,
        paid: Number(paid.value),
        balance: Number(balance.value),
    }
    if (!update) {
        db.collection('gold_loan').add(obj)
            .then(function () {
                window.alert('Data Saved');
                form.reset();
            })
            .catch(function () {
                window.alert('Something Went Wrong')
            })
    }else{
        delete obj.date;
        db.collection('gold_loan').doc(window.localStorage.getItem('gold_loan')).update(obj)
            .then(function () {
                window.alert('Data Updated');
               form.reset()
                history.pushState('', document.title, window.location.pathname);
            })
            .catch(function () {
                window.alert('Something Went Wrong')
            })
    }
}
dateInp.value = getDate();

db.collection("gold_loan").where("date", "==", dateInp.value)
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
        renderLoanTable(users)
    });

function fetchData() {
    db.collection("gold_loan").where("date", "==", dateInp.value)
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
            renderLoanTable(users)
        });


}
function getDate() {
    let newDate = new Date();
    let date, month;
    if (newDate.getDate() <= 9) {
        date = `0${newDate.getDate()}`
    } else {
        date = newDate.getDate()
    }
    if (newDate.getMonth() <= 9) {
        month = `0${newDate.getMonth() + 1}`
    } else {
        month = newDate.getMonth() + 1
    }
    let dateString = `${newDate.getFullYear()}-${month}-${date}`;
    return dateString;
}

function renderLoanTable(users) {
    userTableBody.innerHTML = '';
    users.forEach(user => {
        let { id, data } = user
        userTableBody.innerHTML += `
        <tr name="${id}" onclick="renderForm('${id}')">
            <td>${data.name}</td>
            <td>${data.date}</td>
            <td>${data.jewellers}</td>
            <td>${data.number}</td>
            <td>${data.amount}</td>
            <td>${data.weight}</td>
            <td>${data.installment}</td>
            <td>${data.paid}</td>
            <td>${data.balance}</td>
        </tr>`
    });
}

function renderForm(data) {
    history.pushState({ page: 1 }, "title 1", `?update=${true}`);
    window.localStorage.setItem('gold_loan', data)
    console.log("data")
    db.collection('gold_loan').doc(localStorage.getItem('gold_loan')).get()
        .then(function (doc) {
            name.value = doc.data().name;
            date.value = doc.data().date;
            jewellers.value = doc.data().jewellers;
            number.value = doc.data().number;
            amount.value = doc.data().amount;
            weight.value = doc.data().weight;
            installment.value = doc.data().installment;
            paid.value = doc.data().paid;
            balance.value = doc.data().balance;
        })
        .catch(function (err) {
            window.alert('Error Getting Document')
        })
}