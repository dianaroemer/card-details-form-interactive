import React, {useState} from 'react';
// import '../styles/CardDetailsForm.scss';

function CardDetailsForm(props) {

    return(
        <div className='cardDetailsForm'>

            I am Card Details Form.

            I will house sub-components

            <div className='displayCardContainer'>
                Aaaall of that goes here
                Some kinda background image, woooohoo look at that
                Backwards card Container
                    Backwards Card image   
                    CVC text
                Front facing card container
                    Front facing CC image  
                    CC Logo?
                    Credit Card Numbers
                    Credit Card name
                    Credit Card Expiration Date``

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