import { useState } from 'react';
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import '../index.css';

// COMPONENTI
import Section from '../layout/section';
import BackBtn from '../layout/baclkBtn';

// HOOK
import { useUserData } from '../hook/useUserData';

export default function Login() {

  const [ userData, setUserDataValue ] = useUserData();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
      if(data.mex === "success")
      {
        setUserDataValue("idUtente", data.id);
        setUserDataValue("nome", data.nome);
        setUserDataValue("indirizzo", data.indirizzo);
        setUserDataValue("città", data.città);
        setUserDataValue("metodoPagamento", data.tipo);
        setUserDataValue('ruolo', data.ruolo);
        window.location.href = "/prodotti";
      }
      else toast.error(data.mex);
    });
  }

  return (
    <>
      
      {/* LOGIN PAGE */}

      <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
        AllineamentoVerticale='center'
        PaddingTop="100px"
        PaddingBottom="100px"
      >
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />

        <form onSubmit={login}>
            <h1 className='form-txt'>Accedi</h1>
            <div>
              <label>Nome utente</label>
              <input 
                type='text' 
                name='username'
                placeholder='Nome utente'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input 
                type='password' 
                name='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className='form-link'>
              Non hai un account? <Link to="/register">registrati</Link>
            </p>
            <button className='card-btn' type='submit'>
              Accedi
            </button>
        </form>

        <BackBtn 
          link='/'
        />
      </Section>
    </>
  )
}