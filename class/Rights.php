<?php
// Création de la classe rights

class Rights
{

    // propriété
    private $id;
    private $ownerId;
    private $userId;

    private $bdd;

    private $tableName = "rights";

    /* Constructeur */
    public function __construct()
    {
        // connection à la BDD avec PDO
        // en local ////////////////////
        $servername = 'localhost';
        $dbname = 'tdl';
        $db_username = 'root';
        $db_password = '';

        // en ligne ///////////////////
        // $servername = 'localhost';
        // $dbname = 'christophe_tdl';
        // $db_username = 'adminbdd';
        // $db_password = 'basededonnees';


        // essaie de connexion
        try {
            $this->bdd = new PDO("mysql:host=$servername;dbname=$dbname; charset=utf8", $db_username, $db_password);

            // On définit le mode d'erreur de PDO sur Exception
            $this->bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            //echo "Connexion réussie"; 
            $this->bdd->exec("set names utf8");
        }
        // si erreur, on capture les exceptions, s'il y en a une on affiche les infos
        catch (PDOException $e) {
            echo "Echec de la connexion : " . $e->getMessage();
            exit;
        }
    }

    /* Méthodes */

    public function create($ownerId, $userId) {
        $result = false;

        if (!$this->exists($ownerId, $userId)) {
            $requete = "INSERT INTO $this->tableName (owner_id, user_id) VALUES (:owner_id, :user_id)";
    
            $req = $this->bdd->prepare($requete);
    
            $result = $req->execute([
                'owner_id' => $ownerId,
                'user_id' => $userId
            ]);

        }


        return $result;
    }

    public function delete($ownerId, $userId) {
        $requete = "DELETE FROM $this->tableName WHERE owner_id = :owner_id AND user_id = :user_id";

        $req = $this->bdd->prepare($requete);

        return $req->execute([
            'owner_id' => $ownerId,
            'user_id' => $userId
        ]);
    }


    public function findAllByUserId($userId) {
        $requete = "SELECT utilisateurs.id, utilisateurs.login FROM $this->tableName INNER JOIN utilisateurs ON utilisateurs.id = owner_id WHERE user_id = :user_id";

        $req = $this->bdd->prepare($requete);

        $req->execute([
            'user_id' => $userId
        ]);

        $result = $req->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    public function exists($ownerId, $userId): bool {
        $requete = "SELECT * FROM $this->tableName WHERE owner_id = :owner_id AND user_id = :user_id";

        $req = $this->bdd->prepare($requete);

        $req->execute([
            'owner_id' => $ownerId,
            'user_id' => $userId
        ]);

        $user = $req->fetch(PDO::FETCH_ASSOC);

        $found = ($user !== false);

        return $found;
    }



}