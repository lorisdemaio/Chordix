import { useEffect, useState } from 'react';
import '../index.css';

// COMPONENTI
import Section from '../layout/section';
import Card from '../layout/card';

interface Chitarra {
  id: string;
  nome: string;
  img: string;
  prezzo: string;
}

export default function Prodotti() {
  const [prodotti, setProdotti] = useState<Chitarra[]>([]);

  useEffect(() => {
    scrollTo(0, 0);

    fetch(`${import.meta.env.VITE_API_URL}/prodotti`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(res => res.json())
    .then(data => setProdotti(data))
  }, []);

  return (
    <>
      <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
        PaddingTop="100px"
        PaddingBottom="100px"
      > 
        <h2>Prodotti</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
          {
            prodotti.map((chitarra) => (
              <Card
                key={chitarra.id}
                titolo={chitarra.nome}
                img={chitarra.img}
                link={"/chitarra/" + chitarra.id}
                titoloBtn={`Acquista - ` + chitarra.prezzo + "€"}
              />
            ))
          }
        </div>
      </Section>
    </>
  )
}