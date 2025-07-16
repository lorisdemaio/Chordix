import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import '../index.css';

// COMPONENTI
import Section from '../layout/section';
import BackBtn from '../layout/baclkBtn';
import ContainerProdotti from '../layout/ContainerProdotti';

// HOOK
import { useUserData } from '../hook/useUserData';

interface Chitarre {
  id: string;
  nome: string;
  img: string;
  prezzo: string;
  quantità: number;
}

export default function Cart() {
    
    const [ userData ] = useUserData();
    const idUtente = userData.idUtente;
    const nome = userData.nome;
    const metodoPagamento = userData.metodoPagamento;
    const città = userData.città;
    const indirizzo = userData.indirizzo;

    // CARRELLO

    const [carrello, setCarrello] = useState<Chitarre[]>([]);
    const [totale, setTotale] = useState<number>();

    useEffect(() => {
        const prodotti = localStorage.getItem('carrello');
        setCarrello(prodotti ? JSON.parse(prodotti) : []);
    }, []);

    // CALCOLO TOTALE

    useEffect(() => {
        const t = carrello.reduce((i, prodotto) => i + parseFloat(prodotto.prezzo) * prodotto.quantità, 0);
        setTotale(t);
    }, [carrello]);

    // RIMUOVI PRODOTTI

    const removeProduct = (i: string) => {
        const nuovoCarrello = carrello.filter(prodotto => prodotto.id !== i);
        setCarrello(nuovoCarrello);
        localStorage.setItem('carrello', JSON.stringify(nuovoCarrello));

        toast.info("Prodotto rimosso dal carrello con successo.");
    };
    
    // API - ORDINE

    const creaOrdine = () => {    
       const descrizione = carrello.map(
        prodotto => `${prodotto.nome} x ${prodotto.quantità}`
       ).join(', ');

       if(nome)
        {
            fetch(`${import.meta.env.VITE_API_URL}/crea-ordine`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ descrizione, totale, indirizzo, città, metodoPagamento, idUtente })
            })
            .then(res => res.json())
            .then(data => {
            if(data.status === "200")
            {    
                localStorage.removeItem('carrello');
                toast.info(data.mex);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
            }); 
        }
        else toast.error("Accedi o registrati per effetuare l'ordine.")
    }
  
  return (
    <>
      <Section
        altezza="100dvh"
        display="flex"
        AllineamentoOrizontale="center"
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

        {
            // Lista prodotti

            carrello.map((prodotto) => (
                <ContainerProdotti
                    key={prodotto.id}
                    MostraImg='block'
                    img={prodotto.img}
                    alt={prodotto.nome}
                    nome={prodotto.nome + " x "}
                    quantità={prodotto.quantità}
                    prezzo={prodotto.prezzo}
                    MostraBtn='block'
                    fun={() => {removeProduct(prodotto.id)}}
                />
            ))
        }

        {
            // Indirizzo e metodo di pagamento

            carrello.length > 0 ? 
            (
            <>
                <div className='flex justify-between items-center w-full'>
                    <div>
                        <p className='info'>
                            Invia a <span>{nome}</span>
                        </p>
                        {   
                            indirizzo && metodoPagamento ? 
                            (
                                <p className='info'>
                                    in <span>{localStorage.getItem('indirizzo')}</span> <br></br>
                                    Metodo di pagamento: <span>{localStorage.getItem('metodo_pagamento')}</span>
                                </p>
                            ) : 
                            (
                                <p>
                                 Nessun indirizzo o metodo di pagamento inserito, 
                                 <Link to="/profile" className='link-info'> clicca qui </Link> <br></br>
                                 per inserirlo.
                                </p>
                            )
                        }
                        <p className='text-start text-2xl' style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                            Totale: <span className='prezzo'>{totale}€</span>
                        </p>
                    </div>
                </div>
                <div className='md:center w-full'>
                    {
                        metodoPagamento !== 'null' && indirizzo ? 
                        (
                            <button className="btn-no-shadow md:w-max w-full" style={{ marginTop: '1rem' }} onClick={creaOrdine}>
                                Completa ordine
                            </button>
                        )
                        : null
                    }
                </div>
            </>
            ) : 
            (
            <>
                <h1>Carrello vuoto</h1>
                <Link to="/prodotti" className='h-link'>
                    Torna al catalogo
                </Link>
            </>
            )
        }

        <BackBtn
          link='/prodotti'
        />
      </Section>
    </>
  )
}