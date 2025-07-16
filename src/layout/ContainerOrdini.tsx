import { Component, type ReactNode } from "react";

interface Ordini {
    nomeOrdine?: string;
    stato?: string;
    descrizione?: string;
    totale?: string;
}

export default class ContainerOrdini extends Component<Ordini> {
    render(): ReactNode {
        const {
            nomeOrdine,
            stato,
            descrizione,
            totale
        } = this.props;
        
        return(
            <>
                <div className='ordini'>
                    <div>
                        <h1>{nomeOrdine}</h1>
                    </div>
                    <div>
                        <span className="stato">{stato}</span>
                    </div>
                    <div>
                        <p>
                            {descrizione}
                        </p>
                    </div>
                    <div>
                        <span className="prezzo">{totale}</span>
                    </div>
                </div>
            </>
        )
    }
}