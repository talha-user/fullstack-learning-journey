import { useState } from 'react'
import UserForm from './components/UserForm'
import UserList from './components/UserList'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleUserAdded = () => {
    setRefresh(prev=>prev+1);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>My FullStack Application</h1>
        <p>SpringBoot + React + Docker</p>
      </header>

      <main className='App-main'>
        <UserForm onUserAdded = {handleUserAdded}/>
        <UserList key={refresh} />
      </main>
    </div>
      );
}

export default App
