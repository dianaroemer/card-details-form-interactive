

# [Frontend Mentor - Interactive card details form solution](https://dianaroemer.github.io/card-details-form-interactive/)

This is a solution to the [Interactive card details form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-card-details-form-XpS8cKZDWw). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- Fill in the form and see the card details update in real-time
- Receive error messages when the form is submitted if:
  - Any input field is empty
  - The card number, expiry date, or CVC fields are in the wrong format
- View the optimal layout depending on their device's screen size
- See hover, active, and focus states for interactive elements on the page

### Screenshot

- Desktop Form (Designed for 1440x900 displays)
![A desktop display of the base form, with all fields showing empty placeholder values](https://github.com/dianaroemer/card-details-form-interactive/blob/main/src/screenshots/screen-desktop.png)
- Desktop Form Active States
![A desktop display of the form showing some of the forms filled in](https://github.com/dianaroemer/card-details-form-interactive/blob/main/src/screenshots/screen-desktop-active-states.png)
- Desktop Form Form Completion
![A desktop display of the form upcon completion](https://github.com/dianaroemer/card-details-form-interactive/blob/main/src/screenshots/screen-desktop-thanks.png)
- Desktop Form Error States
![A desktop display of the form showing some of the various error states](https://github.com/dianaroemer/card-details-form-interactive/blob/main/src/screenshots/screen-desktop-error-states.png)
- Mobile Form (designed for 375x700)
![A Mobile display of the form](https://github.com/dianaroemer/card-details-form-interactive/blob/main/src/screenshots/screen-mobile.png)



### Links

- Solution URL: [Github](https://github.com/dianaroemer/card-details-form-interactive)
- Live Site URL: [Github Livepage](https://dianaroemer.github.io/card-details-form-interactive/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Google Bard](bard.google.com) - Provided insights into understanding JS form validation
- [How to block +,-,e in input type Number](https://stackoverflow.com/questions/39291997/how-to-block-e-in-input-type-number)
- [Pixlr](pixlr.com) - Free Photoshop in browser, used to check design details like rgb of certain elements and number of pixels separating elements in layout.


### What I learned

When positioning an element relative to its parent, if any transformX or Y is applied to the parent, ensure that the child elements use the same method of transform to ensure similar scaling and movement across responsive viewports. In the future, practice pinning elements to exact spots on their parent element using position absolute. 

A CSS filter effect also applies its effect to any visible children.

Form error management in React can be simultaneously powerful and complicated. Using HTML's innate form management with CSS pseudo-class selectors gives a fairly straightforward method of generating intelligent forms, however React's internal state management can give much more finely grained control of how to build intelligent forms. For example, using a CSS sibling selector in an error field with its native styling set to `display:none;`, it can be easy to toggle the `display:box;` whenever the form generates an error according to a regex or empty criteria. That said, using a regex pattern or built-in HTML pseudo-states can be somewhat limiting in how and when I show the user errors. For example, I don't want to show any errors to the user unless they deliberately a validation criteria, or unless they try to submit an invalid form, in which case, I want to highlight all of the failed validation patterns for the user to fix. With React's built in state management, that should be fairly straightforward if I establish the HTML form with state management and validation in mind. 
  With this application, I didn't use a React based validation system, and instead am relying on primitive regex pattern validation. In the future, I would like to manage validation with React's state, and only show appropriate errors to the user when they're called for. For example, using state to track if a field is empty, whether the field is invalid, whether the user has tried to submit the form and return the appropriate errors back relative to the forms that fail validation (for example, the difference between showing the user "This field can't be empty!" and "This field is invalid!")

  There is a known bug when responsively adjusting the page from desktop view to mobile wherein the stacking on the display cards breaks the page layout. Simply refresh the page to return to normal functionality.

  Form validation is a journey in and of itself. I'm glad that I now understand the two types of validation, live validation with updates on each key-press (which is more difficulty, even with pattern expressions) and triggered validation, which will only check for validation on a single specific event, and can be more finely tuned. Using state management for validity provides some easy knobs to tweak different outputs in different contexts, though I have to wonder about the simplicity of HTML's fairly straightforward setCustomValidity, and would like to explore that functinoality more in the future.




### Continued development

Explore form validation and semantic form structures more. I feel as if my default whenever doing any input of any kind is to immediately throw ``e.preventDefault()`` because built in event behavior doesn't always work intuitively. I'd like to understand events and event bubbling in better contexts. 



### Useful resources

 - [MDN How to structure a web form](https://developer.mozilla.org/en-US/docs/Learn/Forms/How_to_structure_a_web_form) - Gave me the appropriate semantic HTML for structuring and building an accessible web form.
 - [Credit Card Formatter Function](https://www.peterbe.com/plog/cc-formatter) - The function described on this website gave me a baseline to give the user an easier field to read than 16 numbers consecutively, by adding spaces every fourth number. I modified it slightly to prevent any inputs of a character that isn't a digit.


## Author

- Website - [Diana Roemer](https://github.com/dianaroemer)
- Frontend Mentor - [FrontEnd Mentor](https://www.frontendmentor.io/profile/dominicroemer)
