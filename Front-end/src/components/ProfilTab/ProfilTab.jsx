import { useState } from 'react'
import '../components/profil.css' ;

const ProfilTab = ({ isEdit }) => {
  const [profileData, setProfileData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    photo: '',
    adresse: '',
    specialite: '',
    experience: '',
    langues: []
  })

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLangueChange = (langue, checked) => {
    setProfileData(prev => ({
      ...prev,
      langues: checked 
        ? [...prev.langues, langue]
        : prev.langues.filter(l => l !== langue)
    }))
  }

  const languesDisponibles = ['Français', 'Arabe', 'Anglais', 'Espagnol', 'Allemand']

  if (!isEdit) {
    return (
      <div className="profile-view">
        <div className="profile-photo-section">
          {profileData.photo ? (
            <img src={profileData.photo} alt="Photo de profil" className="profile-photo" />
          ) : (
            <div className="profile-photo-placeholder">
              <span>Photo de profil</span>
            </div>
          )}
        </div>
        
        <div className="profile-info">
          <h2>{profileData.prenom} {profileData.nom}</h2>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Téléphone:</strong> {profileData.telephone}</p>
          <p><strong>Adresse:</strong> {profileData.adresse}</p>
          <p><strong>Spécialité:</strong> {profileData.specialite}</p>
          <p><strong>Années d'expérience:</strong> {profileData.experience}</p>
          <p><strong>Langues parlées:</strong> {profileData.langues.join(', ')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-edit">
      <h2>Informations Personnelles</h2>
      
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="nom">Nom *</label>
          <input
            type="text"
            id="nom"
            value={profileData.nom}
            onChange={(e) => handleInputChange('nom', e.target.value)}
            placeholder="Votre nom"
          />
        </div>

        <div className="form-group">
          <label htmlFor="prenom">Prénom *</label>
          <input
            type="text"
            id="prenom"
            value={profileData.prenom}
            onChange={(e) => handleInputChange('prenom', e.target.value)}
            placeholder="Votre prénom"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            value={profileData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="votre.email@exemple.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telephone">Téléphone *</label>
          <input
            type="tel"
            id="telephone"
            value={profileData.telephone}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
            placeholder="+212 6XX XXX XXX"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="photo">Photo de profil</label>
          <input
            type="url"
            id="photo"
            value={profileData.photo}
            onChange={(e) => handleInputChange('photo', e.target.value)}
            placeholder="URL de votre photo de profil"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="adresse">Adresse</label>
          <textarea
            id="adresse"
            value={profileData.adresse}
            onChange={(e) => handleInputChange('adresse', e.target.value)}
            placeholder="Votre adresse complète"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="specialite">Spécialité médicale *</label>
          <select
            id="specialite"
            value={profileData.specialite}
            onChange={(e) => handleInputChange('specialite', e.target.value)}
          >
            <option value="">Sélectionnez une spécialité</option>
            <option value="Médecine générale">Médecine générale</option>
            <option value="Cardiologie">Cardiologie</option>
            <option value="Dermatologie">Dermatologie</option>
            <option value="Pédiatrie">Pédiatrie</option>
            <option value="Gynécologie">Gynécologie</option>
            <option value="Orthopédie">Orthopédie</option>
            <option value="Psychiatrie">Psychiatrie</option>
            <option value="Ophtalmologie">Ophtalmologie</option>
            <option value="ORL">ORL</option>
            <option value="Neurologie">Neurologie</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="experience">Années d'expérience</label>
          <input
            type="number"
            id="experience"
            value={profileData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            placeholder="Nombre d'années"
            min="0"
            max="50"
          />
        </div>

        <div className="form-group full-width">
          <label>Langues parlées</label>
          <div className="checkbox-group">
            {languesDisponibles.map((langue) => (
              <label key={langue} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={profileData.langues.includes(langue)}
                  onChange={(e) => handleLangueChange(langue, e.target.checked)}
                />
                <span>{langue}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilTab

