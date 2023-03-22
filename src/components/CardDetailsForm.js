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


    const [confirmationPage, toggleConfirmationPage] = useState(false);

    function clickConfirm(e){
        e.preventDefault();

        // Perform validation check to decide if page is correct - if no validation errors, go to confirmation page, else show errors
        console.log(`Performing state check`);
        console.log(`Cardholder Name: `, cardHolderName);
        console.log(`Card Number: `, cardHolderNumber);
        console.log(`Card EXP MM: `, cardHolderExpMM);
        console.log(`Card EXP YY: `, cardHolderExpYY);
        console.log(`Card CVC: `, cardHolderCVC);


        toggleConfirmationPage(!confirmationPage);
    }

    const [cardHolderName, updateCardHolderName] = useState('');
    function changeCardHolderName(e){
        e.preventDefault();
        updateCardHolderName(e.target.value);
    }

    // This state is a parsed out version of CardHolderNumberDisplay without the spaces. 
    const [cardHolderNumber, updateCardHolderNumber] = useState('');
    // This state is the cardHolderNumber that is displayed to the user in graphic and the form, with spaces integrated for easier readability
    const [cardHolderNumberDisplay, updateCardHolderNumberDisplay] = useState('');
    function cc_format(ccnum) {
        let v = ccnum.replace(/\s+/g, '').replace(/[^0-9]/g, '')
        // console.log('v', v)
        let matches = v.match(/\d{4,16}/g);
        // console.log('matches', matches);
        let match = matches && matches[0] || '';
        // console.log('match', match);
        let parts = [];
        for( let i=0, len=match.length; i<len; i+=4) {
            parts.push(match.substring(i, i+4))
        }
        if (parts.length) {
            // console.log(parts.join(' '))
            // return parts.join(' ');
            updateCardHolderNumber(parts.join(''));
            updateCardHolderNumberDisplay(parts.join(' '))
        } else {
            // console.log(v);
            updateCardHolderNumber(v)
            updateCardHolderNumberDisplay(v)
            // return ccnum;
        }
    }

    const [cardHolderExpMM, updateCardHolderExpMM] = useState('');
    function changeCardHolderExpMM(e){
        e.preventDefault();

        // Validation check on ExpMM
        let newMM = e.target.value.slice(0,2); // Only accept 2 digits
        let numMM = Number(newMM); // Convert string to number
        // console.log('numMM: ', numMM, typeof(numMM));
        // Only accept empty field and numbers between 1-12
        if(numMM >= 0 && numMM < 13 || newMM === '' ) { 
            updateCardHolderExpMM(newMM);
        }
    }

    const [cardHolderExpYY, updateCardHolderExpYY] = useState('');
    function changeCardHolderExpYY(e){
        e.preventDefault()

        // Validation check on ExpYY
        let newYY = e.target.value.slice(0,2); // Only accept 2 digits
        let numYY = Number(newYY); // Convert string to number
        // Only accept empty field and numbers above 22
        if((newYY.length == 1) || (numYY > 22) || newYY === '') { 
            updateCardHolderExpYY(newYY);
        }
        // updateCardHolderExpYY(e.target.value.slice(0,2));
    }

    const [cardHolderCVC, updateCardHolderCVC] = useState('');
    function changeCardHolderCVC(e){
        e.preventDefault()
        updateCardHolderCVC(e.target.value.slice(0, 3));
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
                    {!isMobileViewport && 
                        <img src={bgCardFront} alt='The drop shadow for the front of the credit card' className='bg-card-back-shadow'/>}
                    <img src={bgCardBack} alt='The back of a credit card' className='bg-card-back'/>
                    <p className='cvcContent'>
                        {cardHolderCVC ? cardHolderCVC : '000'}
                    </p>
                </div>

                <div className='frontCardContainer'>

                    <img src={bgCardFront} alt='The drop shadow for the front of the credit card' className='bg-card-front-shadow'/>
                    <img src={bgCardFront} alt='The front of a credit card' className='bg-card-front'/>
                    <CardLogo className='front-card-logo'/>

                    <div className='cardNumberContainer'>
                        {/* These Numbers will eventually become a state derived variable */}
                        <p className='cardNumberDigits'>{cardHolderNumberDisplay ? cardHolderNumberDisplay : '0000 0000 0000 0000'}</p>
                    </div>

                    <div className='cardHolderName'>
                        {cardHolderName ? cardHolderName : 'Jane Appleseed'}
                    </div>

                    <div className='cardExpDateContainer'>
                        <p className='cardExpDate'>
                            {cardHolderExpMM ? cardHolderExpMM : '00'} 
                            {/* This number will eventually become a state derived variable */}
                        </p>
                        <p className='cardExpDate'>
                            /
                        </p>
                        <p className='cardExpDate'>
                        {cardHolderExpYY ? cardHolderExpYY : '00'} 
                            {/* This number will eventually become a state derived variable */}
                        </p>


                    </div>

                </div>


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

                        <div className='cardFieldContainer'>
                            <label htmlFor='cardholderNameField'>Cardholder Name</label>
                            <input type="text" id="formCardholderName" name="cardholderNameField" value={cardHolderName} placeholder={'e.g. Jane Appleseed'} onChange={(e)=> {
                                    changeCardHolderName(e);
                            }} required/>
                            <p className='blankFieldError'>
                                Can't Be Blank
                            </p>

                        </div> 

                        <div className='cardFieldContainer'>
                            <label htmlFor='cardholderNumberField'>Card Number</label>
                            <input type="text" id="formCardholderNumber" name="cardholderNumberField" value={''} placeholder={'e.g. 1234 5678 9123 0000'} onChange={(e) => {
                                    e.preventDefault();
                                    cc_format(e.target.value);
                            }} value={cardHolderNumberDisplay} pattern='\d{4}(\s\d{4}){3}' required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                        </div>

                        <div className='cardExpCVCContainer'>
                            <div className='cardFieldContainer' id='cardFieldExpMM'>
                                <label htmlFor='cardExpFieldMM'>EXP. Date </label>
                                <input type="number" id="formCardExpMM" name="cardExpFieldMM" value={cardHolderExpMM} onChange={(e) => 
                                        changeCardHolderExpMM(e)} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                         placeholder={'MM'} maxLength="2" required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                            </div>

                            <div className='cardFieldContainer' id='cardFieldExpYY'>
                                <label htmlFor='cardExpFieldYY'> (MM/YY) </label>
                                <input type="number" id="formCardExpYY" name="cardExpFieldYY" value={cardHolderExpYY} onChange={(e) => changeCardHolderExpYY(e)} maxLength="2" placeholder={'YY'} required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                            </div>

                            <div className='cardFieldContainer' id='cardFieldCVC'>
                                <label htmlFor='cardExpFieldCVC'> CVC </label>
                                <input type="number" id="formCardExpCVC" name="cardExpFieldCVC" value={cardHolderCVC} onChange={(e) => changeCardHolderCVC(e)} placeholder={'e.g. 123'} maxLength="3" required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                            </div>



                        </div>               

                        <button type="submit" className='cardFormButton' onClick={(e)=> {
                            clickConfirm(e);
                        }}>
                            Confirm
                        </button>

                    </fieldset>
                </form>

        

                </div> 
            }
            

        </div>

    )
}

export default CardDetailsForm;