import { useEffect } from 'react';
import '../../index.css';

// COMPONENTI
import Section from '../../layout/section';
import Settings from '../../layout/settings';
import BackBtn from '../../layout/baclkBtn';

// HOOK
import { useUserData } from '../../hook/useUserData';

export default function Profile() {

  const [ userData ] = useUserData();
  const idUtente = userData.idUtente;
  const nome = userData.nome;
  const metodoPagamento = userData.metodoPagamento;
  const indirizzo = userData.indirizzo;
  const ruolo = userData.ruolo;

  useEffect(() => {
    if(nome) window.location.href = "/login";
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <>
      <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
        PaddingTop="120px"
        PaddingBottom="100px"
      >

        <div className='profile'>
            <div className='profile-img'>
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="white" className="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <h1>{nome}</h1>
            </div>

            <div className='w-full' style={{ marginTop: '1.5rem' }}>
                <Settings
                    titolo={`Indirizzo: ` + indirizzo}
                    NomeBtn='Modifica'
                    link='/profile/indirizzo'
                />
                <Settings
                    titolo={`Metodo di pagamento: ` + metodoPagamento}
                    NomeBtn='Modifica'
                    link='/profile/metodo_pagamento'
                />
                <Settings
                    titolo="Ordini"
                    NomeBtn='Vedi'
                    link={`/profile/ordini/${idUtente}`}
                />
                {
                  ruolo === 'utente' ? 
                  null : 
                  (
                    <Settings
                      titolo='Gestione ordini'
                      NomeBtn='Vai alla dashboard'
                      link='/admin'
                    />
                  )
                }
            </div>

            <div className='center w-full' style={{ marginTop: '1.5rem' }}>
              <button className='btn-no-shadow' onClick={handleLogout}>
                Logout
              </button>
            </div>
        </div>
        
        <BackBtn
          link='/prodotti'
        />
      </Section>
    </>
  )
}