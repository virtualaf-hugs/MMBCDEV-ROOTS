(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

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

/***/ }),

/***/ "./assets/js/theme/common/models/forms.js":
/*!************************************************!*\
  !*** ./assets/js/theme/common/models/forms.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var forms = {
  email: function email(value) {
    var re = /^.+@.+\..+/;
    return re.test(value);
  },

  /**
   * Validates a password field
   * @param value
   * @returns {boolean}
   */
  password: function password(value) {
    return this.notEmpty(value);
  },

  /**
   * validates if a field is empty
   * @param value
   * @returns {boolean}
   *
   */
  notEmpty: function notEmpty(value) {
    return value.length > 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GiftCertificate; });
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");
/* harmony import */ var core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");
/* harmony import */ var core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_for_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.number.constructor */ "./node_modules/core-js/modules/es.number.constructor.js");
/* harmony import */ var core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_number_constructor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/modules/web.dom-collections.for-each */ "./node_modules/core-js/modules/web.dom-collections.for-each.js");
/* harmony import */ var core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_collections_for_each__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");





function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }








var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(GiftCertificate, _PageManager);

  function GiftCertificate(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_7__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_7__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_7__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_7__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_5__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300
    });

    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');
      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);

          if (!numberVal) {
            cb(false);
          }

          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: "You must enter a certificate amount between " + minFormatted + " and " + maxFormatted + "."
      });
    }

    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);

    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);

      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();

        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }

    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return;
      }

      var modal = Object(_global_modal__WEBPACK_IMPORTED_MODULE_9__["defaultModal"])();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_8__["api"].getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }

        modal.updateContent(content, {
          wrap: true
        });
      });
    });
    return _this;
  }

  var _proto = GiftCertificate.prototype;

  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = Object(_common_nod__WEBPACK_IMPORTED_MODULE_5__["default"])({
      submit: $balanceForm.find('input[type="submit"]')
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb(Object(_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_6__["default"])(val));
      },
      errorMessage: 'You must enter a certificate code.'
    });
    return balanceValidator;
  };

  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_4__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vbW9kZWxzL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy90aGVtZS9naWZ0LWNlcnRpZmljYXRlLmpzIl0sIm5hbWVzIjpbImNlcnQiLCJmb3JtcyIsImVtYWlsIiwidmFsdWUiLCJyZSIsInRlc3QiLCJwYXNzd29yZCIsIm5vdEVtcHR5IiwibGVuZ3RoIiwiR2lmdENlcnRpZmljYXRlIiwiY29udGV4dCIsIiRjZXJ0QmFsYW5jZUZvcm0iLCIkIiwicHVyY2hhc2VNb2RlbCIsInJlY2lwaWVudE5hbWUiLCJ2YWwiLCJyZWNpcGllbnRFbWFpbCIsImZvcm1Nb2RlbCIsInNlbmRlck5hbWUiLCJzZW5kZXJFbWFpbCIsImN1c3RvbUFtb3VudCIsIm1pbiIsIm1heCIsInNldEFtb3VudCIsIm9wdGlvbnMiLCJmb3VuZCIsImZvckVhY2giLCJvcHRpb24iLCIkcHVyY2hhc2VGb3JtIiwiJGN1c3RvbUFtb3VudHMiLCJmaW5kIiwicHVyY2hhc2VWYWxpZGF0b3IiLCJub2QiLCJzdWJtaXQiLCJkZWxheSIsIiRlbGVtZW50IiwiZGF0YSIsIm1pbkZvcm1hdHRlZCIsIm1heEZvcm1hdHRlZCIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsIm51bWJlclZhbCIsIk51bWJlciIsImVycm9yTWVzc2FnZSIsInJlc3VsdCIsInRvTmFtZSIsInRvRW1haWwiLCJmcm9tTmFtZSIsImZyb21FbWFpbCIsInRyaWdnZXJlZEJ5IiwiY2VydFRoZW1lIiwiZ2V0IiwiY2hlY2tlZCIsImFncmVlVG9UZXJtcyIsImJhbGFuY2VWYWwiLCJjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yIiwib24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xpY2siLCJtb2RhbCIsImRlZmF1bHRNb2RhbCIsInByZXZpZXdVcmwiLCJjdXJyZW50VGFyZ2V0Iiwic2VyaWFsaXplIiwib3BlbiIsImFwaSIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIndyYXAiLCIkYmFsYW5jZUZvcm0iLCJiYWxhbmNlVmFsaWRhdG9yIiwiZ2lmdENlcnRDaGVja2VyIiwiUGFnZU1hbmFnZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFlLHlFQUFVQSxJQUFWLEVBQWdCO0FBQzNCLE1BQUksT0FBT0EsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQixXQUFPLEtBQVA7QUFDSCxHQUgwQixDQUszQjs7O0FBQ0EsU0FBTyxJQUFQO0FBQ0gsQzs7Ozs7Ozs7Ozs7O0FDUEQ7QUFBQSxJQUFNQyxLQUFLLEdBQUc7QUFDVkMsT0FEVSxpQkFDSkMsS0FESSxFQUNHO0FBQ1QsUUFBTUMsRUFBRSxHQUFHLFlBQVg7QUFDQSxXQUFPQSxFQUFFLENBQUNDLElBQUgsQ0FBUUYsS0FBUixDQUFQO0FBQ0gsR0FKUzs7QUFNVjs7Ozs7QUFLQUcsVUFYVSxvQkFXREgsS0FYQyxFQVdNO0FBQ1osV0FBTyxLQUFLSSxRQUFMLENBQWNKLEtBQWQsQ0FBUDtBQUNILEdBYlM7O0FBZVY7Ozs7OztBQU1BSSxVQXJCVSxvQkFxQkRKLEtBckJDLEVBcUJNO0FBQ1osV0FBT0EsS0FBSyxDQUFDSyxNQUFOLEdBQWUsQ0FBdEI7QUFDSDtBQXZCUyxDQUFkO0FBMEJlUCxvRUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCUSxlOzs7QUFDakIsMkJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsb0NBQU1BLE9BQU47QUFFQSxRQUFNQyxnQkFBZ0IsR0FBR0MsQ0FBQyxDQUFDLDJCQUFELENBQTFCO0FBRUEsUUFBTUMsYUFBYSxHQUFH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QURPO0FBRWpCVyxjQUZpQixvQkFFUkMsRUFGUSxFQUVKM0IsR0FGSSxFQUVDO0FBQ2QyQixVQUFFLENBQUNxQyxrRkFBZSxDQUFDaEUsR0FBRCxDQUFoQixDQUFGO0FBQ0gsT0FKZ0I7QUFLakI4QixrQkFBWSxFQUFFO0FBTEcsS0FBckI7QUFRQSxXQUFPaUMsZ0JBQVA7QUFDSCxHOzs7RUE5THdDRSxxRCIsImZpbGUiOiJ0aGVtZS1idW5kbGUuY2h1bmsuNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChjZXJ0KSB7XG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQWRkIGFueSBjdXN0b20gZ2lmdCBjZXJ0aWZpY2F0ZSB2YWxpZGF0aW9uIGxvZ2ljIGhlcmVcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbiIsImNvbnN0IGZvcm1zID0ge1xuICAgIGVtYWlsKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gL14uK0AuK1xcLi4rLztcbiAgICAgICAgcmV0dXJuIHJlLnRlc3QodmFsdWUpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBWYWxpZGF0ZXMgYSBwYXNzd29yZCBmaWVsZFxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHBhc3N3b3JkKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdEVtcHR5KHZhbHVlKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGVzIGlmIGEgZmllbGQgaXMgZW1wdHlcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKlxuICAgICAqL1xuICAgIG5vdEVtcHR5KHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICAgIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtcztcbiIsImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgbm9kIGZyb20gJy4vY29tbW9uL25vZCc7XG5pbXBvcnQgZ2lmdENlcnRDaGVja2VyIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCBmb3JtTW9kZWwgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IGFwaSB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCB7IGRlZmF1bHRNb2RhbCB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2lmdENlcnRpZmljYXRlIGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG5cbiAgICAgICAgY29uc3QgJGNlcnRCYWxhbmNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWJhbGFuY2UnKTtcblxuICAgICAgICBjb25zdCBwdXJjaGFzZU1vZGVsID0ge1xuICAgICAgICAgICAgcmVjaXBpZW50TmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWNpcGllbnRFbWFpbCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kZXJOYW1lKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRlckVtYWlsKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybU1vZGVsLmVtYWlsKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGN1c3RvbUFtb3VudCh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUgPj0gbWluICYmIHZhbHVlIDw9IG1heDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRBbW91bnQodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb24gPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgJHB1cmNoYXNlRm9ybSA9ICQoJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGN1c3RvbUFtb3VudHMgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV9hbW91bnRcIl0nKTtcbiAgICAgICAgY29uc3QgcHVyY2hhc2VWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkY3VzdG9tQW1vdW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0ICRlbGVtZW50ID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XG4gICAgICAgICAgICBjb25zdCBtaW4gPSAkZWxlbWVudC5kYXRhKCdtaW4nKTtcbiAgICAgICAgICAgIGNvbnN0IG1pbkZvcm1hdHRlZCA9ICRlbGVtZW50LmRhdGEoJ21pbkZvcm1hdHRlZCcpO1xuICAgICAgICAgICAgY29uc3QgbWF4ID0gJGVsZW1lbnQuZGF0YSgnbWF4Jyk7XG4gICAgICAgICAgICBjb25zdCBtYXhGb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtYXhGb3JtYXR0ZWQnKTtcblxuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlclZhbCA9IE51bWJlcih2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnVtYmVyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihudW1iZXJWYWwgPj0gbWluICYmIG51bWJlclZhbCA8PSBtYXgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBgWW91IG11c3QgZW50ZXIgYSBjZXJ0aWZpY2F0ZSBhbW91bnQgYmV0d2VlbiAke21pbkZvcm1hdHRlZH0gYW5kICR7bWF4Rm9ybWF0dGVkfS5gLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50TmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b05hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudEVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9uYW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJOYW1lKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlckVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21FbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpmaXJzdC1vZi10eXBlJyxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyZWRCeTogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYih0eXBlb2YgKHZhbCkgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmNlcnRUaGVtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJhZ3JlZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZVwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlMlwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAoJGNlcnRCYWxhbmNlRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSB0aGlzLmNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGNlcnRCYWxhbmNlRm9ybSk7XG5cbiAgICAgICAgICAgICRjZXJ0QmFsYW5jZUZvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBiYWxhbmNlVmFsLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFiYWxhbmNlVmFsLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkcHVyY2hhc2VGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2dpZnQtY2VydGlmaWNhdGUtcHJldmlldycpLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoIXB1cmNoYXNlVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpZXdVcmwgPSBgJHskKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ByZXZpZXdVcmwnKX0mJHskcHVyY2hhc2VGb3JtLnNlcmlhbGl6ZSgpfWA7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgYXBpLmdldFBhZ2UocHJldmlld1VybCwge30sIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2RhbC51cGRhdGVDb250ZW50KHRoaXMuY29udGV4dC5wcmV2aWV3RXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQoY29udGVudCwgeyB3cmFwOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGJhbGFuY2VGb3JtKSB7XG4gICAgICAgIGNvbnN0IGJhbGFuY2VWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkYmFsYW5jZUZvcm0uZmluZCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLFxuICAgICAgICB9KTtcblxuICAgICAgICBiYWxhbmNlVmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBzZWxlY3RvcjogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJnaWZ0Y2VydGlmaWNhdGVjb2RlXCJdJyksXG4gICAgICAgICAgICB2YWxpZGF0ZShjYiwgdmFsKSB7XG4gICAgICAgICAgICAgICAgY2IoZ2lmdENlcnRDaGVja2VyKHZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZTogJ1lvdSBtdXN0IGVudGVyIGEgY2VydGlmaWNhdGUgY29kZS4nLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYmFsYW5jZVZhbGlkYXRvcjtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9