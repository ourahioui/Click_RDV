import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import styles from "./mes_rendez_vous.module.css";

const MesRendezVous = () => {
  const [rendezVous, setRendezVous] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Utilisateur non authentifié.");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const patientId = decoded.id || decoded.patientId || decoded.userId;

        if (!patientId) {
          setError("ID patient introuvable dans le token.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/RendezVous/ByPatientId/${patientId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRendezVous(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des rendez-vous :", err);
        setError(err.response?.data?.message || "Erreur lors de la récupération des rendez-vous.");
      } finally {
        setLoading(false);
      }
    };

    fetchRendezVous();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Chargement des rendez-vous...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (rendezVous.length === 0) {
    return <div className={styles.empty}>Aucun rendez-vous trouvé.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Mes Rendez-vous</h2>
      
      <div className={styles.tableContainer}>
        <table className={styles.rendezVousTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Heure</th>
              <th>Médecin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {rendezVous.map((rdv) => (
              <tr key={rdv.id}>
                <td>{new Date(rdv.date).toLocaleDateString()}</td>
                <td>{rdv.Heure}</td>
                <td>Dr. {rdv.medecinNom} {rdv.medecinPrenom}</td>
                <td>
                  <span className={`${styles.status} ${styles[`status${rdv.statut.replace('é', 'e')}`]}`}>
                    {rdv.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MesRendezVous;