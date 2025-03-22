import React from 'react';

const Sorry: React.FC = () => {
  return (
    <>
      <style>{`
        .sorry-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          font-family: 'Comic Sans MS', cursive, sans-serif;
          padding: 20px;
        }
        
        .sorry-box {
          padding: 20px 30px;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid #ff00ff;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
          animation: popIn 0.6s ease-out;
          text-align: center;
        }
        
        .sorry-box p {
          margin: 0;
          font-size: 1.8rem;
          color: #333;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @keyframes popIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      <div className="sorry-container">
        <div className="sorry-box">
          <p>You aint it grill</p>
        </div>
      </div>
    </>
  );
};

export default Sorry;
