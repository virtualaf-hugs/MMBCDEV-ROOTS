/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import $ from 'jquery';


export default class Custom_Cart {
    onReady() {
        console.log('initializing Custom_Cart class');
    }
    
    /******************************************************************************************/
    //                                     TEST DATA
    /******************************************************************************************/
    init() {
        window['fetchCart'] = this.fetchCart;
        window['addCartItems'] = this.addCartItems;
        window['addCartItems2'] = this.addCartItems2;
        window['getCart'] = this.getCart;
        window['getLineItems'] = this.getLineItems;
        window['cart2API'] = this.cart2API;
        window['getCartQty'] = this.getCartQty;
        //window['bindCartEvents'] = this.bindCartEvents;
        window['updateCart'] = this.updateCart;
        window['refreshContent'] = this.refreshContent;
        window['execascade'] = this.execascade;
        window['lineItemTest'] = this.getTestData;
        window['lineItemTest2'] = this.getTestData2;
        window['returnCartQty'] = this.returnCartQty;
    }

    getTestData() {
        return JSON.stringify({
            'lineItems': [{
                'quantity': 3,
                'productId': 116,
                'variantId': 96
            }, {
                'quantity': 1,
                'productId': 117,
                'variantId': 97
            }]
        });
    }

    getTestData2() {
        return [{
                'quantity': 3,
                'productId': 116,
                'variantId': 96
            }, {
                'quantity': 1,
                'productId': 117,
                'variantId': 97
            }];
    }

    parseCookies() {
        return (document.cookie.split(/; */).reduce((obj, str) => {
            if (str === '')
                return obj;
            var eq = str.indexOf('=');
            var key = eq > 0 ? str.slice(0, eq) : str;
            let val = eq > 0 ? str.slice(eq + 1) : null;
            if (val != null)
                try {
                    val = decodeURIComponent(val);
                }
            catch (ex) {
                /* pass */ }
            obj[key] = val;
            return obj;
        }, {})); 
    }

