import React, {useState, useEffect} from 'react';
import '../styles/CardDetailsForm.scss';

import mobileBG from '../assets/bg-main-mobile.png';
import desktopBG from '../assets/bg-main-desktop.png';

import bgCardBack from '../assets/bg-card-back.png';
import bgCardFront from '../assets/bg-card-front.png';
import {ReactComponent as CardLogo} from '../assets/card-logo.svg';
import {ReactComponent as ThankYouLogo} from '../assets/icon-complete.svg'

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

    const [confirmationPage, toggleConfirmationPage] = useState(false);

    function clickConfirm(e){
        e.preventDefault();
        toggleConfirmationPage(!confirmationPage);
    }

    const [cardHolderName, updateCardHolderName] = useState('');

    function changeCardHolderName(e){
        e.preventDefault();
        updateCardHolderName(e.target.value);
    }



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
                    <CardLogo className='front-card-logo'/>

                    <div className='cardNumberContainer'>
                        {/* These Numbers will eventually become a state derived variable */}
                        <p className='cardNumberDigits'>0000</p>
                        <p className='cardNumberDigits'>0000</p>
                        <p className='cardNumberDigits'>0000</p>
                        <p className='cardNumberDigits'>0000</p>
                    </div>

                    <div className='cardHolderName'>
                        {cardHolderName ? cardHolderName : 'Jane Appleseed'}
                    </div>

                    <div className='cardExpDateContainer'>
                        <p className='cardExpDate'>
                            00 
                            {/* This number will eventually become a state derived variable */}
                        </p>
                        <p className='cardExpDate'>
                            /
                        </p>
                        <p className='cardExpDate'>
                            00
                            {/* This number will eventually become a state derived variable */}
                        </p>


                    </div>

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

            
            {confirmationPage ? 
                <div className='thankYouContainer'>
                    <ThankYouLogo className='thankYouLogo'/>
                    <h2 className='thankYouHeader'>
                        Thank You!
                    </h2>
                    <h3 className='thankYouContent'>
                        We've added your card details
                    </h3>

                    <button type="submit" className='cardFormButton' id='thankYouButton' onClick={(e)=> {
                            clickConfirm(e);
                        }}>
                        Continue
                    </button>

                </div> :
                <div className='cardFormContainer'>
                <form>
                    <fieldset className='cardFormFieldset'>
                        <legend><span>Card Form</span></legend>
                        {/* Found this span wrapper for legends on stackoverflow - see the CSS for explanation as to why this works } */}

                        <p className='cardFieldContainer'>
                            <label htmlFor='cardholderNameField'>Cardholder Name</label>
                            <input type="text" id="formCardholderName" name="cardholderNameField" value={cardHolderName} placeholder={'e.g. Jane Appleseed'} onChange={(e)=> {
                                    e.preventDefault();
                                    changeCardHolderName(e);
                            }} required/>

                        </p> 

                        <p className='cardFieldContainer'>
                            <label htmlFor='cardholderNumberField'>Card Number</label>
                            <input type="number" id="formCardholderNumber" name="cardholderNumberField" value={''} placeholder={'e.g. 1234 5678 9123 0000'} required/>
                        </p>

                        <div className='cardExpCVCContainer'>
                            <p className='cardFieldContainer' id='cardFieldExpMM'>
                                <label htmlFor='cardExpFieldMM'>EXP. Date </label>
                                <input type="number" id="formCardExpMM" name="cardExpFieldMM" value={''} placeholder={'MM'} required/>
                            </p>

                            <p className='cardFieldContainer' id='cardFieldExpYY'>
                                <label htmlFor='cardExpFieldYY'> (MM/YY) </label>
                                <input type="number" id="formCardExpYY" name="cardExpFieldYY" value={''} placeholder={'YY'} required/>
                            </p>

                            <p className='cardFieldContainer' id='cardFieldCVC'>
                                <label htmlFor='cardExpFieldCVC'> CVC </label>
                                <input type="number" id="formCardExpCVC" name="cardExpFieldCVC" value={''} placeholder={'e.g. 123'} maxLength={3} required/>
                            </p>



                        </div>               

                        <button type="submit" className='cardFormButton' onClick={(e)=> {
                            clickConfirm(e);
                        }}>
                            Confirm
                        </button>

                    </fieldset>
                </form>

            {/* This is variable! It will either be
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

                    Continue button */}


                </div> 
            }

            


            

        </div>

    )
}

export default CardDetailsForm;