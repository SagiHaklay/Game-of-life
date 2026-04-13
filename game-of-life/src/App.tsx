

import './App.css'
import { CellGrid } from './ui/CellGrid'
import { GameProvider } from './game/GameProvider'
import { ControlPanel } from './ui/ControlPanel'

function App() {
  return (
    <>
      <GameProvider>
        <CellGrid></CellGrid>
        <ControlPanel></ControlPanel>
      </GameProvider>
    </>
  )
}

export default App
