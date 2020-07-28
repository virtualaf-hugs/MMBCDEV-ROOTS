/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import $ from 'jquery';
import _ from 'lodash';
import swal from './sweet-alert';


export default class Custom_Cart {
    onReady() {
        this.$body = window.$('body');
        this.$cartContent = window.$('[data-cart-content]');
        this.$cartMessages = window.$('[data-cart-status]');
        this.$cartTotals = window.$('[data-cart-totals]');
        this.$overlay = window.$('[data-cart] .loadingOverlay')
            .hide(); // TODO: temporary until roper pulls in his cart components
        
    }
    
    /******************************************************************************************/
    //                                     TEST DATA
    /******************************************************************************************/
    init() {
        window['$body']  = window.$('body');
        window['$cartContent'] = window.$('[data-cart-content]');
        window['$cartMessages'] = window.$('[data-cart-status]');
        window['$cartTotals'] = window.$('[data-cart-totals]');
        window['$overlay'] = window.$('[data-cart] .loadingOverlay')
            .hide(); // TODO: temporary until roper pulls in his cart components
        window['fetchCart'] = this.fetchCart;
        window['addCartITEMS'] = this.addCartITEMS;
        window['getCart'] = this.getCart;
        window['getLineItems'] = this.getLineItems;
        window['cart2API'] = this.cart2API;
        window['getCartQty'] = this.getCartQty;
        window['cartRemoveItem'] = this.cartRemoveItem;
        window['cartUpdateQtyTextChange'] = this.cartUpdateQtyTextChange;
        window['cartUpdate'] = this.cartUpdate;
        window['bindCartEvents'] = this.bindCartEvents;
        window['updateCart'] = this.updateCart;
        window['refreshContent'] = this.refreshContent;
        window['execascade'] = this.execascade;
        window['lineItemTest'] = this.getTestData;
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
    addCartITEMS(cartId, messageData, callback) {
        getCart();
        var xhr = new XMLHttpRequest(),
            postURL = ((typeof cartId !== 'undefined' && cartId !== 'null') && cartId ?
                '/api/storefront/carts/' + cartId + '/items' :
                '/api/storefront/carts/');
        xhr.withCredentials = true;

        function setBCookie() {
            window['bc_cookie'] = parseCookies();
        }
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === this.DONE) {
                let responseData = JSON.parse(this.response);
                let cartQty = 0;
                Object.entries(responseData.lineItems).forEach(([key, value]) => {
                    console.log('calculating quantity for: ' + key);
                    cartQty += getCartQty(value);
                });
                window['addCartQty'] = cartQty;
                console.log('Calculated Cart Quantity = ' + cartQty);
                document.cookie = 'cart_id=' + String(responseData.id);
                (typeof cartId == 'undefined' || !cartId || String(cartId).length < 36) ?
                (setBCookie(), callback()) : callback();
            }
            // if (xhr.readyState === 4) {
            //     callback();
            // }
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
    //                                GET CART USING AJAX
    /******************************************************************************************/

    getCart(callback) {

        typeof cartObjectData === 'undefined' ? window.cartObjectData = {} : null;
        typeof AJAXSettings === 'undefined' ? window.AJAXSettings = {} : null;
        cartObjectData, AJAXSettings = {
            'async': true,
            'crossDomain': true,
            'url': '/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options',
            'method': 'GET',
            'headers': {}
        };
        $.ajax(AJAXSettings).then(function(responseText) {
            cartObjectData = JSON.parse(JSON.stringify(responseText, null, 3));
            return Promise.resolve(cartObjectData);
        }).done(function(data) {
            window['bc_cookie'] = parseCookies();
            if(cartObjectData.length === 0) {
                return callback(false); 
            } else {
                document.cookie='cart_id=' + String(cartObjectData[0].id);
                return Promise.resolve(callback(cartObjectData[0].cartAmount > 0));
            }
        });
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
    //                                  Remove Cart Item
    /******************************************************************************************/

    cartRemoveItem(itemId) {
        var utils = stencilUtils;
        $overlay = $('[data-cart] .loadingOverlay');
        $overlay.show();
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                execascade();
            } else {
                swal.fire({
                    text: response.data.errors.join('\n'),
                    icon: 'error',
                });
            }
        });
    }


    /******************************************************************************************/
    //                            Cart Update Quantity Text Change 
    /******************************************************************************************/
    cartUpdateQtyTextChange($target, preVal = null) {
        var utils = stencilUtils;
        var itemId = $target.data('cartItemid');
        var $el = $(`#qty-${itemId}`);
        var maxQty = parseInt($el.data('quantityMax'), 10);
        var minQty = parseInt($el.data('quantityMin'), 10);
        var oldQty = preVal !== null ? preVal : minQty;
        var minError = $el.data('quantityMinError');
        var maxError = $el.data('quantityMaxError');
        var newQty = parseInt(Number($el.val()), 10);
        let invalidEntry;
        window['$overlay'] = window.$('[data-cart] .loadingOverlay');


        // Does not quality for min/max quantity
        if (!newQty) {
            invalidEntry = $el.val();
            $el.val(oldQty);
            return swal.fire({
                text: `${invalidEntry} is not a valid entry`,
                icon: 'error',
            });
        } else if (newQty < minQty) {
            $el.val(oldQty);
            return swal.fire({
                text: minError,
                icon: 'error',
            });
        } else if (maxQty > 0 && newQty > maxQty) {
            $el.val(oldQty);
            return swal.fire({
                text: maxError,
                icon: 'error',
            });
        }

        $overlay.show();
        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            $overlay.hide();
            let quantity = Number(localStorage['cart-quantity']) + (newQty - oldQty);
            if (response.data.status === 'succeed') {
                if (utils.tools.storage.localStorageAvailable()) { // if the quantity is changed "1" from "0", we have to remove the row.
                    let remove = (newQty === 0);
                    
                    window.$('.cart-quantity')
                        .text(quantity)
                        .toggleClass('countPill--positive', newQty > 0);
                    localStorage.setItem('cart-quantity', quantity);
                    refreshContent(remove, true);
                } else {
                    let remove = (newQty === 0);
                    let quantity = window.cartQty + (newQty - oldQty);
                    window.$('.cart-quantity')
                        .text(quantity)
                        .toggleClass('countPill--positive', newQty > 0);
                    localStorage.setItem('cart-quantity', quantity);
                    refreshContent(remove, true);
                }
            } else {
                $el.val(oldQty);
                swal.fire({
                    text: response.data.errors.join('\n'),
                    icon: 'error',
                });
            }
        });
    }


    /******************************************************************************************/
    //                                  Cart Data Updater 
    /******************************************************************************************/
    cartUpdate($target) {
        var utils = stencilUtils;
        var itemId = $target.data('cartItemid');
        var $el = $(`#qty-${itemId}`);
        var oldQty = parseInt($el.val(), 10);
        var maxQty = parseInt($el.data('quantityMax'), 10);
        var minQty = parseInt($el.data('quantityMin'), 10);
        var minError = $el.data('quantityMinError');
        var maxError = $el.data('quantityMaxError');
        var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
        window['$overlay'] = window.$('[data-cart] .loadingOverlay');


        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return swal.fire({
                text: minError,
                icon: 'error',
            });
        } else if (maxQty > 0 && newQty > maxQty) {
            return swal.fire({
                text: maxError,
                icon: 'error',
            });
        }

        $overlay.show();

        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            $overlay.hide();
            if (response.data.status === 'succeed') {
                if (utils.tools.storage.localStorageAvailable()) { // if the quantity is changed "1" from "0", we have to remove the row.
                    let remove = (newQty === 0);
                    let quantity = Number(localStorage['cart-quantity']) + (newQty - oldQty);
                    $('.cart-quantity')
                        .text(quantity)
                        .toggleClass('countPill--positive', newQty > 0);
                    localStorage.setItem('cart-quantity', quantity);
                    refreshContent(remove);
                } else {
                    let remove = (newQty === 0);
                    let quantity = window.cartQty + (newQty - oldQty);
                    $('.cart-quantity')
                        .text(quantity)
                        .toggleClass('countPill--positive', newQty > 0);
                    localStorage.setItem('cart-quantity', quantity);
                    refreshContent(remove);
                }
            } else {
                $el.val(oldQty);
                swal.fire({
                    text: response.data.errors.join('\n'),
                    icon: 'error',
                });
            }
        });
    }


    /******************************************************************************************/
    //                                  Bind Cart Events 
    /******************************************************************************************/
    bindCartEvents() {
        const debounceTimeout = 400;
        let preVal;
        
        // cart update
        $('[data-cart-update]', $cartContent).on('click', event => {
            var $target = $(event.currentTarget);

            event.preventDefault();

            // update cart quantity
            cartUpdate($target);
        });

        // cart qty manually updates
        $('.cart-item-qty-input', $cartContent).on('focus', function onQtyFocus() {
            preVal = this.value;
        }).change(event => {
            var $target = $(event.currentTarget);
            event.preventDefault();

            // update cart quantity
            cartUpdateQtyTextChange($target, preVal);
        });

        $('.cart-remove', $cartContent).on('click', event => {
            var itemId = $(event.currentTarget).data('cartItemid');
            var string = $(event.currentTarget).data('confirmDelete');
            swal.fire({
                text: string,
                icon: 'warning',
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    // remove item from cart
                    cartRemoveItem(itemId);
                }
            });
            event.preventDefault();
        });
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
                $('.cart-quantity').html(getCartQty(lineItems));
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
    refreshContent(remove, exec) {    
        const utils = stencilUtils;
        const secureBaseUrl = location.origin;
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
        window['addCartQty'] = undefined;
        if (location.pathname == '/cart.php') {
            exec === false;
        }
        // Remove last item from cart? Reload
        if (remove && $cartItemsRows.length === 1) {
            return window.location.reload();
        }
        if (location.pathname == '/cart.php' && ($cartItemsRows.length === 0)) {
            return window.location.reload();
        }

        utils.api.getPage('/cart.php', options, (err, response) => {
            $cartContent.html(response.content);
            $cartTotals.html(response.totals);
            $cartMessages.html(response.statusMessages);
            $cartPageTitle.replaceWith(response.pageTitle);
            bindCartEvents();
            window.$overlay.hide();

            const quantity = (exec === true ? setQtyFromMem() : setQtyFromCart());
            $('body').trigger('cart-quantity-update', quantity);
        });


        function setQtyFromCart() {
            console.log('Quantity was set from cart content');
            return $('[data-cart-quantity]', $cartContent).data('cartQuantity') || 0;
        }

        function setQtyFromMem() {
            console.log('Quantity was set from the API or local storage');
            if (location.pathname == '/cart.php') {
                return setQtyFromCart();
            } 
            else {
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

    addCartITEMS(bc_cookie.cart_id, lineItems,execascade)
    /******************************************************************************************/


    execascade() {
        const secureBaseUrl = location.origin;
        const utils = stencilUtils;
        
        /* var cartCheck = fetch('/api/storefront/carts/', 
            {credentials: 'include'})
            .then(response => response.json())
            .then(function(){return true;})
            .catch(function(){return false;}); */

        //if (Promise.resolve(cartCheck)) {
        if (typeof addCartQty !== 'undefined' && (addCartQty > 0)) {
            let remove = (addCartQty === 0);
            $('.cart-quantity').text(addCartQty).toggleClass('countPill--positive', addCartQty > 0);
            localStorage.setItem('cart-quantity', addCartQty);
            return refreshContent(remove, true);
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
                return refreshContent(remove, true);
            });
        } else {
            console.log('There was a problem loading the cart before refresh content');
        }

    }
}