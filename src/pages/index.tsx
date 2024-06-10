import { Noto_Sans } from 'next/font/google';
import { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { v4 as uuidv4 } from 'uuid';

const inter = Noto_Sans({ subsets: ['latin'] });

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BFF_URL}/user/login-with-unique-id`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userServiceURL: process.env.NEXT_PUBLIC_USER_SERVICE_URL || '',
              loginId: localStorage.getItem('userId') || uuidv4(),
              applicationId: process.env.NEXT_PUBLIC_APPLICATION_ID || '',
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        console.log(data);
        
        if(data?.result?.data?.user?.token)
          setLoginData(data?.result?.data?.user?.token);

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (path: string, param?: string) => {
    if(!loginData) return;
    setUrl(
      `${process.env.NEXT_PUBLIC_APP_URL}/${path}?userId=${localStorage.getItem('userId')}&auth=${loginData}&navbar=hidden&${param}`
    );
  };

  useEffect(() => {
    console.log(url)
  }, [url])
  

  return (
    <div
      className={inter.className}
      style={{ width: '100dvw', height: '100dvh' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {url && (
          <ArrowBackIcon
            sx={{ height: '30px', width: '30px', marginRight: '10px' }}
            onClick={() => {
              setUrl(null)
            }}
          />
        )}
        <h1 style={{ textAlign: 'center', width: '100%', color: '#115223' }}>Welcome User</h1>
      </div>
      {!url ? (
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
        >
          <div className="card" onClick={() => handleCardClick('chat')}>Chat</div>
          <div className="card" onClick={() => handleCardClick('history')}>History</div>
          <div className="card" onClick={() => handleCardClick('chat', 'message=Guided:%20Scheme')}>Schemes</div>
          <div className="card" onClick={() => handleCardClick('chat', 'message=Guided:%20Weather')}>Weather</div>
          <div className="card" onClick={() => handleCardClick('chat', 'message=Guided:%20Pest')}>Pest</div>
        </div>
      ) : (
        <iframe
          id="app"
          src={url}
          style={{ width: '100%', height: 'calc(100% - 45px)', border: 'none' }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
        ></iframe>
      )}
    </div>
  );
}
