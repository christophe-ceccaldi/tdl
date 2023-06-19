/*// attente du chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
    // création des variables
    // récupération pour l'inscription
    const section_insc = document.querySelector("#inscription");
    let form_insc = section_insc.querySelector("form");
    let login_insc = form_insc.querySelector(".login");
    let password_insc = form_insc.querySelector(".password");
    let password2 = form_insc.querySelector("#password2");
    const btnInsc = document.querySelector("#btnInsc");
    const switchConn = document.querySelector("#switchConn");
  
    // récupération pour la connexion
    const section_conn = document.querySelector("#connexion");
    let form_conn = section_conn.querySelector("form");
    let login_conn = form_conn.querySelector(".login");
    let password_conn = form_conn.querySelector(".password");
    const btnConn = document.querySelector("#btnConn");
    const switchInsc = document.querySelector("#switchInsc");
  
    // autres
    let validation = false;
  
    // fonctions de display
    // affichage de la section connexion
    function displayConn() {
      section_insc.style.display = "none";
      section_conn.style.display = "flex";
    }
    // affichage de la section inscription
    function displayInsc() {
      section_insc.style.display = "flex";
      section_conn.style.display = "none";
    }
  
    // affichage de la section inscription par défaut
    displayInsc();
  
    // fonction du switch de formulaire
    // switch vers la connexion
    $(switchConn).click(function () {
      // animation
      $(section_insc).hide(1000);
      setTimeout(function () {
        $(section_conn).show(1000);
      }, 500);
    });
    // switch vers l'inscription
    $(switchInsc).click(function () {
      // animation
      $(section_conn).hide(1000);
      setTimeout(function () {
        $(section_insc).show(1000);
      }, 500);
    });
  
    //////////////////////////////////////////////////
    // Function for inscription                ///////
    //////////////////////////////////////////////////
    // Verif login
    function verifLogin() {
      let loginValue = login_insc.value;
      // verif s'il y a un login
      if (loginValue === "") {
        login_insc.nextElementSibling.innerHTML = "Veuillez rentrer un login";
        // change border color and background
        login_insc.style.borderColor = "red";
        login_insc.style.backgroundColor = "#ff000033";
  
        validation = false;
      } else {
        login_insc.nextElementSibling.innerHTML = "";
        // change border color to default
        login_insc.style.borderColor = "initial";
        login_insc.style.backgroundColor = "#fafafa";
        // verif que le login est disponible
        let dataLogin = new FormData();
        dataLogin.append("verifLogin", loginValue);
        //   console.log(dataLogin);
        fetch("verif.php", {
          method: "POST",
          body: dataLogin,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            //   console.log(response);
            if (response === "indispo") {
              login_insc.nextElementSibling.innerHTML = "Ce login est déjà pris";
              // change border color and background
              login_insc.style.borderColor = "red";
              login_insc.style.backgroundColor = "#ff000033";
  
              validation = false;
            } else if (response === "dispo") {
              login_insc.nextElementSibling.innerHTML = "";
              // change border color and background
              login_insc.style.borderColor = "green";
              login_insc.style.backgroundColor = "#fafafa";
              // suppression de la clé
              dataLogin.delete("verifLogin");
              validation = true;
            }
          })
          .catch((error) => console.log(error));
      }
    }
  
    // Verif password
    function verifPassword() {
      let passwordValue = password_insc.value;
  
      // verif s'il y a un password
      if (passwordValue === "") {
        password_insc.nextElementSibling.innerHTML =
          "Veuillez rentrer un mot de passe";
        // change border color and background
        password_insc.style.borderColor = "red";
        password_insc.style.backgroundColor = "#ff000033";
        validation = false;
      } else {
        password_insc.nextElementSibling.innerHTML = "";
        // change border color and background
        password_insc.style.borderColor = "green";
        password_insc.style.backgroundColor = "#fafafa";
        validation = true;
      }
    }
  
    // Verif correspondance entre les password
    function verifPassword2() {
      let passwordValue = password_insc.value;
      let password2Value = password2.value;
  
      // verif s'il y a un password
      if (password2Value === "") {
        password2.nextElementSibling.innerHTML =
          "Veuillez confirmer votre mot de passe";
        // change border color and background
        password2.style.borderColor = "red";
        password2.style.backgroundColor = "#ff000033";
        validation = false;
      } else {
        password2.nextElementSibling.innerHTML = "";
        // change border color and background to default
        password2.style.borderColor = "initial";
        password2.style.backgroundColor = "#fafafa";
        // verif que les password correspondent
        if (passwordValue === password2Value) {
          password2.nextElementSibling.innerHTML = "";
          // change border color and background
          password2.style.borderColor = "green";
          password2.style.backgroundColor = "#fafafa";
          validation = true;
        } else {
          password2.nextElementSibling.innerHTML =
            "Les mots de passe ne correspondent pas";
          // change border color and background
          password2.style.borderColor = "red";
          password2.style.backgroundColor = "#ff000033";
          validation = false;
        }
      }
    }
  
    //////////////////////////////////////////////////
    // Function for connexion                  ///////
    //////////////////////////////////////////////////
    // Verif login
    function verifLoginConn() {
      let loginValue = login_conn.value;
      // verif s'il y a un login
      if (loginValue === "") {
        login_conn.nextElementSibling.innerHTML = "Veuillez rentrer un login";
        // change border color and background
        login_conn.style.borderColor = "red";
        login_conn.style.backgroundColor = "#ff000033";
  
        validation = false;
      } else {
        login_conn.nextElementSibling.innerHTML = "";
        // change border color to default
        login_conn.style.borderColor = "initial";
        login_conn.style.backgroundColor = "#fafafa";
        // verif que le login est disponible
        let dataLogin = new FormData();
        dataLogin.append("verifLogin", loginValue);
        //   console.log(dataLogin);
        fetch("verif.php", {
          method: "POST",
          body: dataLogin,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            //   console.log(response);
            if (response === "indispo") {
              login_conn.nextElementSibling.innerHTML = "Login ok";
              // change border color and background
              login_conn.style.borderColor = "green";
              login_conn.style.backgroundColor = "#fafafa";
              // suppression de la clé
              dataLogin.delete("verifLogin");
              validation = true;
            } else if (response === "dispo") {
              login_conn.nextElementSibling.innerHTML = "Ce login n'existe pas";
              // change border color and background
              login_conn.style.borderColor = "red";
              login_conn.style.backgroundColor = "#ff000033";
  
              validation = false;
            }
          })
          .catch((error) => console.log(error));
      }
    }
  
    // Verif password
    function verifPasswordConn() {
      let passwordValue = password_conn.value;
  
      // verif s'il y a un password
      if (passwordValue === "") {
        password_conn.nextElementSibling.innerHTML =
          "Veuillez rentrer un mot de passe";
        // change border color and background
        password_conn.style.borderColor = "red";
        password_conn.style.backgroundColor = "#ff000033";
        validation = false;
      } else {
        password_conn.nextElementSibling.innerHTML = "";
        // change border color and background
        password_conn.style.borderColor = "green";
        password_conn.style.backgroundColor = "#fafafa";
        validation = true;
      }
    }
  
    //////////////////////////////////////////////////
    // ajout des event pour l'inscription       ///////
    //////////////////////////////////////////////////
    // login
    login_insc.addEventListener("blur", verifLogin);
    // password
    password_insc.addEventListener("blur", verifPassword);
    // password2
    password2.addEventListener("keyup", verifPassword2);
    // btnInsc
    form_insc.addEventListener("submit", function (e) {
      e.preventDefault();
        let data = new FormData(e.target);
        data.append("insc", "ok");
        fetch("verif.php", {
          method: "POST",
          body: data,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            //   console.log(response);
            if (response === "ok") {
              displayConn();
            }
          })
          .catch((error) => console.log(error));

        console.log('form_ins: ', e);
    });
  
    //////////////////////////////////////////////////
    // ajout des event pour la connexion        ///////
    //////////////////////////////////////////////////
    // login
    login_conn.addEventListener("blur", verifLoginConn);
    // password
    password_conn.addEventListener("blur", verifPasswordConn);
    // btnConn
    btnConn.addEventListener("click", function (e) {
      e.preventDefault();
      if (validation) {
        let data = new FormData(form_conn);
        data.append("conn", "ok");
        fetch("verif.php", {
          method: "POST",
          body: data,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            //   console.log(response);
            if (response === "ok") {
              // msg de connexion puis redirection
              btnConn.nextElementSibling.innerHTML =
                "Connexion réussie, vous allez être redirigé";
              setTimeout(() => {
                window.location.href = "todolist.php";
              }, 2000);
            } else if (response === "incorrect") {
              // msg de mdp incorrect
              password_conn.nextElementSibling.innerHTML =
                "Mot de passe incorrect";
              // change border color and background
              password_conn.style.borderColor = "red";
              password_conn.style.backgroundColor = "#ff000033";
            }
          })
          .catch((error) => console.log(error));
      }
    });
  });*/
  // attente du chargement du DOM
