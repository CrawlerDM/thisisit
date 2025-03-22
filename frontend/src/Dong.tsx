import React, { useEffect, useState } from 'react';

interface Submission {
  id: number;
  gsm: string;
  selected_days: string[]; // assuming parsed JSON array of dates
  submitted_at: string;
}

const DatesTable: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dates', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const parsed = data.map((s: any) => ({
          ...s,
          selected_days: Array.isArray(s.selected_days)
            ? s.selected_days
            : JSON.parse(s.selected_days)
        }));
        setSubmissions(parsed);
      })
      .catch(err => console.error('Error loading data:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <style>{`
        .table-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 0 20px rgba(0,0,0,0.1);
          overflow-x: auto;
          font-family: 'Segoe UI', sans-serif;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px 15px;
          text-align: left;
        }

        th {
          background-color: #007bff;
          color: white;
        }

        tr:nth-child(even) {
          background-color: #f9f9f9;
        }

        tr:hover {
          background-color: #f1f1f1;
        }

        .loading {
          text-align: center;
          font-size: 1.2rem;
          padding: 2rem;
        }

        .days-cell {
          white-space: pre-wrap;
        }

        @media (max-width: 600px) {
          th, td {
            font-size: 0.9rem;
          }
        }
      `}</style>

      <div className="table-container">
        <h2>Inzendingen</h2>
        {loading ? (
          <div className="loading">Bezig met laden...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>GSM</th>
                <th>Voorkeursdatums</th>
                <th>Ingediend op</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.id}>
                  <td>{submission.id}</td>
                  <td>{submission.gsm}</td>
                  <td className="days-cell">
                    {submission.selected_days.map((d, i) => (
                      <div key={i}>{new Date(d).toLocaleDateString('nl-BE')}</div>
                    ))}
                  </td>
                  <td>{new Date(submission.submitted_at).toLocaleString('nl-BE')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DatesTable;
