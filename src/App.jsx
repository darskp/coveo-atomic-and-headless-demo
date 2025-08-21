import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Headless } from './coveo/Headless'
import Atomic from './coveo/Atomic'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     <div style={{ display: "flex", gap: "50px", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <h2>Atomic Search</h2>
       {/* <Atomic/> */}
      </div>
      <div style={{ flex: 1 }}>
        <h2>Headless Search (MUI)</h2>
        <Headless />
      </div>
    </div>
    </>
  )
}

export default App
