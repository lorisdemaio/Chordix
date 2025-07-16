import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useParams } from 'react-router';
import '../../index.css';

// COMPONENTI
import Section from '../../layout/section';
import BackBtn from '../../layout/baclkBtn';
import ContainerOrdini from '../../layout/ContainerOrdini';

interface Ordini {
    id: string;
    stato: string;
    descrizione: string;
    totale: string;
}

export default function Ordini() {

  const { id } = useParams();
  const [ordini, setOrdini] = useState<Ordini[]>([]);
  
  useEffect(() => {
    scrollTo(0, 0);

    fetch(`${import.meta.env.VITE_API_URL}/ordini-utente/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => setOrdini(data.ordini))
  }, []);

  return (
    <>
      <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
        PaddingTop="150px"
        PaddingBottom="100px"
      >
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
        {
          ordini.length > 0 ? 
          (
          <>
            {
              ordini.map((prodotto) => (
                <ContainerOrdini
                  nomeOrdine={`Order - ${prodotto.id}`}
                  stato={`Stato: ${prodotto.stato}`}
                  descrizione={prodotto.descrizione}
                  totale={`${prodotto.totale}€`}
                />
              ))
            }
          </>
          ) : 
          (
          <>
            <h1>Non ci sono ordini</h1>
            <Link to="/prodotti" className='h-link'>
                Torna al catalogo
            </Link>
          </>
          )
        }
        </div>
        
        <BackBtn 
          link='/profile'
        />
      </Section>
    </>
  )
}