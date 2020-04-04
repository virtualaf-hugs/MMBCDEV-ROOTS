(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cart; });
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");
/* harmony import */ var core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_join__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");






function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.bindEvents();
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not quality for min/max quantity

    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: invalidEntry + " is not a valid entry",
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId) {
    var _this4 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);

      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].hooks.on('product-option-change', function (event, option) {
      var $changedOption = $(option);
      var $form = $changedOption.parents('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      var item = $('[name="item_id"]', $form).attr('value');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.productAttributes.optionChange(item, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);

      _this5.$cartTotals.html(response.totals);

      _this5.$cartMessages.html(response.statusMessages);

      $cartPageTitle.replaceWith(response.pageTitle);

      _this5.bindEvents();

      _this5.$overlay.hide();

      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_4___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_3___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      event.preventDefault(); // edit item in cart

      _this6.cartEditOptions(itemId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_6__["default"])(code)) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
          text: $certInput.data('error'),
          icon: 'error'
        });
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_10__["default"].fire({
            text: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;

    var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_7__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this9.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents(); // initiate shipping estimator module

    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_8__["default"]($('[data-shipping-estimator]'));
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_5__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShippingEstimator; });
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_is_nan__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.is-nan */ "./node_modules/core-js/modules/es.number.is-nan.js");
/* harmony import */ var core_js_modules_es_number_is_nan__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_is_nan__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_form_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common/form-utils */ "./assets/js/theme/common/form-utils.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");









