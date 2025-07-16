import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../index.css';

// COMPONENTI
import Section from '../../layout/section';
import BackBtn from '../../layout/baclkBtn';

// HOOK
import { useUserData } from '../../hook/useUserData';

export default function Indirizzo() {

  const [ userData, setUserDataValue ] = useUserData();
  const idUtente = userData.idUtente;
  const indirizzo = userData.indirizzo;

  const [NuovoIndirizzo, setNuovoIndirizzo] = useState<string>("");
  const [NuovaCittà, setNuovaCittà] = useState<string>("");
  
  const handleIndirizzo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(`${import.meta.env.VITE_API_URL}/indirizzo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ NuovoIndirizzo, NuovaCittà, idUtente })
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "200")
      {
        console.log(data);
        setUserDataValue("indirizzo", data.indirizzo);
        setUserDataValue("città", data.città);
        toast.info(data.mex);
      }
    });
    
  };

  return (
    <>
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

        <form onSubmit={handleIndirizzo}>
            <h1 className='form-txt'>
              {
                  indirizzo ? "Modifica indirizzo" : "Aggiungi indirizzo"
              }
            </h1>

            <div>
              <label>Indirizzo</label>
              <input 
                type='text' 
                name='indirizzo'
                placeholder='Es. Via Roma 12'
                value={NuovoIndirizzo}
                onChange={(e) => setNuovoIndirizzo(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Città</label>
              <input 
                type='text' 
                name='città'
                placeholder='Es. Roma'
                value={NuovaCittà}
                onChange={(e) => setNuovaCittà(e.target.value)}
                required
              />
            </div>
            <button className='card-btn' type='submit'>
              inserisci
            </button>
        </form>
        
        <BackBtn 
          link='/profile'
        />
      </Section>
    </>
  )
}