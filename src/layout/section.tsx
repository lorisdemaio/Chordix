import { Component, type ReactNode } from "react";

interface SectionProps {
    display?: string;
    //direction?: string;
    AllineamentoOrizontale?: string;
    AllineamentoVerticale?: string;
    gap?: string;

    bg?: string;
    altezza?: string,
    larghezza?: string,

    PaddingTop?: string;
    PaddingBottom?: string;

    children?: ReactNode;
}

export default class Section extends Component<SectionProps> {
    render(): ReactNode {
        const {
            display,
            //direction,
            AllineamentoOrizontale,
            AllineamentoVerticale,
            gap,
            bg,
            altezza,
            larghezza,
            PaddingTop,
            PaddingBottom,
            children
        } = this.props;
        
        return(
            <>
                <section style={{
                    minHeight: altezza || undefined,
                    width: larghezza || undefined,
                    display: display || undefined,
                    alignItems: AllineamentoOrizontale || undefined,
                    flexDirection: "column" ,
                    justifyContent: AllineamentoVerticale || undefined,
                    gap: gap || undefined,
                    background: bg || undefined,
                    paddingTop: PaddingTop || undefined,
                    paddingBottom: PaddingBottom || undefined,
                }}>
                {children}
                </section>
            </>
        )
    }
}