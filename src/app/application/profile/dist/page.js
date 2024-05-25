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
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
var use_toast_1 = require("@/components/ui/use-toast");
var useLocalStorage_1 = require("@/hooks/useLocalStorage");
var navigation_1 = require("next/navigation");
var utils_1 = require("@/lib/utils");
var avatar_1 = require("@/components/ui/avatar");
exports.viewport = {
    themeColor: "#fff"
};
function Profile() {
    var _this = this;
    var _a = react_1.useTransition(), isPending = _a[0], startTransition = _a[1];
    var getItem = useLocalStorage_1.useLocalStorage("value").getItem;
    var currentUser = getItem();
    var removeItem = useLocalStorage_1.useLocalStorage("value").removeItem;
    var onSignOut = function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            use_toast_1.toast({
                className: utils_1.cn("top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"),
                title: "Logging out...",
                description: "Come back soon!"
            });
            startTransition(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // wait for 2 seconds
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
                        case 1:
                            // wait for 2 seconds
                            _a.sent();
                            removeItem();
                            navigation_1.redirect("/auth");
                            return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); };
    return (React.createElement("div", { className: "flex flex-col gap-4 min-h-[80vh] w-full place-items-center justify-between py-8 p-4 relative" },
        React.createElement("div", { className: "w-full flex flex-col gap-4 place-items-center justify-center" },
            React.createElement(avatar_1.Avatar, { className: "h-44 w-44 rounded-lg" },
                React.createElement(avatar_1.AvatarImage, { className: "rounded-lg", src: currentUser === null || currentUser === void 0 ? void 0 : currentUser.image_url, alt: "@shadcn" }),
                React.createElement(avatar_1.AvatarFallback, { className: "rounded-lg" }, currentUser === null || currentUser === void 0 ? void 0 :
                    currentUser.first_name[0],
                    " ", currentUser === null || currentUser === void 0 ? void 0 :
                    currentUser.last_name[0])),
            React.createElement("div", { className: "w-full flex flex-col gap-1" },
                React.createElement("h1", { className: "text-3xl font-bold w-full text-center text-white" }, currentUser === null || currentUser === void 0 ? void 0 :
                    currentUser.first_name,
                    " ", currentUser === null || currentUser === void 0 ? void 0 :
                    currentUser.last_name),
                React.createElement("h2", { className: "text-md font-medium w-full text-center text-slate-400" }, currentUser === null || currentUser === void 0 ? void 0 : currentUser.email))),
        React.createElement(button_1.Button, { className: "w-full rounded-3xl h-[70px] bg-red-500 hover:bg-red-600 transform active:scale-95 transition-transform", onClick: onSignOut }, "Logout")));
}
exports["default"] = Profile;
