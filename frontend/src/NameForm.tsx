import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const NameForm: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/submit-name`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important to include cookies
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
        navigate('/');
      
    } catch (error) {
      console.error('Error submitting name:', error);
    }
  }

  return (
    <>
      <style>{`
        /* Apply box-sizing to prevent overspill */
        *, *::before, *::after {
          box-sizing: border-box;
        }

        /* Full-page container with repeating background */
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url('cat-dance-dancing-cat.gif');
          background-repeat: repeat;
          background-size: 50px 50px;
          padding: 20px;
        }

        /* Meme-worthy heading animation */
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(3deg);
          }
          75% {
            transform: rotate(-3deg);
          }
        }

        /* Button bounce animation */
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }

        /* Form container styling */
        form {
          width: 100%;
          max-width: 400px;
          padding: 20px;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px #ff00ff;
          border: 2px solid #ff00ff;
          animation: fadeIn 0.8s ease-out;
          position: relative;
        }

        /* Big Meme Heading */
        h1 {
          text-align: center;
          margin-bottom: 15px;
          font-size: 1.8rem;
          color: #ff00ff;
          animation: wiggle 1s infinite alternate;
        }

        /* Fade in animation for the form */
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

        /* Label styling */
        label {
          display: block;
          margin-bottom: 10px;
          font-size: 1.2rem;
          color: #333;
          font-weight: bold;
        }

        /* Input field styling with focus effect */
        input[type="text"] {
          width: 100%;
          padding: 12px 15px;
          margin-bottom: 10px;
          border: 2px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: bold;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }

        input[type="text"]:focus {
          border-color: #007bff;
          transform: scale(1.02);
          outline: none;
        }

        /* Button styling with bounce on hover */
        button[type="submit"] {
          width: 100%;
          padding: 12px;
          background-color: hotpink;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        button[type="submit"]:hover {
          animation: bounce 0.8s;
          transform: scale(1.03);
        }

        /* Responsive styling for mobile devices */
        @media only screen and (max-width: 600px) {
          .container {
            padding: 10px;
          }
          form {
            padding: 15px;
          }
          h1 {
            font-size: 1.5rem;
          }
          label, input, button {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Dit formulier is enkel voor Zoë</h1>
          <label htmlFor="nameInput">Vul hier je naam volledig naam in, voor- en achternaam, om je identiteit te bewijzen.</label>
          <input
            type="text"
            id="nameInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Voornaam achternaam"
            required
          />
          <button type="submit">Verstuur</button>
        </form>
      </div>
    </>
  );
};

export default NameForm;
