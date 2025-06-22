import { useState } from 'react';
import { FiMail, FiUser, FiCalendar } from 'react-icons/fi';
import ProfileMedecin from '../components/ProfileMedecin.js';
import RendezVousTab from './RendezVousTab.jsx';
import RendezVousAVenire from '../components/RendezVousAVenire.js';
import './MedicalProfileTabs.css';

const ProfilMedicalTabs = ({ id }) => {
  const [activeTab, setActiveTab] = useState('profil');

  const tabs = [
    {
      id: 'profil',
      label: 'Profil',
      icon: FiUser,
      component: <ProfileMedecin id={id} />
    },
    {
      id: 'demandes',
      label: 'Mes demandes de rendez-vous',
      icon: FiMail,
      component: <RendezVousTab id={id} TypeDemandes="DemandesEnAttente" />
    },
    {
      id: 'rendez-vous',
      label: 'Mes rendez-vous à venir',
      icon: FiCalendar,
      component: <RendezVousAVenire id={id} />
    }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderActiveTabContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData ? activeTabData.component : null;
  };

  return (
    <div className="profil-medical-container">
      {/* Header fixe */}
      {/* <header className="profil-medical-header">
        <h1 className="header-title">Profil Médical</h1>
      </header> */}

      {/* Navigation par onglets */}
      <nav className="tabs-navigation">
        <div className="tabs-container">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <IconComponent className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Zone de contenu */}
      <main className="content-area">
        <div className="content-wrapper">
          {renderActiveTabContent()}
        </div>
      </main>
    </div>
  );
};

export default ProfilMedicalTabs;

