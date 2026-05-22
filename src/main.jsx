import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx";
import blob from "./assets/blob.png"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
        {/* <img src={blob} alt="" className="w-[20%] aspect-square fixed left-0 top-0" /> */}
    </StrictMode>,
)
