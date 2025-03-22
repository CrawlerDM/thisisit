import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CookieRedirect: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Parse cookies from document.cookie
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=').map(part => part.trim());
      acc[key] = value;
      return acc;
    }, {} as { [key: string]: string });

    const cookieValue = cookies['dingdongcookie'];
    if (cookieValue === 'true') {
      navigate('/signedup');
    } else if (cookieValue === 'false') {
      navigate('/nope');
    } else {
      navigate('/start');
    }
  }, [navigate]);

  return null; // No UI—just redirects
};

export default CookieRedirect;
