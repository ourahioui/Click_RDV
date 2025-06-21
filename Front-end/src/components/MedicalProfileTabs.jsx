import { useState } from 'react' ;
import {FiMail, FiUser, FiCalendar, FiClock, FiFileText, FiDollarSign } from 'react-icons/fi' ; 
import ProfilTab from './ProfilTab.jsx'
import RendezVousTab from './RendezVousTab.jsx'
import ProfileMedecin from '../components/ProfileMedecin.js'  ;
 import RendezVousAVenire from '../components/RendezVousAVenire.js' ; 

function MedicalProfileTabs({id}) {
  const [activeTab, setActiveTab] = useState('profil')
 

  const tabs = [
    { id: 'profil', label: 'Profil', icon: FiUser },
    { id: 'les demandes de rendez vous', label: 'les demandes de rendez vous', icon: FiMail },
    // { id: 'horaires', label: 'Horaires', icon: FiClock },
    // { id: 'presentation', label: 'Présentation', icon: FiFileText },
    { id: 'rendez-vous', label: 'rendez-vous a venir', icon: FiCalendar }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profil':
        return <ProfileMedecin id={id}/>
      case 'les demandes de rendez vous-vous':
        return <RendezVousTab id={id} TypeDemandes={"DemandesEnAttente"}/>
    //   case 'horaires':
    //     return <HorairesTab isEdit={isEdit} /> 
    //   case 'presentation':
        // return <PresentationTab isEdit={isEdit} />
      case 'rendez-vous':
        return <RendezVousAVenire id={id} />
      default:
        return <RendezVousTab id={id} />
    }
  }

  return (
    <div className="medical-profile-container">
      <div className="profile-header">
        <h1>Profil Médical</h1>
        
      </div>

      <div className="tabs-container">
        <nav className="tabs-nav">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                aria-label={`Onglet ${tab.label}`}
              >
                <IconComponent className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default MedicalProfileTabs

