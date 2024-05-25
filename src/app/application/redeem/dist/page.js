"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var form_1 = require("@/components/ui/form");
var navigation_1 = require("next/navigation");
var use_toast_1 = require("@/components/ui/use-toast");
var utils_1 = require("@/lib/utils");
var zod_1 = require("@hookform/resolvers/zod");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("zod");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var ai_1 = require("react-icons/ai");
var useOrderService_1 = require("@/hooks/useOrderService");
var useLocalStorage_1 = require("@/hooks/useLocalStorage");
var use_sound_1 = require("use-sound");
exports.viewport = {
    themeColor: "#fff"
};
var redeemSchema = zod_2.z.object({
    redeem_code: zod_2.z.string().min(6, {
        message: "Redeem code must be at least 6 characters long"
    })
});
function Redeem() {
    var _a = react_1.useTransition(), isPending = _a[0], startTransition = _a[1];
    var getItem = useLocalStorage_1.useLocalStorage("value").getItem;
    var currentUser = getItem();
    var redeemOrderService = useOrderService_1.useOrderServices().redeemOrderService;
    var _b = react_1.useState(0), notificationCounter = _b[0], setNotificationCounter = _b[1];
    var play = use_sound_1["default"]("/sounds/notification.mp3", { volume: 1 })[0];
    react_1.useEffect(function () {
        if (notificationCounter > 0) {
            play();
        }
    }, [notificationCounter]);
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(redeemSchema)
    });
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                startTransition(function () { return __awaiter(_this, void 0, void 0, function () {
                    var result, error;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, redeemOrderService(__assign(__assign({}, data), { user: currentUser }))];
                            case 1:
                                result = _a.sent();
                                error = result.error;
                                if (error === null || error === void 0 ? void 0 : error.message) {
                                    use_toast_1.toast({
                                        variant: "destructive",
                                        title: "Error",
                                        description: error.message
                                    });
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                            case 2:
                                _a.sent();
                                setNotificationCounter(function (prev) { return prev + 1; });
                                setTimeout(function () {
                                    use_toast_1.toast({
                                        className: utils_1.cn("top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"),
                                        title: "🎉 Redeemed",
                                        description: "Your order has been redeemed successfully!"
                                    });
                                }, 500);
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 500); })];
                            case 3:
                                _a.sent();
                                navigation_1.redirect("/application/orders/" + result.data[0].id);
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    }
    return (React.createElement("div", { className: "flex flex-col gap-4 min-h-[70vh] w-full place-items-center justify-center p-4 relative" },
        React.createElement("div", { className: "w-full h-fit flex flex-col gap-6 justify-between bg-darkComponentBg rounded-2xl p-8 shadow-lg" },
            React.createElement("div", { className: "w-full flex flex-col" },
                React.createElement("h1", { className: "text-start text-2xl text-white font-bold" }, "Redeem Order"),
                React.createElement("p", { className: "text-white text-sm" }, "Redeem your tracking service by entering the code from your receipt. If you have any issues, please contact us or visit our nearest branches.")),
            React.createElement("div", { className: "w-full flex flex-col justify-center place-items-center h-fit gap-6 z-40" },
                React.createElement(form_1.Form, __assign({}, form),
                    React.createElement("form", { className: "flex flex-col w-full gap-8", onSubmit: form.handleSubmit(onSubmit) },
                        React.createElement("div", { className: "flex flex-col w-full gap-2" },
                            React.createElement("div", { className: "flex flex-col w-full gap-3" },
                                React.createElement(form_1.FormField, { control: form.control, name: "redeem_code", render: function (_a) {
                                        var field = _a.field;
                                        return (React.createElement(form_1.FormItem, null,
                                            React.createElement(form_1.FormLabel, { className: "text-xs text-white pointer-events-none" }, "Enter Code"),
                                            React.createElement(form_1.FormControl, null,
                                                React.createElement("input", __assign({ title: "redeem_code", type: "text", placeholder: "Enter Code", className: "w-full text-sm px-5 py-2.5 h-[50px] rounded-xl bg-lightBorder text-white border border-lightBorder " }, field))),
                                            React.createElement(form_1.FormMessage, null)));
                                    } }))),
                        React.createElement(button_1.Button, { type: "submit", className: "w-full flex gap-4 text-white text-sm px-5 py-2.5 h-[50px] text-center bg-applicationPrimary hover:bg-applicationPrimary/70 font-bold rounded-xl transition-all duration-300 active:scale-95" },
                            React.createElement("span", { className: utils_1.cn("pointer-events-none", {
                                    hidden: isPending
                                }) }, "Redeem"),
                            React.createElement(ai_1.AiOutlineLoading3Quarters, { className: utils_1.cn("pointer-events-none animate-spin", {
                                    hidden: !isPending
                                }) }))))))));
}
exports["default"] = Redeem;
