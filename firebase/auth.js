function signIn() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log(user);
            setTimeout(() => {
                window.location.href = "/Jewellery-form/"
            }, 2000);
        })
        .catch((error) => {
            console.log(error.message);
        });
}
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
    } else {
        if (!window.location.href.includes("authentication")) {
            document.querySelector('body').innerHTML = '';
            window.location.href = "/authentication/"            
        }
        else{
            return;
        }
    }
});

function signOut() {
    firebase.auth().signOut().then(() => {
       console.log("signout Successfully");
    }).catch((error) => {
        console.log(error.message);
    });
}