import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../index.css';

// COMPONENTI
import Section from '../layout/section';
import Card from '../layout/card';

interface Chitarra {
  id: string;
  nome: string;
  img: string;
  prezzo: string;
  evidenza: string;
}

export default function Landing() {
  const [evidenza, setEvidenza] = useState<Chitarra[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/evidenza`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => setEvidenza(data))
  }, []);

  return (
    <>
      
      {/* SECTION - 1 */}

      <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
        PaddingTop="100px"
        PaddingBottom="100px"
      >
        <div className='banner'>
          <h1 className='banner-txt'>
            Benvenuto
          </h1>
          <Link to="/prodotti" className='btn'>
            Scopri di più
          </Link>
        </div>
      </Section>

      {/* SECTION - 2 */}

       <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
        PaddingTop="100px"
        PaddingBottom="100px"
      >
        <h2>Chitarre in evidenza</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          {
            evidenza.map((chitarra) => (
              <Card
                key={chitarra.id}
                titolo={chitarra.nome}
                img={chitarra.img}
                link={"/chitarra/" + chitarra.id}
                titoloBtn='Scopri di più'
              />
            ))
          }
        </div>
        <Link to="/prodotti" className='h-link'>
          Scopri tutti i prodotti &rarr;
        </Link>
      </Section>
    </>
  )
}