"use strict";

export class StringFn {
    /**
     * @return {String}
     * @param str
     */
    modifyShortDescription(str) {
        if (!str) return "";

        return str.replace(/\<p\>|\<\/p\>/g, "");
    }

    /**
     * @return {String}
     * @param str
     * @param type
     * @desc    1:Space  2：Dot
     */
    replaceDash(str, type) {
        if (!str) return "";

        type = type || 1;
        switch (type) {
            case 1:
                return str.replace(/\-/g, " ").toLowerCase();
            case 2:
                return str.replace(/\-/g, ".").toLowerCase();
            default:
                return str;
        }
    }

    /**
     * @return {String}
     * @param str
     * @param type
     * @desc    1:Space  2：Dot
     */
    replaceUnderscore(str, type) {
        if (!str) return "";

        type = type || 1;
        switch (type) {
            case 1:
                return str.replace(/\_/g, " ").toLowerCase();
            case 2:
                return str.replace(/\_/g, ".").toLowerCase();
            default:
                return str;
        }
    }

    /**
     * @return {String}
     * @param str
     */
    replaceSpace(str) {
        if (!str) return "";

        return str.replace(/\s/g, "-").toLowerCase();
    }

    /**
     * @return {String}
     * @param str
     * @param type
     * @desc    1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
     */
    changeCase(str, type) {
        type = type || 4;
        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return str
                    .split("")
                    .map(function (word) {
                        if (/[a-z]/.test(word)) {
                            return word.toUpperCase();
                        } else {
                            return word.toLowerCase();
                        }
                    })
                    .join("");
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    }

    /*过滤html代码(把<>转换)*/
    // filterTag(str) {
    //     str = str.replace(/&/ig, "&amp;");
    //     str = str.replace(/</ig, "&lt;");
    //     str = str.replace(/>/ig, "&gt;");
    //     str = str.replace(" ", "&nbsp;");
    //     return str;
    // }
}

export class NumberFn {
    /**
     * @return {Number}
     * @param {String, Number} input 输入的数
     * @param defaultValue
     */
    strToInt(input, defaultValue) {
        let value = parseInt(input);
        if (isNaN(value) || Infinity === value) {
            defaultValue = defaultValue || 0;
            return defaultValue;
        }
        return value;
    }

    /**
     * @return {Number}
     * @param {String, Number} input 输入的数
     * @param defaultValue
     */
    strToFloat(input, defaultValue) {
        // let str = input.toString();
        // str = str.slice(0, (str.indexOf(".")) + 2 + 1);
        let value = parseFloat(input);
        if (isNaN(value) || Infinity === value) {
            defaultValue = defaultValue || 0;
            return defaultValue;
        }
        return value;
    }
}

export class UrlFn {
    /**
     * @return {String}
     * @param name
     */
    getParam(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);

        if (r != null) return unescape(r[2]);
        return null;
    }

    /**
     * @return {String}
     * @param paramName
     * @param url
     */
    getParameter(paramName, url) {
        let searchUrl = window.location.search.replace("?", "");
        if (url != null) {
            let index = url.indexOf("?");
            url = url.substr(index + 1);
            searchUrl = url;
        }
        let ss = searchUrl.split("&");
        let paramNameStr = "";
        let paramNameIndex = -1;
        for (let i = 0; i < ss.length; i++) {
            paramNameIndex = ss[i].indexOf("=");
            paramNameStr = ss[i].substring(0, paramNameIndex);
            if (paramNameStr === paramName) {
                let returnValue = ss[i].substring(paramNameIndex + 1, ss[i].length);
                if (typeof returnValue == "undefined") {
                    returnValue = "";
                }
                return returnValue;
            }
        }
        return "";
    }
}

export class DateFn {
    /**
     * @return {String}
     */
    getReceivedDay() {
        let date = new Date();
        let day = (date.getDay() + 3) % 7;

        switch (day) {
            case 0:
                return "Monday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Monday";
            default:
                return "Monday";
        }
    }

    getReceivedDayV2(time) {
        let date = new Date();
        let day = date.getDay() % 7;

        switch (day) {
            case 0:
                return "Monday";
            case 1:
                if (!time || time.hour < 3 || (time.hour < 4 && time.min < 30)) {
                    return "Next Day"
                }
                return "Today";
            case 2:
                if (!time || time.hour < 3 || (time.hour < 4 && time.min < 30)) {
                    return "Next Day"
                }
                return "Today";
            case 3:
                if (!time || time.hour < 3 || (time.hour < 4 && time.min < 30)) {
                    return "Next Day"
                }
                return "Today";
            case 4:
                if (!time || time.hour < 3 || (time.hour < 4 && time.min < 30)) {
                    return "Next Day"
                }
                return "Today";
            case 5:
                if (!time || time.hour < 3 || (time.hour < 4 && time.min < 30)) {
                    return "Monday"
                }
                return "Today";
            case 6:
                return "Monday";
            default:
                return "Monday";
        }
    }
}
