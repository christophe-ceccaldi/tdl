// attente du chargement du DOM
window.addEventListener("load", function () {
    /* récupération des éléments */
    let userId = "vide";
    let idConnected = document.querySelector("#hidden").innerHTML;
    let titlePerso = document.querySelector("#title");
    // formulaires
    const formTask = document.querySelector("#formTask");
    const formRights = document.querySelector("#giveRightsForm");
    let usersRights = formRights.querySelector("#usersRights");
    const formUsersTasks = document.querySelector("#formUsersTasks");
    let usersTasks = formUsersTasks.querySelector("#usersTasks");
  



    // liste des utilisateurs pour donner les droits
    const slideRights = document.querySelector("#slideRights");
  
    // liste contenant les différentes personnes que l'on peut gérer
    const slideUsersTasks = document.querySelector("#slideUsersTasks");
  
    // liste des tâches à faire
    const slideToDo = document.querySelector("#slideToDo");
    const toDo = document.querySelector("#toDo");
  
    // liste des tâches faites
    const slideDone = document.querySelector("#slideDone");
    const done = document.querySelector("#done");
  


    async function loadUserRights() {
        let url = "../getDroits.php?include_owner";
        
        let request = new Request(url);
        
        let response = await fetch(request);
        let responseData = await response.json();
  
        console.log(responseData);

        for (let user of responseData) {
            let option = document.createElement("option");
            option.setAttribute("value", user.id);
            option.textContent = user.login;

            usersTasks.appendChild(option);

            console.log(user);
            console.log(option);
            console.log(usersTasks);
        }

    }



    // fonction d'ajout d'une tâche dans la bdd
    function addTask(id) {
      // si id n'est pas définie on remplace par "currentId"
      if (id == undefined) {
        id = "currentId";
      }
      // récupération des données du formulaire
      let data = new FormData(formTask);
      data.append("send", "add");
      // envoi des données au serveur
      fetch(`manageTask.php?User=${id}`, {
        method: "POST",
        body: data,
      })
        .then((response) => response.text())
        .then((response) => {
          response = response.trim();
          if (response == "ok") {
            // on vide le formulaire
            formTask.reset();
            // on display a nouveau les tâches
            displayTasks(id);
          } else {
            formTask.nextElementSibling.innerHTML =
              "Une erreur est survenue, votre tâche n'a pas pu être ajoutée";
          }
        })
        .catch((error) => console.log(error));
    }
  
    // fonction d'affichage des tâches
    function displayTasks(id) {
      // si l'id n'est pas défini, on inscrit "currentId"
      if (id == undefined) {
        id = "currentId";
      }
      // récupération des données
      fetch(`todo.php?User=${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {
          // on vide les listes
          toDo.innerHTML = "";
          done.innerHTML = "";
          // on parcourt les tâches
          response.forEach((task) => {
            // on crée les éléments
            let section = document.createElement("section");
            let p = document.createElement("p");
            let date = document.createElement("p");
            let btnDelete = document.createElement("button");
            let btnDone = document.createElement("button");
            // boutons check et delete
            let checkImg = document.createElement("i");
            checkImg.classList.add("fa-solid", "fa-check", "btn-success");
            let deleteImg = document.createElement("i");
            deleteImg.classList.add("fa-solid", "fa-xmark", "btn-delete");
            // on ajoute les classes
            section.classList.add("section_Task");
            p.classList.add("task");
            date.classList.add("date_task");
            btnDelete.classList.add("btn", "btn-delete");
            btnDone.classList.add("btn", "btn-success");
            // on ajoute les attributs
            btnDelete.setAttribute("data-id", task.id);
            btnDone.setAttribute("data-id", task.id);
            deleteImg.setAttribute("data-id", task.id);
            checkImg.setAttribute("data-id", task.id);
            // on ajoute les textes
            p.textContent = task.tache;
            btnDelete.appendChild(deleteImg);
            btnDone.appendChild(checkImg);
            // on ajoute les éléments présents dans chaque liste
            section.appendChild(p);
            section.appendChild(date);
            // on vérifie que la tâche est faites ou non
            if (task.state == 0) {
              date.textContent = task.dateCrea;
              // on ajoute les éléments propre à cette liste
              section.appendChild(btnDelete);
              section.appendChild(btnDone);
              // on ajoute la tâche dans la bonne liste
              toDo.appendChild(section);
            } else {
              date.textContent = task.dateCrea + " - " + task.dateRea;
              // on ajoute les éléments propre à cette liste
              section.appendChild(btnDelete);
              // on ajoute la tâche dans la bonne liste
              done.appendChild(section);
            }
          });
        })
        .catch((error) => console.log(error));
    }
  
    // fonction de suppression d'une tâche
    function deleteTask(id) {
      let data = new FormData();
      data.append("id", id);
      data.append("action", "delete");
      // envoi des données au serveur
      fetch("manageTask.php", {
        method: "POST",
        body: data,
      })
        .then((response) => response.text())
        .then((response) => {
          response = response.trim();
          if (response == "ok") {
            // on display a nouveau les tâches pour la bonne personne
            if (userId == "vide") {
              displayTasks();
            } else {
              displayTasks(userId);
            }
          } else {
            formTask.nextElementSibling.innerHTML =
              "Une erreur est survenue, votre tâche n'a pas pu être supprimée";
          }
        })
        .catch((error) => console.log(error));
    }
  
    // fonction de changement de statut d'une tâche
    function changeStatus(id) {
      let data = new FormData();
      data.append("id", id);
      data.append("action", "done");
      // envoi des données au serveur
      fetch("manageTask.php", {
        method: "POST",
        body: data,
      })
        .then((response) => response.text())
        .then((response) => {
          response = response.trim();
          if (response == "ok") {
            // on display a nouveau les tâches pour la bonne personne
            if (userId == "vide") {
              displayTasks();
            } else {
              displayTasks(userId);
            }
          } else {
            formTask.nextElementSibling.innerHTML =
              "Une erreur est survenue, le statut de votre tâche n'a pas pu être modifié";
          }
        })
        .catch((error) => console.log(error));
    }
  
    // fonction qui récupère l'id de l'utilisateur connecté
    //   async function getIdUser() {
    //     let data = new FormData();
    //     data.append("getId", "id");
    //     let request = await fetch("verif.php", {
    //       method: "POST",
    //       body: data,
    //     });
    //     let id = await request.json();
    //     console.log(id);
    //     return id;
    //     //   .catch((error) => console.log(error));
    //   }
  
    // fonction pour récupérer les utilisateurs (et leur id) seulement s'ils n'ont pas encore les droits de l'utilisateur connecté et les mettre dans le formulaire
    function getUsers(idConnected) {
      fetch("getUsers.php?include_rights", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => {

            console.log(response);

          // on vide la liste
          usersRights.innerHTML = "";
          // on parcourt les utilisateurs
          response.forEach((user) => {
            // Si l'id de l'utilisateur n'est pas le même on vérifie les id présent dans la colonne id_droit
            if (user.id != idConnected) {
                // on crée les éléments de type checkbox ayant pour value l'id, puis un texte contenant le login
                let checkbox = document.createElement("input");
                let label = document.createElement("label");
                checkbox.setAttribute("type", "checkbox");
                checkbox.checked = user.has_rights;
                checkbox.setAttribute("value", user.id);
                checkbox.setAttribute("name", "usersRights[]");
                label.textContent = user.login;
                // on ajoute les éléments dans la liste
                usersRights.appendChild(checkbox);
                usersRights.appendChild(label);
                usersRights.appendChild(document.createElement("br"));
            } else {
              // console.log("c'est le même");
            }
          });
        })
        .catch((error) => console.log(error));
    }
  
    // fonction pour ajouter les droits aux personnes qui sont cochées
    function addRights() {
      // on récupère les utilisateurs cochés
      let users = document.querySelectorAll(
        "input[name='usersRights[]']:checked"
      );
      // on parcourt les utilisateurs cochés
      users.forEach((user) => {
        // on fetch verif.php pour chaque id
        let data = new FormData();
        data.append("idOther", user.value);
        data.append("addDroit", "send");
        fetch("verif.php", {
          method: "POST",
          body: data,
        })
          .then((response) => response.text())
          .then((response) => {
            response = response.trim();
            if (response == "ok") {
              // console.log("ok");
              // on display a nouveau les users
              getUsers(idConnected);
            } else {
              formTask.nextElementSibling.innerHTML =
                "Une erreur est survenuelors de l'ajout des droits";
            }
          })
          .catch((error) => console.log(error));
      });
    }
  
    // fonction pour récupérer les tâches de l'utilisateur sélectionné
    function getTasksSelected() {
      // on récupère l'id de l'utilisateur sélectionné
      idSelected = usersTasks.value;
      // on récupère le login de l'utilisateur sélectionné
      loginSelected = usersTasks.options[usersTasks.selectedIndex].text;
      // on change le texte de titlePerso
      titlePerso.innerHTML = "ToDoList de " + loginSelected;
      // on retourne l'id
      return idSelected;
      // displayTasks(idSelected);
    }
  
    formUsersTasks.addEventListener("submit", function (e) {
      e.preventDefault();
      userId = getTasksSelected();
      displayTasks(userId);
    });
  
    // function de slide pour la section todo, done ,formRights et formUsersTasks
    $(slideToDo).click(function () {
      $(toDo).slideToggle();
    });
  
    $(slideDone).click(function () {
      $(done).slideToggle();
    });
  
    $(slideRights).click(function () {
      $(formRights).slideToggle();
    });
  
    $(slideUsersTasks).click(function () {
      $(formUsersTasks).slideToggle();
    });
  
    // de base on cache le formulaire de droits et de choix de user
    $(formRights).hide();
    $(formUsersTasks).hide();
  
    // on lance toutes les fonctions que l'on doit lancer au chargement
    getUsers(idConnected);
    loadUserRights();
    displayTasks();
  
    // on ajoute un écouteur d'événement sur le bouton d'ajout de tâche
    formTask.addEventListener("submit", function (e) {
      e.preventDefault();
      // si userId est déclaré on le passe en paramètre
      if (userId == "vide") {
        addTask();
      } else {
        addTask(userId);
      }
    });
  
    // on ajoute un écouteur d'événement sur la liste des tâches à faire
    toDo.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.classList.contains("btn-delete")) {
        deleteTask(e.target.getAttribute("data-id"));
      } else if (e.target.classList.contains("btn-success")) {
        changeStatus(e.target.getAttribute("data-id"));
      }
    });
  
    // on ajoute un écouteur d'événement sur la liste des tâches faites
    done.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.classList.contains("btn-delete")) {
        deleteTask(e.target.getAttribute("data-id"));
      }
    });
  
    // on ajoute un écouteur d'événement lors du submit d'ajout des droits
    formRights.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      let checkedUserElements = e.target.querySelectorAll('[type="checkbox"]:checked');
      let uncheckedUserElements = e.target.querySelectorAll('[type="checkbox"]:not(:checked)');

      let userIdsToAdd = Array.from(checkedUserElements).map((el) => el.value);
      let userIdsToRemove = Array.from(uncheckedUserElements).map((el) => el.value);

      console.log(userIdsToAdd);
      
      if (userIdsToAdd.length) {
          let url = "../addDroits.php?ids=" + userIdsToAdd.join(',');
        
          let request = new Request(url);
          
          let response = await fetch(request);
          let responseData = await response.json();
    
          console.log(responseData);

          alert(responseData.message);

      }


      if (userIdsToRemove.length) {
        let url = "../removeDroits.php?ids=" + userIdsToRemove.join(',');
        
        let request = new Request(url);

        let response = await fetch(request);
        let responseData = await response.json();
        
        console.log(responseData);

        alert(responseData.message);

      }
      

      // addRights();
      // getUsers();
    });
  });