import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

// Import the Dutch (Belgium) locale from date-fns
import { nlBE } from 'date-fns/locale';

const SignedUpForm: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<Date[]>([]);
  const [gsm, setGsm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { gsm, selectedDays };
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Server response:', data);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        /* Global box-sizing and funky font */
        *, *::before, *::after {
          box-sizing: border-box;
        }
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          background-image: url('/208461.gif'); /* Replace with your image path */
          background-repeat: repeat;
          background-size: 100px 100px;
        }
        /* Container styling with neon vibe */
        .calendar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 2rem auto;
          max-width: 500px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 20px;
          border: 3px solid #ff00ff;
          box-shadow: 0 0 20px #ff00ff;
          animation: fadeIn 0.8s ease-out;
        }
        /* Funky animated heading */
        h2 {
          margin-bottom: 1rem;
          font-size: 1.8rem;
          color: #ff00ff;
          text-transform: uppercase;
          animation: wiggle 1s infinite alternate;
        }
        @keyframes wiggle {
          0% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        p {
          font-size: 1rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        /* DayPicker styling */
        .daypicker {
          margin-bottom: 1rem;
        }
        /* Input group styling */
        .input-group {
          margin-bottom: 1rem;
          width: 100%;
        }
        .input-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
        }
        .input-group input {
          width: 100%;
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .input-group input:focus {
          border-color: #007bff;
          transform: scale(1.02);
          outline: none;
        }
        /* Funky button styling */
        button {
          padding: 10px 16px;
          font-size: 1rem;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          background-color: hotpink;
          color: #fff;
          font-weight: bold;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }
        button:hover {
          background-color: #c2185b;
          transform: scale(1.05);
        }
        /* Simple CSS spinner */
        .spinner {
          border: 6px solid #f3f3f3;
          border-top: 6px solid hotpink;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 2rem auto;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        /* FadeIn animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Responsive styling for mobile devices */
        @media only screen and (max-width: 600px) {
          .calendar-container {
            margin: 1rem;
            padding: 15px;
            max-width: 90%;
          }
          h2 {
            font-size: 1.5rem;
          }
          button {
            padding: 8px 14px;
            font-size: 0.9rem;
          }
        }
      `}</style>

      {isLoading ? (
        <div className="spinner"></div>
      ) : submitted ? (
        <div className="calendar-container">
          <h2>Bedankt!</h2>
          <p>Je inzending is succesvol ontvangen.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="calendar-container">
          <h2>Selecteer jouw voorkeursdatums</h2>
          <p>
            Om op dit weekend mee te kunnen, dien je eerst een interview succesvol af te ronden. Kies vervolgens de dagen die voor jou het beste uitkomen en vul je gsm-nummer in om een bevestiging te ontvangen. Startvoorstel 's avonds om 20u, plaats later te beslissen.
          </p>
          <div className="daypicker">
            <DayPicker
              mode="multiple"
              locale={nlBE}
              selected={selectedDays}
              onSelect={(days) => {
                if (Array.isArray(days)) {
                  setSelectedDays(days);
                }
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="gsmInput">Gsm-nummer:</label>
            <input
              type="tel"
              id="gsmInput"
              value={gsm}
              onChange={(e) => setGsm(e.target.value)}
              placeholder="Bijv. 0487481016"
              required
            />
          </div>
          <button type="submit">Versturen</button>
        </form>
      )}
    </>
  );
};

export default SignedUpForm;
