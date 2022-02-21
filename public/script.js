let user = await firebase.auth().currentUser;
if (user === null) {
    window.location.href = "/";
} else {
    return;
}