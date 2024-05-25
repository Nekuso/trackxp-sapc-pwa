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
var orders_content_1 = require("./orders-content");
var useLocalStorage_1 = require("@/hooks/useLocalStorage");
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var useOrderService_1 = require("@/hooks/useOrderService");
var client_1 = require("@/lib/supabase/client");
exports.viewport = {
    themeColor: "#fff"
};
function Orders() {
    var _this = this;
    var getItem = useLocalStorage_1.useLocalStorage("value").getItem;
    var currentUser = getItem();
    var _a = react_1.useState(false), error = _a[0], setError = _a[1];
    var _b = useOrderService_1.useOrderServices(), getOrderServices = _b.getOrderServices, orderServicesData = _b.orderServicesData;
    react_1.useEffect(function () {
        var initialFetch = function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = getOrderServices(currentUser);
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
    react_1.useEffect(function () {
        if (getOrderServices.length > 0) {
            var supabase_1 = client_1["default"]();
            var subscribedChannel_1 = supabase_1
                .channel("service-mobile-orders-follow-up-" + currentUser.id)
                .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "order_services",
                filter: "mobile_user_id=eq." + currentUser.id
            }, function (payload) {
                getOrderServices(currentUser);
            })
                .subscribe();
            return function () {
                supabase_1.removeChannel(subscribedChannel_1);
            };
        }
    }, [orderServicesData]);
    return (React.createElement("div", { className: "flex flex-col gap-4 w-full place-items-center justify-start px-4 relative" },
        React.createElement("div", { className: "w-full h-fit flex flex-col justify-between px-2 relative" },
            React.createElement("div", { className: "w-full flex flex-col py-6 sticky top-0 bg-darkBg z-[50]" },
                React.createElement("h1", { className: "text-start text-2xl text-white font-bold" }, "Recent Orders"),
                React.createElement("p", { className: "text-white text-sm" }, "View all your recent orders here.")),
            React.createElement(orders_content_1["default"], { orderServicesData: orderServicesData }))));
}
exports["default"] = Orders;
