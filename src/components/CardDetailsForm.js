import React, {useState, useEffect, isValidElement} from 'react';
import '../styles/CardDetailsForm.scss';

import mobileBG from '../assets/bg-main-mobile.png';
import desktopBG from '../assets/bg-main-desktop.png';

import bgCardBack from '../assets/bg-card-back.png';
import bgCardFront from '../assets/bg-card-front.png';
import {ReactComponent as CardLogo} from '../assets/card-logo.svg';
import {ReactComponent as ThankYouLogo} from '../assets/icon-complete.svg'
import { type } from '@testing-library/user-event/dist/type';

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
        let isFormValid = true;
        console.log(`Performing state check`);
        console.log(`Initial isFormValid`, isFormValid);
        console.log(`Cardholder Name: `, cardHolderName);
        console.log(`Card Number: `, cardHolderNumber);
        console.log(`Card EXP MM: `, cardHolderExpMM);
        console.log(`Card EXP YY: `, cardHolderExpYY, typeof(Number(cardHolderExpYY)));
        console.log(`Card CVC: `, cardHolderCVC);

        // Instead of doing many nested if statements, I'll create one master boolean for isValid, running separate validity checks that can individually disable it, for better readability

        if(cardHolderName.length === 0){
            console.log('cardHolderName.length === 0')
            toggleCardHolderNameEmptyError(true);
            isFormValid = false;
        }

        if(cardHolderNumber.length < 16){
            console.log(`cardHolderNumber.length < 16`)
            isFormValid = false;
            togggleCardHolderLengthNotification(true);
        }

        if(cardHolderExpMM.length === 0 || cardHolderExpMM === '0'){
            console.log(`cardHolderMM is either empty or set to invalid 0`);
            isFormValid = false;
            toggleCardHolderMMError(true);
        }

        // let numExpYY = Number(cardHolderExpYY)
        if(cardHolderExpYY.length === 0){
            console.log(`cardHolderYY is empty`);
            isFormValid = false;
            toggleCardHolderYYError(true);
        } else if(Number(cardHolderExpYY) < 23) {
            console.log(`Card is expired`);
            isFormValid = false;
            toggleCardHolderYYError(true);
            toggleCardHolderYYExpired(true);
        }

        if(cardHolderCVC.length === 0){
            console.log(`cardHolderCVC is empty`)
            isFormValid = false;
            toggleCardHolderCVCError(true);
        }
        


        console.log('Final validitiy check, isFormValid is currently ', isFormValid)
        isFormValid && toggleConfirmationPage(!confirmationPage);
    }

    const [cardHolderName, updateCardHolderName] = useState('');
    function changeCardHolderName(e){
        e.preventDefault();
        // After this empty error is triggered, any state update, even to an empty field, hides the error notification
        toggleCardHolderNameEmptyError(false);

        updateCardHolderName(e.target.value);
    }
    const [cardHolderNameEmptyError, toggleCardHolderNameEmptyError] = useState(false);

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

            // Validation check for cardHolderNumber length
            // console.log(parts.join('').length)
            // if(parts.join('').length < 16) {
            //     togggleCardHolderLengthNotification(true);
            // } else {

            // }

            parts.join('').length < 16 ? togggleCardHolderLengthNotification(true) : togggleCardHolderLengthNotification(false);

        } else {
            // console.log(v);
            updateCardHolderNumber(v)
            updateCardHolderNumberDisplay(v)
            
            // Validation check for cardHolderNumber length
            // console.log(v.length, "length");
            v.length === 0 ? togggleCardHolderLengthNotification(false) : togggleCardHolderLengthNotification(true)
            // return ccnum;
        }
    }

    const [cardHolderLengthNotification, togggleCardHolderLengthNotification] = useState(false);

    const [cardHolderExpMM, updateCardHolderExpMM] = useState('');
    function changeCardHolderExpMM(e){
        e.preventDefault();

        // Validation check on ExpMM
        let newMM = e.target.value.slice(0,2); // Only accept 2 digits
        let numMM = Number(newMM); // Convert string to number
        // console.log('numMM: ', numMM, typeof(numMM));
        // Only accept empty field and numbers between 1-12
        if((numMM >= 0 && numMM < 13 || newMM === '') && newMM !== '00' ) { 
            updateCardHolderExpMM(newMM);
        }
    }
    const [cardHolderMMError, toggleCardHolderMMError] = useState(false);

    const [cardHolderExpYY, updateCardHolderExpYY] = useState('');
    function changeCardHolderExpYY(e){
        e.preventDefault()

        // Validation check on ExpYY
        let newYY = e.target.value.slice(0,2); // Only accept 2 digits
        let numYY = Number(newYY); // Convert string to number
        // Only accept empty field and numbers above 22
        if((newYY.length >= 1) || newYY === '') { 
            updateCardHolderExpYY(newYY);
        }
        // updateCardHolderExpYY(e.target.value.slice(0,2));
    }
    const [cardHolderYYError, toggleCardHolderYYError] = useState(false);
    const [cardHolderYYExpired, toggleCardHolderYYExpired] = useState(false);


    const [cardHolderCVC, updateCardHolderCVC] = useState('');
    function changeCardHolderCVC(e){
        e.preventDefault()
        updateCardHolderCVC(e.target.value.slice(0, 3));
    }
    const [cardHolderCVCError, toggleCardHolderCVCError] = useState(false);


    return(
        <div className='cardDetailsForm'>

            {/* I am Card Details Form. */}


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
                        <p className='cardNumberDigits'>{cardHolderNumberDisplay ? cardHolderNumberDisplay : '0000 0000 0000 0000'}</p>
                    </div>

                    <div className='cardHolderName'>
                        {cardHolderName ? cardHolderName : 'Jane Appleseed'}
                    </div>

                    <div className='cardExpDateContainer'>
                        <p className='cardExpDate'>
                            {cardHolderExpMM ? cardHolderExpMM : '00'} 
                        </p>
                        <p className='cardExpDate'>
                            /
                        </p>
                        <p className='cardExpDate'>
                            {cardHolderExpYY ? cardHolderExpYY : '00'} 
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
                            <input type="text" id={cardHolderNameEmptyError ? "formCardHolderNameInvalid" :"formCardholderName"} name="cardholderNameField" value={cardHolderName} placeholder={'e.g. Jane Appleseed'} onChange={(e)=> {
                                    changeCardHolderName(e);
                            }} onFocus={() => toggleCardHolderNameEmptyError(false)} required/>
                            <p className='blankFieldError'>
                                Can't Be Blank
                            </p>
                            {cardHolderNameEmptyError && <p className='emptyFieldError'>
                                    Can't be blank!
                                </p>}

                        </div> 

                        <div className='cardFieldContainer'>
                            <label htmlFor='cardholderNumberField'>Card Number</label>
                            <input type="text" id={cardHolderLengthNotification ? "formCardHolderNumberInvalid" : "formCardholderNumber"} name="cardholderNumberField" value={''} placeholder={'e.g. 1234 5678 9123 0000'} onChange={(e) => {
                                    e.preventDefault();
                                    cc_format(e.target.value);
                            }} onFocus={() => togggleCardHolderLengthNotification(false)} value={cardHolderNumberDisplay} pattern='\d{4}(\s\d{4}){3}' required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                                {cardHolderLengthNotification && 
                                <p className='lengthFieldError'>
                                    Not Long Enough
                                </p>
                                }
                                
                        </div>

                        <div className='cardExpCVCContainer'>
                            <div className='cardFieldContainer' id='cardFieldExpMM'>
                                <label htmlFor='cardExpFieldMM'>EXP. Date </label>
                                <input type="number" id={cardHolderMMError ? "formCardExpMMInvalid" : "formCardExpMM"} name="cardExpFieldMM" value={cardHolderExpMM} onChange={(e) => 
                                        changeCardHolderExpMM(e)} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                                        onFocus={() => toggleCardHolderMMError(false)}
                                         placeholder={'MM'} maxLength="2" required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                                {cardHolderMMError && <p className='emptyFieldError'>
                                    Can't Be Blank
                                </p>}
                                
                            </div>

                            <div className='cardFieldContainer' id='cardFieldExpYY'>
                                <label htmlFor='cardExpFieldYY'> (MM/YY) </label>
                                <input type="number" id={cardHolderYYError ? "formCardExpYYInvalid" : "formCardExpYY"} name="cardExpFieldYY" value={cardHolderExpYY} onChange={(e) => changeCardHolderExpYY(e)} onFocus={() => {
                                        toggleCardHolderYYError(false);
                                        toggleCardHolderYYExpired(false);
                                }} maxLength="2" placeholder={'YY'} required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                                {cardHolderYYError && <p className='emptyFieldError'>
                                    {cardHolderYYExpired ? 'Expired' : `Can't Be Blank`}
                                </p>}
                            </div>

                            <div className='cardFieldContainer' id='cardFieldCVC'>
                                <label htmlFor='cardExpFieldCVC'> CVC </label>
                                <input type="number" id={cardHolderCVCError ? "formCardExpCVCInvalid" : "formCardExpCVC"} name="cardExpFieldCVC" value={cardHolderCVC} onChange={(e) => changeCardHolderCVC(e)} onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()} onFocus={() => {
                                        toggleCardHolderCVCError(false)
                                }} placeholder={'e.g. 123'} maxLength="3" required/>
                                <p className='blankFieldError'>
                                    Can't Be Blank
                                </p>
                                {cardHolderCVCError && <p className='emptyFieldError'>
                                        Can't Be Blank
                                    </p>}
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