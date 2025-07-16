import { Component, type ReactNode } from "react";
import { Link } from "react-router";

interface SectionProps {
    img?: string;
    titolo?: string;
    titoloBtn?:string
    link?: string;
}

export default class Card extends Component<SectionProps> {
    render(): ReactNode {
        const {
            img,
            titolo,
            link,
            titoloBtn
        } = this.props;
        
        return(
            <>
                <div className="card">
                    <img 
                        src={img} alt="card-img" 
                        loading="lazy" 
                        className="card-img" 
                    />

                    <div className="card-content">
                        <span className="card-title">
                        {   titolo}
                        </span>

                        <Link to={`${link}`} className="card-btn">
                            {titoloBtn}
                        </Link>
                    </div>
                </div>
            </>
        )
    }
}