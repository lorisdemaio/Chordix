import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router';
import '../index.css';

// COMPONENTI
import Section from '../layout/section';
import BackBtn from '../layout/baclkBtn';

interface Chitarra {
  id: string;
  nome: string;
  img: string;
  prezzo: string;
}

export default function Chitarra() {
  
  // API
  
  const { id } = useParams();
  const [prodotto, setProdotto] = useState<Chitarra>();

  useEffect(() => {
    scrollTo(0, 0);

    fetch(`${import.meta.env.VITE_API_URL}/chitarra/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => setProdotto(data))
  }, []);

  // CARRELLO

  const [quantita, setQuantita] = useState(1);
  const [carrello, setCarrello] = useState<Chitarra[]>(() => {
    const elementi = localStorage.getItem('carrello');
    return elementi ? JSON.parse(elementi) : [];
  });
  
  const AggiungiAlCarrello = () => {
    if(prodotto) 
    {
      const ordine = { 
        id: prodotto.id, nome: prodotto.nome, 
        img:prodotto.img, 
        prezzo: prodotto.prezzo, 
        quantità: quantita 
      };
      setCarrello(prev => [...prev, ordine]);
      toast.info("Prodotto aggiunto al carrello.");
    }
  };

  useEffect(() => {
    localStorage.setItem('carrello', JSON.stringify(carrello));
  }, [carrello]);

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

        <div className='prodotto'>
          <div className='prodotto-content'>
            <img
              src={prodotto?.img}
              alt={prodotto?.nome}
              loading='lazy'
            />
          </div>

          <div className='prodotto-content'>
            <h1>{prodotto?.nome}</h1>
            
            <span className='prezzo'>
              {prodotto?.prezzo}€
            </span>
            
            <div className='center gap-2'>
              <label className='quantita-label'>Quantità: </label>
              <input 
                className='quantita' 
                type='text'
                value={quantita}
                onChange={(e) => setQuantita(Number(e.target.value))}
                min={1}
              />
            </div>
            
            <button className='btn-ordina' onClick={AggiungiAlCarrello}>
              Aggiungi all carrello
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