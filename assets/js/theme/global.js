import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import carousel from './common/carousel';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';
import rootsLoaded from './roots/global';
import objectFitImages from './global/object-fit-polyfill';
import swal from './global/sweet-alert';
import Custom_Cart from './global/custom_cart';
import Custom_Cookie from './global/custom_cookie';





export default class Global extends PageManager {

    onReady() {
        cartPreview(this.context.secureBaseUrl, this.context.cartId);
        quickSearch();
        currencySelector();
        foundation($(document));
        quickView(this.context);
        carousel();
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        svgInjector();
        rootsLoaded();
        objectFitImages();
        window.customCart = new Custom_Cart();
        window.customCookie = new Custom_Cookie();
    }
}
