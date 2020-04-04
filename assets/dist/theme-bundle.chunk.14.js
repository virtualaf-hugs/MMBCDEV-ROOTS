(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./assets/js/theme/category.js":
/*!*************************************!*\
  !*** ./assets/js/theme/category.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Category; });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _roots_category__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./roots/category */ "./assets/js/theme/roots/category.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }







var Category = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Category, _CatalogPage);

  function Category() {
    return _CatalogPage.apply(this, arguments) || this;
  }

  var _proto = Category.prototype;

  _proto.onReady = function onReady() {
    Object(_global_compare_products__WEBPACK_IMPORTED_MODULE_2__["default"])(this.context.urls);

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__["hooks"].on('sortBy-submitted', this.onSortBySubmit);
    }

    Object(_roots_category__WEBPACK_IMPORTED_MODULE_4__["default"])();
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var $productListingContainer = $('#product-listing-container');
    var $facetedSearchContainer = $('#faceted-search-container');
    var productsPerPage = this.context.categoryProductsPerPage;
    var requestOptions = {
      config: {
        category: {
          shop_by_price: true,
          products: {
            limit: productsPerPage
          }
        }
      },
      template: {
        productListing: 'category/product-listing',
        sidebar: 'category/sidebar'
      },
      showMore: 'category/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_3__["default"](requestOptions, function (content) {
      $productListingContainer.html(content.productListing);
      $facetedSearchContainer.html(content.sidebar);
      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    });
  };

  return Category;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js")))

/***/ }),

/***/ "./assets/js/theme/roots/category.js":
/*!*******************************************!*\
  !*** ./assets/js/theme/roots/category.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loaded; });
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.exec */ "./node_modules/core-js/modules/es.regexp.exec.js");
/* harmony import */ var core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.string.replace */ "./node_modules/core-js/modules/es.string.replace.js");
/* harmony import */ var core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_replace__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.string.trim */ "./node_modules/core-js/modules/es.string.trim.js");
/* harmony import */ var core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_trim__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);




function loaded() {
  if (jquery__WEBPACK_IMPORTED_MODULE_3___default.a.trim(jquery__WEBPACK_IMPORTED_MODULE_3___default()('.page-sidebar').text()) === '') {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()('.page-sidebar').remove();
  }

  if (jquery__WEBPACK_IMPORTED_MODULE_3___default()('#facetedSearch').length <= 0) {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()('.toggleSidebarBlock').on('click', function toggleLink(e) {
      e.preventDefault();
      var toggleEleId = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).attr('href').replace('#', '');
      var toggleEle = document.getElementById(toggleEleId);
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).toggleClass('is-open');
      jquery__WEBPACK_IMPORTED_MODULE_3___default()(toggleEle).toggleClass('is-open');
    });
  } // subcategory display


  if (jquery__WEBPACK_IMPORTED_MODULE_3___default()('.page-content-subcategories .image-wrap:not(.image-placeholder)').length > 0) {
    jquery__WEBPACK_IMPORTED_MODULE_3___default()('.page-content-subcategories ul').addClass('subcategory-grid');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdGhlbWUvY2F0ZWdvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3RoZW1lL3Jvb3RzL2NhdGVnb3J5LmpzIl0sIm5hbWVzIjpbIkNhdGVnb3J5Iiwib25SZWFkeSIsImNvbXBhcmVQcm9kdWN0cyIsImNvbnRleHQiLCJ1cmxzIiwiJCIsImxlbmd0aCIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwiaG9va3MiLCJvbiIsInJvb3RzTG9hZGVkIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwiJGZhY2V0ZWRTZWFyY2hDb250YWluZXIiLCJwcm9kdWN0c1BlclBhZ2UiLCJjYXRlZ29yeVByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwiY29uZmlnIiwiY2F0ZWdvcnkiLCJzaG9wX2J5X3ByaWNlIiwicHJvZHVjdHMiLCJsaW1pdCIsInRlbXBsYXRlIiwicHJvZHVjdExpc3RpbmciLCJzaWRlYmFyIiwic2hvd01vcmUiLCJmYWNldGVkU2VhcmNoIiwiRmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwiQ2F0YWxvZ1BhZ2UiLCJsb2FkZWQiLCJ0cmltIiwidGV4dCIsInJlbW92ZSIsInRvZ2dsZUxpbmsiLCJlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVFbGVJZCIsImF0dHIiLCJyZXBsYWNlIiwidG9nZ2xlRWxlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRvZ2dsZUNsYXNzIiwiYWRkQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUVxQkEsUTs7Ozs7Ozs7O1NBQ2pCQyxPLEdBQUEsbUJBQVU7QUFDTkMsNEVBQWUsQ0FBQyxLQUFLQyxPQUFMLENBQWFDLElBQWQsQ0FBZjs7QUFFQSxRQUFJQyxD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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBob29rcyB9IGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcbmltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcbmltcG9ydCBGYWNldGVkU2VhcmNoIGZyb20gJy4vY29tbW9uL2ZhY2V0ZWQtc2VhcmNoJztcbmltcG9ydCByb290c0xvYWRlZCBmcm9tICcuL3Jvb3RzL2NhdGVnb3J5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0ZWdvcnkgZXh0ZW5kcyBDYXRhbG9nUGFnZSB7XG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29tcGFyZVByb2R1Y3RzKHRoaXMuY29udGV4dC51cmxzKTtcblxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuICAgICAgICByb290c0xvYWRlZCgpO1xuICAgIH1cblxuICAgIGluaXRGYWNldGVkU2VhcmNoKCkge1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LmNhdGVnb3J5UHJvZHVjdHNQZXJQYWdlO1xuICAgICAgICBjb25zdCByZXF1ZXN0T3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3BfYnlfcHJpY2U6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsaW1pdDogcHJvZHVjdHNQZXJQYWdlLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0TGlzdGluZzogJ2NhdGVnb3J5L3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnY2F0ZWdvcnkvc2hvdy1tb3JlJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmZhY2V0ZWRTZWFyY2ggPSBuZXcgRmFjZXRlZFNlYXJjaChyZXF1ZXN0T3B0aW9ucywgKGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9hZGVkKCkge1xuICAgIGlmICgkLnRyaW0oJCgnLnBhZ2Utc2lkZWJhcicpLnRleHQoKSkgPT09ICcnKSB7XG4gICAgICAgICQoJy5wYWdlLXNpZGViYXInKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAkKCcudG9nZ2xlU2lkZWJhckJsb2NrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gdG9nZ2xlTGluayhlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB0b2dnbGVFbGVJZCA9ICQodGhpcykuYXR0cignaHJlZicpLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgICAgICBjb25zdCB0b2dnbGVFbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0b2dnbGVFbGVJZCk7XG4gICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAkKHRvZ2dsZUVsZSkudG9nZ2xlQ2xhc3MoJ2lzLW9wZW4nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc3ViY2F0ZWdvcnkgZGlzcGxheVxuICAgIGlmICgkKCcucGFnZS1jb250ZW50LXN1YmNhdGVnb3JpZXMgLmltYWdlLXdyYXA6bm90KC5pbWFnZS1wbGFjZWhvbGRlciknKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5wYWdlLWNvbnRlbnQtc3ViY2F0ZWdvcmllcyB1bCcpLmFkZENsYXNzKCdzdWJjYXRlZ29yeS1ncmlkJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==