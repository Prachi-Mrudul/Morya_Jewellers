function signIn() {
    document.getElementById('status').innerHTML = "";
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            document.getElementById('status').classList.add('success-text')
            document.getElementById('status').innerHTML = "Signing You In";
            setTimeout(() => {
                window.location.href = "/billing/"
            }, 2000);
        })
        .catch((error) => {
            document.getElementById('status').classList.add('success-text')
            document.getElementById('status').innerHTML = error.message;
        });
}
function signOut() {
    firebase.auth().signOut().then(() => {
       window.alert("Logged Out Successfully")
    }).catch((error) => {
        console.log(error.message);
    });
}