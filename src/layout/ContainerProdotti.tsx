import { Component, type ReactNode } from "react";

interface SectionProps {
    MostraImg: string;
    img?: string;
    alt?: string;
    nome?: string;
    quantità?: number;
    prezzo?: string;
    MostraBtn: string;
    fun?: any;
}

export default class ContainerProdotti extends Component<SectionProps> {
    render(): ReactNode {
        const {
            MostraImg,
            img,
            alt,
            nome,
            quantità,
            prezzo,
            MostraBtn,
            fun
        } = this.props;
        
        return(
            <>
                <div className='carrello-item'>
                    <div className='flex md:flex-row flex-col gap-2 items-center'>
                        <img className={MostraImg} src={img} alt={alt} loading='lazy' />
                        <span className='carrello-prodotto'>{nome} {quantità}</span>
                    </div>
                    <div className='flex md:flex-row flex-col gap-4 items-center'>
                        <span className='prezzo'>{prezzo}€</span>
                        <button className={MostraBtn} onClick={fun}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </>
        )
    }
}