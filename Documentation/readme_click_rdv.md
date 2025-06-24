# ClickRDV - Application de prise de rendez-vous médicaux

ClickRDV est une application web permettant aux patients de prendre des rendez-vous médicaux en ligne et aux médecins de gérer leurs disponibilités. Elle vise à faciliter la gestion des rendez-vous et la communication entre praticiens et patients.

---

## 🎯 Objectifs

- Prendre des rendez-vous facilement avec des médecins.
- Permettre aux médecins de gérer leurs disponibilités.
- Offrir un tableau de bord personnalisé pour chaque type d'utilisateur.

---

## ⚙️ Technologies Utilisées

| Côté                 | Technologie                      |
| -------------------- | -------------------------------- |
| Frontend             | React.js, Bootstrap, CSS Modules |
| Backend              | Node.js, Express.js              |
| Base de données      | MySQL                            |
| Authentification     | JWT                              |
| Gestion des fichiers | Multer                           |

---

## 📅 Fonctionnalités

### 🔷 Pour les Patients

- Se connecter
- S’inscrire
- Consulter la page d’accueil
- Consulter la liste des médecins par spécialité et localisation
- Rechercher un médecin
- Consulter le profil d’un médecin
- Vérifier les disponibilités d’un médecin
- Prendre un rendez-vous
- Consulter les rendez-vous à venir
- Recevoir une confirmation de rendez-vous
- Recevoir un rappel de rendez-vous

### 🟩 Pour les Médecins

- S’inscrire
- Se connecter
- Modifier son profil
- Définir ses créneaux de disponibilité
- Consulter et gérer ses rendez-vous
- Envoyer un message ou une note au patient

---

## 📚 Structure des Dossiers

```
clickrdv/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── config/
├── frontend/
│   ├── components/
│   ├── contexts/
│   ├── layouts/
│   └── redux/
    └── styles/
```

---

## 📂 Modèle de Données (MySQL)

### Table `codes`

- `id` int PRIMARY KEY
- `code` varchar(20)
- `email` varchar(255)
- `expires_at` datetime

### Table `disponibilites`

- `id` int unsigned PRIMARY KEY
- `medecinId` int unsigned (FOREIGN KEY)
- `date` date
- `heureDebut` time

### Table `knex_migrations`

- `id` int unsigned PRIMARY KEY
- `name` varchar(255)
- `batch` int
- `migration_time` timestamp

### Table `knex_migrations_lock`

- `index` int unsigned PRIMARY KEY
- `is_locked` int

### Table `medecins`

- `id` int unsigned PRIMARY KEY
- `nom` varchar(255)
- `prenom` varchar(255)
- `email` varchar(255) UNIQUE
- `password` varchar(255)
- `tel` varchar(255)
- `adresse` varchar(255)
- `photo` varchar(255)
- `specialiteId` int unsigned (FOREIGN KEY)
- `villeId` int unsigned (FOREIGN KEY)
- `experience` int
- `languesParlees` varchar(255)
- `modesPaiement` varchar(255)
- `tarif` int

### Table `patient`

- `id` int PRIMARY KEY
- `nom` varchar(50)
- `prenom` varchar(50)
- `email` varchar(100)
- `password` varchar(255)
- `tel` varchar(50)

### Table `rendez_vous`

- `id` int PRIMARY KEY
- `medecinId` int unsigned (FOREIGN KEY)
- `patientId` int (FOREIGN KEY)
- `date` date
- `Heure` time
- `statut` enum('EnAttente','Accepte','Refuse')

### Table `specialites`

- `id` int unsigned PRIMARY KEY
- `specialite` varchar(255)

### Table `verification_codes`

- `id` int
- `code` varchar(20)
- `email` varchar(255)

### Table `villes`

- `id` int unsigned PRIMARY KEY
- `ville` varchar(255)

---

---

## 🚀 Comment exécuter le projet

1. **Installer les dépendances** :
   ```bash
   cd backend
   npm install
   cd Front-end
   npm install
   ```
2. **Configurer la base de données** :
   - Crée une base de données `clickrdv` dans MySQL.
   - Importer le fichier `ClickRdv.sql` (./ClickRdv.sql) dans MySQL Workbench :
     1. Ouvre Workbench et connecte-toi
     2. Menu **File > Open SQL Script**
     3. Sélectionne `ClickRdv.sql`
     4. Clique sur l'éclair (F5) pour l'exécuter
3. **Lancer le backend** :
   ```bash
   cd backend
   node app.js
   ```
4. **Lancer le frontend** :
   ```bash
   cd Front-end
   npm start
   ```

---

## 🌐 Améliorations Futures

- Système de notation des médecins
- Intégration avec Google Calendar
- Interface administrateur
- Application mobile

---

## 📅 Auteur

Projet réalisé par IBRAHIM KHANTACH et MOHAMED OURHIOUI dans le cadre d'un projet scolaire. Pour toute contribution ou suggestion, veuillez ouvrir une issue ou une pull request.

