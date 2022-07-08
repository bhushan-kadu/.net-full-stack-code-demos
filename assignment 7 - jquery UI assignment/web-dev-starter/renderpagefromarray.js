//array = [name, inner, attributes]
let pageArray = ["body", [
    [
        'header', [
            ['img', "", { id: 'imgLogo', src: 'logo.png' }],
            ['div', 'Run business with ease ...', { id: 'pageTitle' }]
        ], ""
    ],
    ['img', "", {
        id: 'imgBanner',
        src: 'banner.png',
        alt: 'banner',
        style: 'float: left; height: 450px;'
    }],
    ['div', [
        ['div', 'Sign In To OFFICEBOX', { id: 'labelFormTitle' }],
        ['div', [
            ['div', [
                ['textNode', "Subscriber Code:", null],
                ['div', '*', { class: 'divStar', style: 'margin-left: 0px' }],
            ], { style: 'margin-bottom: 5px', class: 'form-field-label' }],
            ['div', [
                ['input', "", { class: 'inputBoxNumber', type: 'number', id: 'txtSubsciberId1', style: 'margin-left: 0px' }],
                ['input', "", { class: 'inputBoxNumber', type: 'number', id: 'txtSubsciberId1' }],
                ['input', "", { class: 'inputBoxNumber', type: 'number', id: 'txtSubsciberId1' }],
                ['input', "", { class: 'inputBoxNumber', type: 'number', id: 'txtSubsciberId1', style: 'margin-bottom: 5px' }]
            ], { class: 'form-field-input' }]
        ], { class: 'form-field' }],
        ['div', [
            ['div', [
                ['textNode', "User Name:", null],
                ['div', '*', { class: 'divStar' }],
            ], { class: 'form-field-label' }],
            ['div', [
                ['input', "", { class: 'namePassInput-field', type: 'text', id: 'txtName' }]
            ], { class: 'form-field-input' }]
        ], { class: 'form-field' }],
        ['div', [
            ['div', [
                ['textNode', "Password:", null],
                ['div', '*', { class: 'divStar' }],
            ], { class: 'form-field-label' }],
            ['div', [
                ['input', "", { class: 'namePassInput-field', type: 'text', id: 'txtPassword', style: 'margin-bottom: 10px' }]
            ], { class: 'form-field-input' }]
        ], { class: 'form-field' }],
        ['div', [
            ['div', [
                ['input', "", { type: 'checkbox', id: "cbxRememberMe", style: "margin-left: -4px;" }],
                ['div', "Remember me on this Computer", { class: "form-field-label", style: "display: inline-block; margin-bottom: 16px;" }]
            ], { class: 'form-field-input' }]
        ], { class: 'form-field' }],
        ['button', 'Login', { id: 'btnLogin1' }],
        ['div', [
            ['a', "Can\'t acess your account?", { class: 'forgotPassLink', style: 'display: block;' }],
            ['a', "Change Password", { class: 'forgotPassLink' }]
        ], { class: 'links' }]
    ], { class: 'pnlForm-box' }],
    ['footer', '(C) 2009 - 2019 Bizsense Solutions Pvt Ltd.', { style: 'font-weight: bold' }]
], null]

//array = [name, inner, attributes]

function renderPage(input) {
    debugger;
    let element = createAHtmlElement(input[0], input[2]);
    let innerItems = input[1]

    if (Array.isArray(innerItems)) {
        innerItems.forEach(function(item) {
            element.append(renderPage(item));
        })
    } else element.text(innerItems)

    return element;
}

let page = renderPage(pageArray);
$('html').append(page);