var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_4__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit"
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: 'The \'Country\' field cannot be blank.'
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: 'The \'State/Province\' field cannot be blank.'
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    Object(_common_state_country__WEBPACK_IMPORTED_MODULE_3__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_7__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_form_utils__WEBPACK_IMPORTED_MODULE_6__["Validators"].cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $estimatorContainer.removeClass('u-hiddenVisually');
      $('.shipping-estimate-hide').show();
    });
    $('.shipping-estimate-hide').on('click', function (event) {
      event.preventDefault();
      $estimatorContainer.addClass('u-hiddenVisually');
      $('.shipping-estimate-show').show();
      $('.shipping-estimate-hide').hide();
    });
  };

  return ShippingEstimator;
}();


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (cert) {
  if (typeof cert !== 'string') {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2FydC9zaGlwcGluZy1lc3RpbWF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvci5qcyJdLCJuYW1lcyI6WyJDYXJ0Iiwib25SZWFkeSIsIiRjYXJ0Q29udGVudCIsIiQiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkb3ZlcmxheSIsImhpZGUiLCJiaW5kRXZlbnRzIiwiY2FydFVwZGF0ZSIsIiR0YXJnZXQiLCJpdGVtSWQiLCJkYXRhIiwiJGVsIiwib2xkUXR5IiwicGFyc2VJbnQiLCJ2YWwiLCJtYXhRdHkiLCJtaW5RdHkiLCJtaW5FcnJvciIsIm1heEVycm9yIiwibmV3UXR5Iiwic3dhbCIsImZpcmUiLCJ0ZXh0IiwiaWNvbiIsInNob3ciLCJ1dGlscyIsImFwaSIsImNhcnQiLCJpdGVtVXBkYXRlIiwiZXJyIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJyZW1vdmUiLCJyZWZyZXNoQ29udGVudCIsImVycm9ycyIsImpvaW4iLCJjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSIsInByZVZhbCIsIk51bWJlciIsImludmFsaWRFbnRyeSIsImNhcnRSZW1vdmVJdGVtIiwiaXRlbVJlbW92ZSIsImNhcnRFZGl0T3B0aW9ucyIsIm1vZGFsIiwiZGVmYXVsdE1vZGFsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwib3BlbiIsInByb2R1Y3RBdHRyaWJ1dGVzIiwiY29uZmlndXJlSW5DYXJ0IiwidXBkYXRlQ29udGVudCIsImNvbnRlbnQiLCJiaW5kR2lmdFdyYXBwaW5nRm9ybSIsImhvb2tzIiwib24iLCJldmVudCIsIm9wdGlvbiIsIiRjaGFuZ2VkT3B0aW9uIiwiJGZvcm0iLCJwYXJlbnRzIiwiJHN1Ym1pdCIsIiRtZXNzYWdlQm94IiwiaXRlbSIsImF0dHIiLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwibGVuZ3RoIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJnZXRDb250ZW50IiwiaHRtbCIsInJlcGxhY2VXaXRoIiwicXVhbnRpdHkiLCJ0cmlnZ2VyIiwiYmluZENhcnRFdmVudHMiLCJkZWJvdW5jZVRpbWVvdXQiLCJjdXJyZW50VGFyZ2V0IiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJzaG93Q2FuY2VsQnV0dG9uIiwidGhlbiIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJnaWZ0Q2VydENoZWNrIiwiYXBwbHlHaWZ0Q2VydGlmaWNhdGUiLCJyZXNwIiwiYmluZEdpZnRXcmFwcGluZ0V2ZW50cyIsImdldEl0ZW1HaWZ0V3JhcHBpbmdPcHRpb25zIiwiJHNlbGVjdCIsImlkIiwiaW5kZXgiLCJhbGxvd01lc3NhZ2UiLCJmaW5kIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJzaGlwcGluZ0VzdGltYXRvciIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiUGFnZU1hbmFnZXIiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0Iiwic3RhdGVDb3VudHJ5IiwiY29udGV4dCIsInVzZUlkRm9yU3RhdGVzIiwiZmllbGQiLCJFcnJvciIsIiRmaWVsZCIsImdldFN0YXR1cyIsImlzIiwiVmFsaWRhdG9ycyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiYWRkQ2xhc3MiLCJjZXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCQSxJOzs7Ozs7Ozs7U0FDakJDLE8sR0FBQSxtQkFBVTtBQUNOLFNBQUtDLFlBQUwsR0FBb0JDLENBQUMsQ0FBQyxxQkFBRCxDQUFyQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUJELENBQUMsQ0FBQyxvQkFBRCxDQUF0QjtBQUNBLFNBQUtFLFdBQUwsR0FBbUJGLENBQUMsQ0FBQyxvQkFBRCxDQUFwQjtBQUNBLFNBQUtHLFFBQUwsR0FBZ0JILENBQUMsQ0FBQyw2QkFBRCxDQUFELENBQ1hJLElBRFcsRUFBaEIsQ0FKTSxDQUtPOztBQUNiLFNB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QUFLLEVBQUk7QUFDOUNBLFdBQUssQ0FBQ2lDLGNBQU47QUFFQXZGLE9BQUMsQ0FBQ3NELEtBQUssQ0FBQ2dDLGFBQVAsQ0FBRCxDQUF1QmxGLElBQXZCO0FBQ0EySix5QkFBbUIsQ0FBQ0QsV0FBcEIsQ0FBZ0Msa0JBQWhDO0FBQ0E5SixPQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QnVCLElBQTdCO0FBQ0gsS0FORDtBQVNBdkIsS0FBQyxDQUFDLHlCQUFELENBQUQsQ0FBNkJxRCxFQUE3QixDQUFnQyxPQUFoQyxFQUF5QyxVQUFBQyxLQUFLLEVBQUk7QUFDOUNBLFdBQUssQ0FBQ2lDLGNBQU47QUFFQXdFLHlCQUFtQixDQUFDVyxRQUFwQixDQUE2QixrQkFBN0I7QUFDQTFLLE9BQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCdUIsSUFBN0I7QUFDQXZCLE9BQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCSSxJQUE3QjtBQUNILEtBTkQ7QUFPSCxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyTEw7QUFBZSx5RUFBVXVLLElBQVYsRUFBZ0I7QUFDM0IsTUFBSSxPQUFPQSxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCLFdBQU8sS0FBUDtBQUNILEdBSDBCLENBSzNCOzs7QUFDQSxTQUFPLElBQVA7QUFDSCxDIiwiZmlsZSI6InRoZW1lLWJ1bmRsZS5jaHVuay4xMi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGdpZnRDZXJ0Q2hlY2sgZnJvbSAnLi9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3InO1xuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBTaGlwcGluZ0VzdGltYXRvciBmcm9tICcuL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yJztcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcbmltcG9ydCBzd2FsIGZyb20gJy4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLiRjYXJ0Q29udGVudCA9ICQoJ1tkYXRhLWNhcnQtY29udGVudF0nKTtcbiAgICAgICAgdGhpcy4kY2FydE1lc3NhZ2VzID0gJCgnW2RhdGEtY2FydC1zdGF0dXNdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcbiAgICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJ1tkYXRhLWNhcnRdIC5sb2FkaW5nT3ZlcmxheScpXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcbiAgICAgICAgY29uc3QgbmV3UXR5ID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKSA9PT0gJ2luYycgPyBvbGRRdHkgKyAxIDogb2xkUXR5IC0gMTtcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIGNvbnN0ICRlbCA9ICQoYCNxdHktJHtpdGVtSWR9YCk7XG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XG4gICAgICAgIGNvbnN0IG1pblF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1pbicpLCAxMCk7XG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHByZVZhbCAhPT0gbnVsbCA/IHByZVZhbCA6IG1pblF0eTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9IHBhcnNlSW50KE51bWJlcigkZWwudmFsKCkpLCAxMCk7XG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XG5cbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxuICAgICAgICBpZiAoIW5ld1F0eSkge1xuICAgICAgICAgICAgaW52YWxpZEVudHJ5ID0gJGVsLnZhbCgpO1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogYCR7aW52YWxpZEVudHJ5fSBpcyBub3QgYSB2YWxpZCBlbnRyeWAsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGV4dDogbWluRXJyb3IsXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcbiAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcbiAgICAgICAgdXRpbHMuYXBpLmNhcnQuaXRlbVVwZGF0ZShpdGVtSWQsIG5ld1F0eSwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2UuZGF0YS5zdGF0dXMgPT09ICdzdWNjZWVkJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRFZGl0T3B0aW9ucyhpdGVtSWQpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvY29uZmlndXJlLXByb2R1Y3QnLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMuY29uZmlndXJlSW5DYXJ0KGl0ZW1JZCwgb3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbHMuaG9va3Mub24oJ3Byb2R1Y3Qtb3B0aW9uLWNoYW5nZScsIChldmVudCwgb3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkY2hhbmdlZE9wdGlvbiA9ICQob3B0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0ICRmb3JtID0gJGNoYW5nZWRPcHRpb24ucGFyZW50cygnZm9ybScpO1xuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLmFsZXJ0TWVzc2FnZUJveCcpO1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9ICQoJ1tuYW1lPVwiaXRlbV9pZFwiXScsICRmb3JtKS5hdHRyKCd2YWx1ZScpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKGl0ZW0sICRmb3JtLnNlcmlhbGl6ZSgpLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzdWx0LmRhdGEgfHwge307XG5cbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCdwLmFsZXJ0Qm94LW1lc3NhZ2UnLCAkbWVzc2FnZUJveCkudGV4dChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaENvbnRlbnQocmVtb3ZlKSB7XG4gICAgICAgIGNvbnN0ICRjYXJ0SXRlbXNSb3dzID0gJCgnW2RhdGEtaXRlbS1yb3ddJywgdGhpcy4kY2FydENvbnRlbnQpO1xuICAgICAgICBjb25zdCAkY2FydFBhZ2VUaXRsZSA9ICQoJ1tkYXRhLWNhcnQtcGFnZS10aXRsZV0nKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogJ2NhcnQvY29udGVudCcsXG4gICAgICAgICAgICAgICAgdG90YWxzOiAnY2FydC90b3RhbHMnLFxuICAgICAgICAgICAgICAgIHBhZ2VUaXRsZTogJ2NhcnQvcGFnZS10aXRsZScsXG4gICAgICAgICAgICAgICAgc3RhdHVzTWVzc2FnZXM6ICdjYXJ0L3N0YXR1cy1tZXNzYWdlcycsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBsYXN0IGl0ZW0gZnJvbSBjYXJ0PyBSZWxvYWRcbiAgICAgICAgaWYgKHJlbW92ZSAmJiAkY2FydEl0ZW1zUm93cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0Q29udGVudC5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgdGhpcy4kY2FydFRvdGFscy5odG1sKHJlc3BvbnNlLnRvdGFscyk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XG5cbiAgICAgICAgICAgICRjYXJ0UGFnZVRpdGxlLnJlcGxhY2VXaXRoKHJlc3BvbnNlLnBhZ2VUaXRsZSk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xuXG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgdGhpcy4kY2FydENvbnRlbnQpLmRhdGEoJ2NhcnRRdWFudGl0eScpIHx8IDA7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5iaW5kQ2FydEV2ZW50cygpIHtcbiAgICBjb25zdCBkZWJvdW5jZVRpbWVvdXQgPSA0MDA7XG4gICAgY29uc3QgY2FydFVwZGF0ZSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBfLmJpbmQoXy5kZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICBjb25zdCBjYXJ0UmVtb3ZlSXRlbSA9IF8uYmluZChfLmRlYm91bmNlKHRoaXMuY2FydFJlbW92ZUl0ZW0sIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgIGxldCBwcmVWYWw7XG5cbiAgICAvLyBjYXJ0IHVwZGF0ZVxuICAgICQoJ1tkYXRhLWNhcnQtdXBkYXRlXScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgY2FydFVwZGF0ZSgkdGFyZ2V0KTtcbiAgICB9KTtcblxuICAgIC8vIGNhcnQgcXR5IG1hbnVhbGx5IHVwZGF0ZXNcbiAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xuICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xuICAgIH0pLmNoYW5nZShldmVudCA9PiB7XG4gICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCk7XG4gICAgfSk7XG5cbiAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NhcnRJdGVtaWQnKTtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjb25maXJtRGVsZXRlJyk7XG4gICAgICAgIHN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0ZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICBpY29uOiAnd2FybmluZycsXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcbiAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLWl0ZW0tZWRpdF0nLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBpdGVtSWQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2l0ZW1FZGl0Jyk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcbiAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkKTtcbiAgICB9KTtcbn1cblxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjb3Vwb25Db250YWluZXIgPSAkKCcuY291cG9uLWNvZGUnKTtcbiAgICAgICAgY29uc3QgJGNvdXBvbkZvcm0gPSAkKCcuY291cG9uLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcblxuICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5oaWRlKCk7XG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5zaG93KCk7XG4gICAgICAgICAgICAkY29kZUlucHV0LnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuY291cG9uLWNvZGUtYWRkJykuc2hvdygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY291cG9uRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29kZSA9ICRjb2RlSW5wdXQudmFsKCk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcbiAgICAgICAgICAgIGlmICghY29kZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNlcnRDb250YWluZXIgPSAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jb2RlJyk7XG4gICAgICAgIGNvbnN0ICRjZXJ0Rm9ybSA9ICQoJy5jYXJ0LWdpZnQtY2VydGlmaWNhdGUtZm9ybScpO1xuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkudG9nZ2xlKCk7XG4gICAgICAgICAgICAkY2VydENvbnRhaW5lci50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkY2VydEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY2VydElucHV0LnZhbCgpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAoIWdpZnRDZXJ0Q2hlY2soY29kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJGNlcnRJbnB1dC5kYXRhKCdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUdpZnRDZXJ0aWZpY2F0ZShjb2RlLCAoZXJyLCByZXNwKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3AuZGF0YS5lcnJvcnMuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSk7XG4gICAgfVxufSIsImltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi4vY29tbW9uL3N0YXRlLWNvdW50cnknO1xuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gZnJvbSAnLi4vY29tbW9uL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHN3YWwgZnJvbSAnLi4vZ2xvYmFsL3N3ZWV0LWFsZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScsIHRoaXMuJGVsZW1lbnQpO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gJ2Zvcm1bZGF0YS1zaGlwcGluZy1lc3RpbWF0b3JdJztcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc3VibWl0JywgdGhpcy4kZWxlbWVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnQ291bnRyeVxcJyBmaWVsZCBjYW5ub3QgYmUgYmxhbmsuJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0ICRlbGUgPSAkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctc3RhdGVcIl1gKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZVZhbCA9ICRlbGUudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6ICdUaGUgXFwnU3RhdGUvUHJvdmluY2VcXCcgZmllbGQgY2Fubm90IGJlIGJsYW5rLicsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgYmV0d2VlbiBkZWZhdWx0IHNoaXBwaW5nIGFuZCB1cHMgc2hpcHBpbmcgcmF0ZXNcbiAgICAgKi9cbiAgICBiaW5kVVBTUmF0ZXMoKSB7XG4gICAgICAgIGNvbnN0IFVQU1JhdGVUb2dnbGUgPSAnLmVzdGltYXRvci1mb3JtLXRvZ2dsZVVQU1JhdGUnO1xuXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtVXBzID0gJCgnLmVzdGltYXRvci1mb3JtLS11cHMnKTtcbiAgICAgICAgICAgIGNvbnN0ICRlc3RpbWF0b3JGb3JtRGVmYXVsdCA9ICQoJy5lc3RpbWF0b3ItZm9ybS0tZGVmYXVsdCcpO1xuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJGVzdGltYXRvckZvcm1EZWZhdWx0LnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKSB7XG4gICAgICAgIGxldCAkbGFzdDtcblxuICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRmaWVsZCA9ICQoZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5iaW5kU3RhdGVWYWxpZGF0aW9uKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdoZW4geW91IGNoYW5nZSBhIGNvdW50cnksIHlvdSBzd2FwIHRoZSBzdGF0ZS9wcm92aW5jZSBiZXR3ZWVuIGFuIGlucHV0IGFuZCBhIHNlbGVjdCBkcm9wZG93blxuICAgICAgICAgICAgLy8gTm90IGFsbCBjb3VudHJpZXMgcmVxdWlyZSB0aGUgcHJvdmluY2UgdG8gYmUgZmlsbGVkXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXG4gICAgICAgICAgICAkKHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IpLmZpbmQoJy5mb3JtLWZpZWxkLS1zdWNjZXNzJykucmVtb3ZlQ2xhc3MoJ2Zvcm0tZmllbGQtLXN1Y2Nlc3MnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEVzdGltYXRvckV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm0gPSAkKCcuZXN0aW1hdG9yLWZvcm0nKTtcblxuICAgICAgICAkZXN0aW1hdG9yRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBzdGF0ZV9pZDogJCgnW25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgICAgICBjaXR5OiAkKCdbbmFtZT1cInNoaXBwaW5nLWNpdHlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0U2hpcHBpbmdRdW90ZXMocGFyYW1zLCAnY2FydC9zaGlwcGluZy1xdW90ZXMnLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAgLy8gYmluZCB0aGUgc2VsZWN0IGJ1dHRvblxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVvdGVJZCA9ICQoJy5zaGlwcGluZy1xdW90ZTpjaGVja2VkJykudmFsKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LnN1Ym1pdFNoaXBwaW5nUXVvdGUocXVvdGVJZCwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xuICAgICAgICAgICAgJGVzdGltYXRvckNvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xuICAgICAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLWhpZGUnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLWhpZGUnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkZXN0aW1hdG9yQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLnNob3coKTtcbiAgICAgICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1oaWRlJykuaGlkZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9