import '../index.css';

import logo from '../assets/logo.avif';
import visa from '../assets/visa.avif';
import paypal from '../assets/paypal.avif';

export default function Footer() {
  return (
    <div className='footer'>
        <div>
            <img
                src={logo}
                className='h-14 w-14'
                alt='logo'
                loading='lazy'
            />
        </div>

        <div className='payment-container'>
            <div>
                <img
                    src={visa}
                    className='h-8 w-8'
                    alt='visa'
                    loading='lazy'
                />
            </div>
            <div>
                <img
                    src={paypal}
                    className='h-8 w-8'
                    alt='paypal'
                    loading='lazy'
                />
            </div>
        </div>
        
        <div>
            <span className='footer-txt'>&copy; 2025 - Chordix.</span>
        </div>
    </div>
  )
}