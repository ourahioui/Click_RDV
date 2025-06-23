import { useState } from 'react';
import { FiMail, FiUser, FiCalendar, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import ProfileMedecin from '../components/ProfileMedecin.js';
import RendezVousTab from './RendezVousTab.jsx';
import RendezVousAVenire from '../components/RendezVousAVenire.js';
import styles from './MedicalProfileTabs.module.css';
import DefinirDisponibilites from './Definirdisponibilites/Definirdisponibilites.js';
import { toast } from 'react-toastify';

const ProfilMedicalTabs = ({ id }) => {
  const [activeTab, setActiveTab] = useState('profil');
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'profil',
      label: 'Profil',
      icon: FiUser,
      component: <ProfileMedecin id={id} />
    },
    {
      id: 'demandes',
      label: 'Demandes',
      icon: FiMail,
      component: <RendezVousTab id={id} TypeDemandes="DemandesEnAttente" />
    },
    {
      id: 'rendez-vous',
      label: 'Rendez-vous',
      icon: FiCalendar,
      component: <RendezVousAVenire id={id} />
    },
    {
      id: "Disponibilites",
      label: 'Disponibilités',
      icon: FiCalendar,
      component: <DefinirDisponibilites id={id} />
    }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    // Suppression du token et redirection
    localStorage.removeItem('token');
    toast.success('Déconnexion réussie');
    navigate('/LoginMedecin');
    window.location.reload();

  };

  const renderActiveTabContent = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab);
    return activeTabData ? activeTabData.component : null;
  };

  return (
    <div className={styles.profilMedicalContainer}>
      {/* Sidebar responsive */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Espace Médecin</h2>
        </div>
        
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
                onClick={() => handleTabClick(tab.id)}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <IconComponent className={styles.tabIcon} />
                <span>{tab.label}</span>
              </button>
            );
          })}
          
          {/* Bouton de déconnexion */}
          <button
            className={styles.tabButton}
            onClick={handleLogout}
            style={{ marginTop: 'auto' }} // Positionne en bas
          >
            <FiLogOut className={styles.tabIcon} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <main className={styles.contentArea}>
        {renderActiveTabContent()}
      </main>
    </div>
  );
};

export default ProfilMedicalTabs;