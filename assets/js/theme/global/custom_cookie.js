export default class Custom_Cookie {
    init(){
        window['setCookie'] = this.setCookie;
        window['deleteCookie'] = this.deleteCookie;
        window['getCookie'] = this.getCookie;
        window['parseCookies'] = this.parseCookies;

    }
    
    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }
    deleteCookie(cname) {
        document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    getCookie(cname) {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    parseCookies() {
        return (document.cookie.split(/; */).reduce((obj, str) => {
            if (str === '')
                return obj;
            const eq = str.indexOf('=');
            const key = eq > 0 ? str.slice(0, eq) : str;
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
}
