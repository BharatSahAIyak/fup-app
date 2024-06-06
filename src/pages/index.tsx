import { Noto_Sans } from "next/font/google";
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const inter = Noto_Sans({ subsets: ["latin"] });

export default function Home() {
  const [url, setUrl] = useState<string | null>(null);

  return (
    <div className={inter.className} style={{width: '100dvw', height: '100dvh'}}>
      <div style={{display: 'flex', alignItems: 'center'}}>
      {url && <ArrowBackIcon sx={{height: '30px', width: '30px', marginRight: '10px'}} onClick={() => setUrl(null)}/>}
      <h1 style={{textAlign: 'center', width: '100%'}}>Welcome User</h1>
      </div>
      {!url ? <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: 'center' }}>
        <div className="card" onClick={() => setUrl("https://akai-dev.vercel.app/chat")}>Chat</div>
        <div className="card" onClick={() => setUrl("https://akai-dev.vercel.app/history")}>History</div>
        <div className="card" onClick={() => setUrl("https://akai-dev.vercel.app/chat?message=Guided:%20Scheme")}>Schemes</div>
        <div className="card" onClick={() => setUrl("https://akai-dev.vercel.app/chat?message=Guided:%20Weather")}>Weather</div>
        <div className="card" onClick={() => setUrl("https://akai-dev.vercel.app/chat?message=Guided:%20Pest")}>Pest</div>
      </div> : 
        <iframe src={url} style={{width: '100%', height: 'calc(100% - 45px)', border: 'none'}} sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"></iframe>
      }
    </div>
  );
}
