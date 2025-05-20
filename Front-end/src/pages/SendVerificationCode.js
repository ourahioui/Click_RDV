// components/EmailVerification.jsx
import { useState, useEffect } from 'react';
// import axios from 'axios';

export default function  SendVerificationCodee({ email, onVerification }) {
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');

//   useEffect(() => {
//     let interval;
//     if (countdown > 0) {
//       interval = setInterval(() => {
//         setCountdown(prev => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [countdown]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/auth/verify', { email, code });
//       onVerification(true);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Erreur de vérification');
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await axios.post('/api/auth/send-verification', { email });
//       setCountdown(900); // 15 minutes en secondes
//       setError('');
//     } catch (err) {
//       setError("Erreur d'envoi du code");
//     }
//   };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <form  className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Code de vérification</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="XXXXXX"
            maxLength="6"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Vérifier
        </button>

        <div className="text-center text-sm text-gray-600">
          {countdown > 0 ? (
            <span>Renvoyer le code dans {Math.floor(countdown/60)}:{countdown%60}</span>
          ) : (
            <button
              type="button"
            //   onClick={handleResend}
              className="text-blue-500 hover:text-blue-600"
            >
              Renvoyer le code
            </button>
          )}
        </div>
      </form>
    </div>
  );
};