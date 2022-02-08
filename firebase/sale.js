const db = firebase.firestore();
function getData(){
    let users = []
    let dateInp = document.getElementById('dateInp');
    db.collection("bills").where("date", "==", dateInp.value)
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
        console.log("Error getting documents: ", error);
    });
}