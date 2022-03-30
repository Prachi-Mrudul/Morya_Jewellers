firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User")
    } else {
        let url = window.location.pathname;
        if (url != "/") {
            window.location.pathname = "/"
        }else{
            window.alert("Sign In First")
        }
    }
});