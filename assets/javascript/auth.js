window.onload=(function() {
  console.log("auth.js function called");
  var UserID;
  var loggedInAs;  

  const txtDispName=document.getElementById('txtDispName')
  const txtEmail=document.getElementById('txtEmail');
  const txtPassword=document.getElementById('txtPassword');
  const btnLogin=document.getElementById('btnLogin');
  const btnSignUp=document.getElementById('btnSignUp');
  const btnLogout=document.getElementById('btnLogout');
  const nbBtnLogin=document.getElementById('nbBtnLogin');
  const nbBtnLogout=document.getElementById('nbBtnLogout');
  const nbBtnSignUp=document.getElementById('nbBtnSignUp');

  // open login modal
  nbBtnLogin.addEventListener('click', e=> {
    console.log("login button clicked");
    modal.style.display = "block";    
  })

    // open sign-up modal
  nbBtnSignUp.addEventListener('click', e=> {
    console.log("Sign Up button clicked");
    modalSignUp.style.display = "block";
  });

  // add login event
  btnLogin.addEventListener('click', e=> {
    // get email and password
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e=> console.log(e.message));
    promise.catch(e=> alert(e.message));
    modal.style.display = "none";
  });

  btnSignUp.addEventListener('click',e=> {
    // get email and password
    // TODO: check for real email
    const dispName = txtDispName.value;
    const email = txtEmail2.value;
    const pass = txtPassword2.value;
    const auth = firebase.auth();
    modalSignUp.style.display = "none";    
    console.log(dispName);
    // sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass).then(function(user){
      console.log("user created ", user);
        // [END createwithemail]
        // callSomeFunction(); Optional
        // var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: dispName
        }).then(function() {
            // Update successful.
            $("#loggedInAs").html("Logged in as: " + user.displayName + "   ");
        }, function(error) {
            // An error happened.
        });        
    }, function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            console.error(error);
            alert(error);
        }     
        // [END_EXCLUDE]
    })
  });

  // btnLogout.addEventListener('click',e=> {
  //   console.log("btnLogout clicked");
  //   $("#loggedInAs").html("");
  //   firebase.auth().signOut();
  // });

  nbBtnLogout.addEventListener('click',e=> {
    console.log("btnLogout clicked");
    $("#loggedInAs").html("");
    firebase.auth().signOut();
  });

  // add real time listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      sessionStorage.setItem("UniqueID",firebaseUser.uid);
      console.log("Unique Id: " + sessionStorage.getItem("UniqueID"));
      var favorite=database.ref("/userSpots/"+ sessionStorage.getItem("UniqueID")+"/");
      console.log(favorite);
      // btnLogout.classList.remove('hide');
      nbBtnLogout.classList.remove('hide');
      nbBtnLogin.classList.add('hide');
      nbBtnSignUp.classList.add('hide');
      console.log(firebaseUser.hasOwnProperty('displayName'), firebaseUser.displayName);
      if(firebaseUser.displayName === undefined || firebaseUser.displayName === null) {
        return;
      } else {
        $("#loggedInAs").html("Logged in as: " + firebaseUser.displayName + "   ");
      }
    } else {
      console.log('not logged in'); 
      nbBtnLogout.classList.add('hide');
      nbBtnLogin.classList.remove('hide');
      nbBtnSignUp.classList.remove('hide');  
    }
  });
 });


// FOR TESTING -- CAN BE DELETED ONCE LIVE -- IT IS OUTSIDE THE MAIN FUNCTION 
  btnPrintUser.addEventListener('click',e=> {
  var user = firebase.auth().currentUser;
  if (user != null) {
      user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: "+profile.providerId);
      console.log("  Provider-specific UID: "+profile.uid);
      console.log("  Name: "+profile.displayName);
      console.log("  Email: "+profile.email);
      console.log("  Photo URL: "+profile.photoURL);
      console.log("  uid: "+profile.uid);
      console.log (profile);
    });
  }
});
