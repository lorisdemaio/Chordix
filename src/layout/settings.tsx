import { Component, type ReactNode } from "react";
import { Link } from "react-router";

interface SectionProps {
    titolo: string;
    NomeBtn: string;
    link: string;
}

export default class Settings extends Component<SectionProps> {
    render(): ReactNode {
        const {
            titolo,
            NomeBtn,
            link
        } = this.props;
        
        return(
            <>
                <div className="settings">                    
                    <div className="settings-content">
                        <span className="settings-title">
                            {titolo}
                        </span> 
                        <div className="">
                            <Link to={`${link}`} className="btn-no-shadow">
                                {NomeBtn}
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}