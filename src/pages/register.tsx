import { useState } from 'react';
import { Link } from 'react-router';
import '../index.css';

// COMPONENTI
import Section from '../layout/section';
import BackBtn from '../layout/baclkBtn';

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    })
    .then(res => res.json())
    .then(data => {
      if(data.mex === "Registrato con successo.")
      {
        window.location.href = "/login"
      }
    });
    
  };

  return (
    <>
      
      {/* REGISTER PAGE */}

      <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
        AllineamentoVerticale='center'
        PaddingTop="100px"
        PaddingBottom="100px"
      >
        <form onSubmit={register}>
            <h1 className='form-txt'>Registrati</h1>
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
              <label>Email</label>
              <input 
                type='Email' 
                name='email'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Hai gia un account? <Link to="/login">accedi</Link>
            </p>
            <button className='card-btn' type='submit'>
              Registrati
            </button>
        </form>

        <BackBtn 
          link='/'
        />
      </Section>
    </>
  )
}