document.addEventListener("DOMContentLoaded", function () {
    // création des variables
    // récupération pour l'inscription
    const section_insc = document.querySelector("#inscription");

    let registerForm = document.querySelector("#registerForm");

    let login_insc = registerForm.querySelector(".login");
    let password_insc = registerForm.querySelector(".password");
    let password2 = registerForm.querySelector("#password2");
    const switchConn = document.querySelector("#switchConn");
  
    // récupération pour la connexion
    const section_conn = document.querySelector("#connexion");
    
    let loginForm = document.querySelector("#loginForm");
    
    let login_conn = loginForm.querySelector(".login");
    let password_conn = loginForm.querySelector(".password");
    const btnConn = document.querySelector("#btnConn");
    const switchInsc = document.querySelector("#switchInsc");
  
    // autres
    let validation = false;
    // récupération de l'url dans une string
    let str = window.location.href;
    let url = new URL(str);
    // récupération du paramètre "sign" de l'url
    let sign = url.searchParams.get("sign");
  
    // fonctions de display
    // affichage de la section connexion
    function displayConn() {
      section_insc.style.display = "none";
      section_conn.style.display = "flex";
      // modification du title
      document.title = "Connexion";
    }
    // affichage de la section inscription
    function displayInsc() {
      section_insc.style.display = "flex";
      section_conn.style.display = "none";
      // modification du title
      document.title = "Inscription";
    }
  
    // affichage évolutif
    if (sign == "insc") {
      displayInsc();
    } else if (sign == "conn") {
      displayConn();
    }
    // affichage de la section inscription par défaut
    else {
      displayInsc();
    }
  
    // fonction du switch de formulaire
    // switch vers la connexion
    $(switchConn).click(function () {
      // modification du title
      document.title = "Connexion";
      // animation
      $(section_insc).hide(1000);
      setTimeout(function () {
        $(section_conn).show(1000);
      }, 500);
    });
    // switch vers l'inscription
    $(switchInsc).click(function () {
      // modification du title
      document.title = "Inscription";
      // animation
      $(section_conn).hide(1000);
      setTimeout(function () {
        $(section_insc).show(1000);
      }, 500);
    });
  
    //////////////////////////////////////////////////
    // Function for inscription                ///////
    //////////////////////////////////////////////////
    // Verif login
    function verifLogin() {
      let loginValue = login_insc.value;
      // verif s'il y a un login
      if (loginValue === "") {
        login_insc.nextElementSibling.innerHTML = "Veuillez rentrer un login";
        // change border color and background
        login_insc.style.borderColor = "red";
        login_insc.style.backgroundColor = "#ff000033";
  
        validation = false;
      } else {
        login_insc.nextElementSibling.innerHTML = "";
        // change border color to default
        login_insc.style.borderColor = "initial";
        login_insc.style.backgroundColor = "#fafafa";
        // verif que le login est disponible
        let dataLogin = new FormData();
        dataLogin.append("verifLogin", loginValue);
        //   console.log(dataLogin);
        fetch("verif.php", {
          method: "POST",
          body: dataLogin,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            //   console.log(response);
            if (response === "indispo") {
              login_insc.nextElementSibling.innerHTML = "Ce login est déjà pris";
              // change border color and background
              login_insc.style.borderColor = "red";
              login_insc.style.backgroundColor = "#ff000033";
  
              validation = false;
            } else if (response === "dispo") {
              login_insc.nextElementSibling.innerHTML = "";
              // change border color and background
              login_insc.style.borderColor = "green";
              login_insc.style.backgroundColor = "#fafafa";
              // suppression de la clé
              dataLogin.delete("verifLogin");
              validation = true;
            }
          })
          .catch((error) => console.log(error));
      }
    }
  
    // Verif password
    function verifPassword() {
      let passwordValue = password_insc.value;
  
      // verif s'il y a un password
      if (passwordValue === "") {
        password_insc.nextElementSibling.innerHTML =
          "Veuillez rentrer un mot de passe";
        // change border color and background
        password_insc.style.borderColor = "red";
        password_insc.style.backgroundColor = "#ff000033";
        validation = false;
      } else {
        password_insc.nextElementSibling.innerHTML = "";
        // change border color and background
        password_insc.style.borderColor = "green";
        password_insc.style.backgroundColor = "#fafafa";
        validation = true;
      }
    }
  
    // Verif correspondance entre les password
    function verifPassword2() {
      let passwordValue = password_insc.value;
      let password2Value = password2.value;
  
      // verif s'il y a un password
      if (password2Value === "") {
        password2.nextElementSibling.innerHTML =
          "Veuillez confirmer votre mot de passe";
        // change border color and background
        password2.style.borderColor = "red";
        password2.style.backgroundColor = "#ff000033";
        validation = false;
      } else {
        password2.nextElementSibling.innerHTML = "";
        // change border color and background to default
        password2.style.borderColor = "initial";
        password2.style.backgroundColor = "#fafafa";
        // verif que les password correspondent
        if (passwordValue === password2Value) {
          password2.nextElementSibling.innerHTML = "";
          // change border color and background
          password2.style.borderColor = "green";
          password2.style.backgroundColor = "#fafafa";
          validation = true;
        } else {
          password2.nextElementSibling.innerHTML =
            "Les mots de passe ne correspondent pas";
          // change border color and background
          password2.style.borderColor = "red";
          password2.style.backgroundColor = "#ff000033";
          validation = false;
        }
      }
    }
  
    //////////////////////////////////////////////////
    // Function for connexion                  ///////
    //////////////////////////////////////////////////
    // Verif login
    function verifLoginConn() {
      let loginValue = login_conn.value;
      // verif s'il y a un login
      if (loginValue === "") {
        login_conn.nextElementSibling.innerHTML = "Veuillez rentrer un login";
        // change border color and background
        login_conn.style.borderColor = "red";
        login_conn.style.backgroundColor = "#ff000033";
  
        validation = false;
      } else {
        login_conn.nextElementSibling.innerHTML = "";
        // change border color to default
        login_conn.style.borderColor = "initial";
        login_conn.style.backgroundColor = "#fafafa";
        // verif que le login est disponible
        let dataLogin = new FormData();
        dataLogin.append("verifLogin", loginValue);
        //   console.log(dataLogin);
        fetch("verif.php", {
          method: "POST",
          body: dataLogin,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            //   console.log(response);
            if (response === "indispo") {
              login_conn.nextElementSibling.innerHTML = "Login ok";
              // change border color and background
              login_conn.style.borderColor = "green";
              login_conn.style.backgroundColor = "#fafafa";
              // suppression de la clé
              dataLogin.delete("verifLogin");
              validation = true;
            } else if (response === "dispo") {
              login_conn.nextElementSibling.innerHTML = "Ce login n'existe pas";
              // change border color and background
              login_conn.style.borderColor = "red";
              login_conn.style.backgroundColor = "#ff000033";
  
              validation = false;
            }
          })
          .catch((error) => console.log(error));
      }
    }
  
    // Verif password
    function verifPasswordConn() {
      let passwordValue = password_conn.value;
  
      // verif s'il y a un password
      if (passwordValue === "") {
        password_conn.nextElementSibling.innerHTML =
          "Veuillez rentrer un mot de passe";
        // change border color and background
        password_conn.style.borderColor = "red";
        password_conn.style.backgroundColor = "#ff000033";
        validation = false;
      } else {
        password_conn.nextElementSibling.innerHTML = "";
        // change border color and background
        password_conn.style.borderColor = "green";
        password_conn.style.backgroundColor = "#fafafa";
        validation = true;
      }
    }
  
    //////////////////////////////////////////////////
    // ajout des event pour l'inscription       ///////
    //////////////////////////////////////////////////
    // login
    login_insc.addEventListener("blur", verifLogin);
    // password
    password_insc.addEventListener("blur", verifPassword);
    // password2
    password2.addEventListener("keyup", verifPassword2);


    // registerForm
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let form = new FormData(event.currentTarget);

        console.log(form.get('login'));

        let url = 'register.php';

        let request = new Request(url, {method: 'POST', body: form});

        let response = await fetch(request);

        let responseData = await response.json();

        console.log(responseData);

        if (responseData.success) {
            alert("Inscription reussie !!!");
            displayConn();
            //window.location.href = "user.php?sign=conn";//????????????????????
        }

    });

    
    // loginForm
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let form = new FormData(event.currentTarget);

        console.log(form.get('login'));

        let url = 'connect.php';

        let request = new Request(url, {method: 'POST', body: form});

        let response = await fetch(request);

        let responseData = await response.json();

        console.log(responseData);

        if (responseData.success) {
            alert("Connexion reussie !!!");
            window.location.href = "index.php";
        }

    });

  
  
    //////////////////////////////////////////////////
    // ajout des event pour la connexion        ///////
    //////////////////////////////////////////////////
    // login
    login_conn.addEventListener("blur", verifLoginConn);
    // password
    password_conn.addEventListener("blur", verifPasswordConn);
    // btnConn
    btnConn.addEventListener("click", function (e) {
      e.preventDefault();
      if (validation) {
        let data = new FormData(loginForm);
        data.append("conn", "ok");
        fetch("verif.php", {
          method: "POST",
          body: data,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            //   console.log(response);
            if (response === "ok") {
              // msg de connexion puis redirection
              btnConn.nextElementSibling.innerHTML =
                "Connexion réussie, vous allez être redirigé";
              setTimeout(() => {
                window.location.href = "index.php";
              }, 2000);
            } else if (response === "incorrect") {
              // msg de mdp incorrect
              password_conn.nextElementSibling.innerHTML =
                "Mot de passe incorrect";
              // change border color and background
              password_conn.style.borderColor = "red";
              password_conn.style.backgroundColor = "#ff000033";
            }
          })
          .catch((error) => console.log(error));
      }
    });
  });