import React, {useState, useEffect} from 'react';
import '../styles/CardDetailsForm.scss';

import mobileBG from '../assets/bg-main-mobile.png';
import desktopBG from '../assets/bg-main-desktop.png';

import bgCardBack from '../assets/bg-card-back.png';
import bgCardFront from '../assets/bg-card-front.png';

function CardDetailsForm(props) {

    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    window.onresize = handleWindowResize
    function handleWindowResize() {
    //   console.log(window.innerHeight, window.innerWidth);
      setViewportWidth(window.innerWidth);
    }

    const [isMobileViewport, toggleMobileViewport] = useState((window.innerWidth > 425));
    useEffect(() => {
      if(viewportWidth > 425) {
        toggleMobileViewport(false)
      } else {
        toggleMobileViewport(true)
      }
    }, [viewportWidth])


    const [cvc, setCVC] = useState('000');



    return(
        <div className='cardDetailsForm'>

            {/* I am Card Details Form. */}

            {/* I will house sub-components */}

            <div className='cardDisplayContainer'>
                
                {isMobileViewport ? 
                    <img src={mobileBG} alt="A black and purple decorative background" className='mobile-bg-image'/> :
                    <img src={desktopBG} alt="A black and purple decorative background" className='desktop-bg-image'/> 
                }

                <div className='backwardCardContainer'>
                    <img src={bgCardBack} alt='The back of a credit card' className='bg-card-back'/>
                    <p className='cvcContent'>
                        {cvc}
                    </p>
                </div>

                <div className='frontCardContainer'>

                    <img src={bgCardFront} alt='The drop shadow for the front of the credit card' className='bg-card-front-shadow'/>
                    <img src={bgCardFront} alt='The front of a credit card' className='bg-card-front'/>
                    

                </div>


                {/* Aaaall of that goes here
                Some kinda background image, woooohoo look at that
                Backwards card Container
                    Backwards Card image   
                    CVC text
                Front facing card container
                    Front facing CC image  
                    CC Logo?
                    Credit Card Numbers
                    Credit Card name
                    Credit Card Expiration Date */}

            </div>

            <div className='cardFormContainer'>
                This is variable! It will either be
                The input form or the completed form!

                Input form Container!

                    Label name
                    input field name
                    ERROR INPUTFIELD NAME WRONG

                    label card number
                    input field card number
                    ERROR INPUTFIELD CARD NUMBER WRONG

                    Container for (month/year) & (CVC)
                        Expiration Date Label
                        Container for Month Input and Year Input
                            Container for Month Input and Error
                                Month Input
                                ERROR INPUTFIELD MONTH
                            Container for Year Input and Error
                                Year Input
                                ERROR INPUTFIELD Year
                        Container for CVC 
                            Label for CVC
                            input field CVC
                            ERROR INPUTFIELD CVC

                    Confirm Button

                Form Received Container!

                    Logo SVG Checkmark

                    Header THANK YOU!

                    Details Added card details

                    Continue button


            </div>


        </div>

    )
}

export default CardDetailsForm;