    /******************************************************************************************/
    //                  GET CART USING FETCH API AND COOKIE SETTER
    /******************************************************************************************/
    fetchCart() {
        if (location.pathname == '/cart.php') {
            window.$cartContent = $('[data-cart-content]');
            window.$cartMessages = $('[data-cart-status]');
            window.$cartTotals = $('[data-cart-totals]');
        }
        
        fetch('/api/storefront/carts/', {
                credentials: 'include'
            }).then(response => response.json())
            .then(response => {
                window['cartData'] = response[0];
                window['currentItems'] = response[0].lineItems;
                return Promise.resolve(response[0]);
            }).then(function(data) {
                console.log('***********\n' +
                    ' CART DATA \n' +
                    '***********'), console.log(data);
                console.log('***********\n' +
                    'PHYS ITEMS\n' +
                    '***********'), console.log(data.lineItems.physicalItems);
                console.log('***********\n ' +
                    ' CART ID \n' +
                    '***********'), console.log(data.id);
                document.cookie = 'cart_id=' + String(data.id);
                window['bc_cookie'] = parseCookies();
                console.log('***********'), console.log('success...cart_id cookie loaded');
            }).catch(function() {
                console.log('cart load had errors.');
                window['bc_cookie'] = parseCookies();
            });
    }
    /******************************************************************************************/
    //                       STOREFRONT API ADD TO CART FUNCTION
    /******************************************************************************************/
    addCartItems(cartId, messageData, callback) {
        var xhr = new XMLHttpRequest(),
            postURL = ((typeof cartId !== 'undefined' && cartId !== 'null') && cartId ?
                '/api/storefront/carts/' + cartId + '/items' :
                '/api/storefront/carts/');
        xhr.withCredentials = true;

        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === XMLHttpRequest.DONE) {
                let cartQty = 0;
                return Promise.resolve(JSON.parse(this.response))
                .then((data) => 
                {
                    let lineItems = data.lineItems;
                    return Promise.resolve(lineItems)
                })
                .then((data) => 
                {
                    Promise.resolve(Object.entries(data).forEach(([key, value]) => {
                        console.log('calculating quantity for: ' + key);
                        cartQty += getCartQty(value);
                    })).then(() => {
                        window['addCartQty'] = cartQty;
                        console.log('Calculated Cart Quantity = ' + cartQty);
                        return Promise.resolve(true);
                    }).then((data) => {
                        if (data === true) {
                            (typeof cartId == 'undefined' || !cartId || (String(cartId).length < 36)) ?
                            (getCart(), callback()) : callback();
                        }
                    });
                });
            }
        });
        xhr.open('POST', postURL);
        xhr.setRequestHeader('content-type', 'application/json');
        try {
            console.log('Add-to-Cart Route Set to POST URL: ' + postURL);
            xhr.send(messageData);
        } catch (err) {
            console.log(err);
        }
    }

    /******************************************************************************************/
    //           STOREFRONT API ADD TO CART FUNCTION AWAIT FETCH ARRAY LINEITEMS
    /******************************************************************************************/
    addCartItems2(lineItems, callback) {
        if (lineItems.length > 0) {
            console.log('Adding items to your cart...');
            fetch('/api/storefront/cart')
                .then(response => response.json())
                .then(cart => {
                    if(cart.length > 0) {
                        return addToExistingCart(cart[0].id);
                    } else {
                        return createNewCart();
                    }
                })
                .catch(err => console.log(err));
        }
        async function createNewCart() {
            let cartQty = 0;
            const response = await fetch('/api/storefront/carts', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({'lineItems': lineItems})
            });
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject('There was an issue adding items to your cart. Please try again.')
            } else {
                document.cookie = 'cart_id=' + String(data.id); 
                return Promise.resolve(data)
                .then((data) => 
                {
                    let lineItems = data.lineItems;
                    return Promise.resolve(lineItems)
                })
                .then((data) => 
                {
                    Promise.resolve(Object.entries(data).forEach(([key, value]) => {
                        console.log('calculating quantity for: ' + key);
                        cartQty += getCartQty(value);
                    })).then(() => {
                        window['addCartQty'] = cartQty;
                        console.log('Calculated Cart Quantity = ' + cartQty);
                        return Promise.resolve(true);
                    }).then((data) => {
                        if (data === true) {
                            callback();
                        }
                    });
                });
            }
        }
        async function addToExistingCart(cart_id) {
            let cartQty = 0;
            const response = await fetch(`/api/storefront/carts/${cart_id}/items`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({'lineItems': lineItems})
            });
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject('There was an issue adding items to your cart. Please try again.')
            } else {
                document.cookie = 'cart_id=' + String(data.id);
                return Promise.resolve(data)
                .then((data) => 
                {
                    let lineItems = data.lineItems;
                    return Promise.resolve(lineItems)
                })
                .then((data) => 
                {
                    Promise.resolve(Object.entries(data).forEach(([key, value]) => {
                        console.log('calculating quantity for: ' + key);
                        cartQty += getCartQty(value);
                    })).then(() => {
                        window['addCartQty'] = cartQty;
                        console.log('Calculated Cart Quantity = ' + cartQty);
                        return Promise.resolve(true);
                    }).then((data) => {
                        if (data === true) {
                            callback();
                        }
                    });
                });
            }
        }
    }

    /******************************************************************************************/
    //                                GET CART USING AJAX
    /******************************************************************************************/

    getCart() {
        let cartCheck;
        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = 'expires=' + d.toUTCString();
            document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
        }
        typeof cartObjectData === 'undefined' || (cartObjectData ? cartObjectData.length == 0 : false) ? window.cartObjectData = {} : null;
        typeof AJAXSettings === 'undefined' ? window.AJAXSettings = {} : null;
        cartObjectData, AJAXSettings = {
            'async': true,
            'crossDomain': true,
            'url': '/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options',
            'method': 'GET',
            'headers': {}
        };
        return Promise.resolve($.ajax(AJAXSettings).then(function(responseText) {
            Promise.resolve(JSON.stringify(responseText, null, 3))
            .then((data) => {
                cartObjectData = JSON.parse(data);
                return Promise.resolve(cartObjectData)
                .then((parsedData)=>{
                    if(parsedData.length === 0) {
                        setCookie('cart_id','',-1);
                        window['bc_cookie'] = parseCookies();
                        cartCheck = false;
                    } else {
                        setCookie('cart_id', String(parsedData[0].id));
                        window['bc_cookie'] = parseCookies();
                        cartCheck = true;
                    }   
                });
                
            });
        })).then(()=>{return cartCheck});
    }

    /******************************************************************************************/
    //                                GET LINE ITEMS FROM CART FOR API
    /******************************************************************************************/

    getLineItems(cartData) {
        let physicalItems = JSON.stringify(cartData[0].lineItems.physicalItems, ['quantity', 'productId', 'variantId']),
            digitalItems = JSON.stringify(cartData[0].lineItems.digitalItems, ['quantity', 'productId', 'variantId']);
        return JSON.stringify({
            'lineItems': $.merge(JSON.parse(physicalItems), JSON.parse(digitalItems))
        });
    }
    /******************************************************************************************/
    //                                VANILLA ARRAY CART QTY 
    /******************************************************************************************/
    cart2API(cartData) {
        return JSON.stringify({
            'lineItems': JSON.stringify({
                'lineItems': getLineItems(cartData)
            })
        });
    }

    /******************************************************************************************/
    //                                VANILLA ARRAY CART QTY 
    /******************************************************************************************/
    getCartQty(cartArray) {
        var i;
        var cartQty = 0;
        for (i = 0; i < cartArray.length; i++) {
            cartQty += cartArray[i].quantity;
        }
        return cartQty;
    }

    
    /******************************************************************************************/
    //                        FETCH API SAMPLE OUTPUTEXPAMPLE
    /******************************************************************************************/

    /* fetch('/api/storefront/carts/', {
        credentials: 'include'
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            window.responseData = myJson;
            console.log('Response Details: ' + myJson['detail']);
            console.log('Response Status: ' + myJson['status']);
            console.log('Response Title: ' + myJson['title']);
            console.log('Response Type: ' + myJson['type']);
        }).then(function() {
            console.log(window.responseData);
        }); 
    */
    /******************************************************************************************/
    //                       AJAX QTY UPDATE FROM CALCULATED FROM LINE ITEMS 
    /******************************************************************************************/
    updateCart() {
        try {
            AJAXSettings = {
                'cache': false,
                'async': true,
                'xhrFields': {
                    'withCredentials': true
                },
                'crossDomain': true,
                'url': '/api/storefront/carts',
                'method': 'GET',
                'dataType': 'json',
                'headers': {
                    'accept': 'application/json'
                }
            };
            $.ajax(AJAXSettings).then(function(data) {
                cartObjectData = JSON.parse(JSON.stringify(data, null, 3));
                return Promise.resolve(JSON.parse(getLineItems(cartObjectData)));
            }).done(function(data) {
                window.lineItems = data.lineItems;
                $('.cart-quantity').html(returnCartQty());
                console.log({
                    lineItems
                });
                console.log($('.cart-quantity').text());
                console.log('cart nav updated');
            });
        } catch (err) {
            console.log(err);
        }
    }

    /****************************************************************

        Refresh Cart Content Dynamically Via Storefront API

    /******************************************************************/
    refreshContent(remove, cartQTY) {    
        window.$cartContent = $('[data-cart-content]');
        window.$cartMessages = $('[data-cart-status]');
        window.$cartTotals = $('[data-cart-totals]');
        const utils = stencilUtils;
        window['addCartQty'] = 0;
        window['$cartContent'] = window.$('[data-cart-content]');
        window['$overlay'] = window.$('[data-cart] .loadingOverlay');
        window['$cartItemsRows'] = window.$('[data-item-row]', window.$cartContent);
        window['$cartPageTitle'] = window.$('[data-cart-page-title]');
        var options = {
            template: {
                content: 'cart/content',
                totals: 'cart/totals',
                pageTitle: 'cart/page-title',
                statusMessages: 'cart/status-messages',
            },
        };
        window.$overlay.show();
        
        // Remove last item from cart? Reload
        if (remove && $cartItemsRows.length === 1) {
            return window.location.reload();
        }
        if (location.pathname == '/cart.php' && ($cartItemsRows.length === 0)) {
            return window.location.reload();
        }

        utils.api.getPage('/cart.php', options, (err, response) => {
            if (err) {
                console.log('There was an error loading the cart content via storefront API');
            }
            Promise.all([response.content,response.totals,response.statusMessages,response.pageTitle])
            .then((values)=> {
                $cartContent.html(values[0]);
                $cartTotals.html(values[1]);
                $cartMessages.html(values[2]);
                $cartPageTitle.replaceWith(values[3]);
                return Promise.resolve(true);
              })
            .then((response)=>{
            return Promise.resolve(response ? ($('[data-cart-binder]').click(),window.$overlay.hide(), true) : (console.log('fail at response1'), false));
            })
            .then((response2)=>{
                return Promise.resolve(response2 ? (cartQTY ? cartQTY : returnCartQty()) : (console.log('fail at response2'), false));     
            })
            .then((response3)=> {
                const qty = response3;
                $('body').trigger('cart-quantity-update', qty);
                console.log('Cart Content Refresh Success');
            });
        });
    }
    
     /****************************************************************

        Return Cart Quantity Using API or Local Storage

    /******************************************************************/   
    returnCartQty() {
        const utils = stencilUtils;
        const secureBaseUrl = location.origin;
        function  setQtyFromCart() {
            window['$cartContent'] = window.$('[data-cart-content]');
            console.log('Quantity was set from cart content');
            return $('[data-cart-quantity]', $cartContent).data('cartQuantity') || 0;
        }
        if (location.pathname == '/cart.php') {
            return setQtyFromCart();
        } 
        else {
            console.log('Quantity was set from the API or local storage');
            let cartQtyPromise = new Promise((resolve, reject) => {
                let cartId = parseCookies().cart_id;
                    utils.api.cart.getCartQuantity({
                        baseUrl: secureBaseUrl,
                        cartId
                    }, (err, qty) => {
                        if (err) {
                            reject(err);
                            return Number(localStorage.getItem('cart-quantity'));
                        }
                        resolve(qty);
                    });
                });
                cartQtyPromise.then(qty => {                   
                    return qty;
                });
            }
    }

    /******************************************************************************************/
    //                                  EXECASCADE 
    /******************************************************************************************/
    /* 
    execascade is a function that hooks into the stencil event-handling for cart updates, 
    it checks the quantity using the storefront API and that quantity is different than the 
    current locally stored quantiy, the amount is updated on the backend 
    by triggering: cart-quantiy-update

    Removed the event handlers I was using because it seemed to mess with the stability of 
    the default event handlers, instead chose to arrange load order of functions in such a way
    the event binders remain as default as possible. 

    e.g test data for use with the custom cart functions running on this store:
    var lineItems = JSON.stringify({
    var lineItemTest = JSON.stringify({
        
    var lineItemTest = JSON.stringify({
        'lineItems': [{
            'quantity': 3,
            'productId': 116,
            'variantId': 96
        }, {
            'quantity': 1,
            'productId': 117,
            'variantId': 97
        }]
    });    

    Promise.resolve(getCart()).then(()=> {
        return Promise.resolve(addCartITEMS(getCartID(true),lineItemTest(),execascade));
    });
    /******************************************************************************************/


    execascade() {
        const secureBaseUrl = location.origin;
        const utils = stencilUtils;

        if (typeof addCartQty !== 'undefined' && (addCartQty > 0)) {
            let remove = (addCartQty === 0);
            $('.cart-quantity').text(addCartQty).toggleClass('countPill--positive', addCartQty > 0);
            localStorage.setItem('cart-quantity', Number(addCartQty));
            return refreshContent(remove, Number(addCartQty));
        } else if (bc_cookie.cart_id) {
            // Get existing quantity from localStorage if found
            if (utils.tools.storage.localStorageAvailable()) {
                if (localStorage.getItem('cart-quantity')) {
                    let quantity = Number(localStorage.getItem('cart-quantity'));
                    console.log('local storage qty was: ' + quantity);
                }
            }
            let cartQtyPromise = new Promise((resolve, reject) => {
            let cartId = parseCookies().cart_id;
                utils.api.cart.getCartQuantity({
                    baseUrl: secureBaseUrl,
                    cartId
                }, (err, qty) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(qty);
                });
            });
            cartQtyPromise.then(qty => {
                let remove = (qty === 0);
                window.cartQty = qty;
                $('.cart-quantity').text(qty).toggleClass('countPill--positive', qty > 0);
                localStorage.setItem('cart-quantity', qty);
                return refreshContent(remove, qty);
            });
        } else {
            console.log('There was a problem loading the cart before refresh content');
        }

    }
}
