function signIn() {
    document.getElementById('errorText').innerHTML = "";
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            setTimeout(() => {
                window.location.href = "/billing/"
            }, 2000);
        })
        .catch((error) => {
            document.getElementById('errorText').innerHTML = error.message;
        });
}
function signOut() {
    firebase.auth().signOut().then(() => {
       window.alert("Logged Out Successfully")
    }).catch((error) => {
        console.log(error.message);
    });
}