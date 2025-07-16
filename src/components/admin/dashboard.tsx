import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../index.css';

// COMPONENTI
import Section from '../../layout/section';
import BackBtn from '../../layout/baclkBtn';

// HOOK
import { useUserData } from '../../hook/useUserData';

interface Ordini {
    id: string;
    username: string;
    indirizzo: string;
    città: string;
    data_ordine: string;
    stato: string;
    descrizione: string;
    totale: string;
}

export default function Dashboard() {

  const [ userData ] = useUserData();
  const ruolo = userData.ruolo;

  const [ordini, setOrdini] = useState<Ordini[]>([]);

  useEffect(() => {
    scrollTo(0, 0);

    if(ruolo === 'utente') window.location.href = "/profile";
  }, [ruolo]);

  // API

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/ordini-admin`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => setOrdini(data.ordini))
  }, []);

  // MODIFICA STATO

  const modificaStato = (stato: string, idOrdine: string) => {
    fetch(`${import.meta.env.VITE_API_URL}/modifica-ordine`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stato, idOrdine })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "200") toast.info(data.mex);
    })
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

        <h1>Ordini</h1>
        <div className='profile'>
          <table>
            <thead>
              <tr>
                <th>Utente</th>
                <th>Indirizzo</th>
                <th>Città</th>
                <th>Data Ordine</th>
                <th>Descrizione</th>
                <th>Totale</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
            {
              ordini.map((ordine) => (
                <tr key={ordine.id}>
                  <th>{ordine.username}</th>
                  <th>{ordine.indirizzo}</th>
                  <th>{ordine.città}</th>
                  <th>{ordine.data_ordine}</th>
                  <th>{ordine.descrizione}</th>
                  <th>{ordine.totale}€</th>
                  <th>
                    <select onChange={(e) => modificaStato(e.target.value, ordine.id)}>
                      <option>Stato attuale: {ordine.stato}</option>
                      <option>Ordinato</option>
                      <option>Spedito</option>
                      <option>Consegnato</option>
                    </select>
                  </th>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
        
        <BackBtn
          link='/profile'
        />
      </Section>
    </>
  )
}