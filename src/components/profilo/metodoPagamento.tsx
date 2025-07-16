import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import '../../index.css';

// COMPONENTI
import Section from '../../layout/section';
import BackBtn from '../../layout/baclkBtn';

// HOOK
import { useUserData } from '../../hook/useUserData';

export default function MetodoPagamento() {

    const [ userData, setUserDataValue ] = useUserData();
    const idUtente = userData.idUtente;
    const metodoPagamento = userData.metodoPagamento;

    const [codice, setCodice] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [cvv, setCvv] = useState<string>("");
    const [tipo, setTipo] = useState<string>("");

    const method = metodoPagamento === 'null' ? "POST" : "PATCH";

    const handleMetodoPagamento = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
        
      fetch(`${import.meta.env.VITE_API_URL}/metodo-pagamento`, {
        method: `${method}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codice, data, cvv, tipo, idUtente })
      })
      .then(res => res.json())
      .then(data => {
        if(data.status === "200")
        {
          setUserDataValue("metodoPagamento", data.tipo);
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

        <form onSubmit={handleMetodoPagamento}>
            <h1 className='form-txt'>
              Aggiungi/Modifica un metodo di pagamento
            </h1>

            <div>
              <label>Codice carta</label>
              <input 
                type='text' 
                name='codice_carta'
                placeholder=''
                value={codice}
                onChange={(e) => setCodice(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Data scadenza</label>
              <input 
                type='text' 
                name='data_scadenza'
                placeholder='ES. 06/26'
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
            <div>
              <label>CVV</label>
              <input 
                type='password' 
                name='cvv'
                placeholder='Es. 123'
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Tipo</label>
              <input 
                type='text' 
                name='tipo'
                placeholder='Es. Visa, Mastercard...'
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
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