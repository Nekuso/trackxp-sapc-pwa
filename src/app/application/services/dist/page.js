"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.viewport = void 0;
var image_1 = require("next/image");
var react_1 = require("react");
var useServices_1 = require("@/hooks/useServices");
var useLocalStorage_1 = require("@/hooks/useLocalStorage");
var navigation_1 = require("next/navigation");
var services_content_1 = require("./services-content");
var loading_search_gif_1 = require("@/images/loading-search.gif");
exports.viewport = {
    themeColor: "#fff"
};
function Application() {
    var _this = this;
    var getItem = useLocalStorage_1.useLocalStorage("value").getItem;
    var currentUser = getItem();
    var _a = react_1.useState(false), error = _a[0], setError = _a[1];
    var _b = useServices_1.useServices(), getServices = _b.getServices, servicesData = _b.servicesData;
    react_1.useEffect(function () {
        var initialFetch = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = getServices();
                if (result)
                    setError(result);
                return [2 /*return*/];
            });
        }); };
        initialFetch();
        if (!currentUser) {
            navigation_1.redirect("/auth");
        }
    }, []);
    return (React.createElement("div", { className: "flex flex-col gap-4 w-full place-items-center justify-start px-4 relative" },
        React.createElement("div", { className: "w-full h-fit flex flex-col justify-between px-2 relative" },
            React.createElement("div", { className: "w-full flex flex-col py-6 sticky top-0 bg-darkBg z-[50]" },
                React.createElement("h1", { className: "text-start text-2xl text-white font-bold" }, "All Services"),
                React.createElement("p", { className: "text-white text-sm" }, "View all services available on all our branches.")),
            servicesData.length === 0 ? (React.createElement("div", { className: "w-full min-h-[70vh] flex justify-center place-items-center" },
                React.createElement(image_1["default"], { src: loading_search_gif_1["default"], alt: "Loading Logo", className: "w-full md:w-[25%] mx-auto pointer-events-none" }))) : (React.createElement(services_content_1["default"], { servicesData: servicesData })))));
}
exports["default"] = Application;
