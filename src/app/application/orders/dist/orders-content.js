"use client";
"use strict";
exports.__esModule = true;
exports.viewport = void 0;
var image_1 = require("next/image");
var react_countup_1 = require("react-countup");
var utils_1 = require("@/lib/utils");
var vehicle_small_hd_png_1 = require("@/images/vehicle-small-hd.png");
var vehicle_medium_hd_png_1 = require("@/images/vehicle-medium-hd.png");
var vehicle_large_hd_png_1 = require("@/images/vehicle-large-hd.png");
var navigation_1 = require("next/navigation");
exports.viewport = {
    themeColor: "#fff"
};
function OrdersContent(_a) {
    var orderServicesData = _a.orderServicesData;
    var router = navigation_1.useRouter();
    return (React.createElement("div", { className: "w-full flex flex-col gap-6 justify-between rounded-2xl pb-14" }, orderServicesData.map(function (order) {
        return (React.createElement("div", { className: "w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300", onClick: function () { return router.push("/application/orders/" + order.id); } },
            React.createElement("div", { className: "w-full flex flex-col" },
                React.createElement("div", { className: "w-full flex justify-between place-items-center" },
                    React.createElement("h1", { className: "text-white text-xs" },
                        "Status:",
                        " ",
                        React.createElement("span", { className: "text-white text-xs font-bold" }, order.progress_entries[order.progress_entries.length - 1]
                            .progress_name)),
                    React.createElement("h1", { className: "text-white text-xs bg-applicationPrimary px-4 py-1 rounded-full" }, order.status)),
                React.createElement("div", { className: "w-full flex justify-between place-items-center" },
                    React.createElement("h3", { className: "w-full text-sm font-bold text-slate-200 " },
                        "Tracking ID: ",
                        order.tracking_id)),
                React.createElement("div", { className: "w-full flex justify-between place-items-center" },
                    React.createElement("h3", { className: "w-full text-xs font-regular text-slate-200 " }, new Date(order.created_at).toDateString()))),
            React.createElement("div", { className: "flex justify-between place-items-center gap-2 w-full" },
                React.createElement("div", { className: "h-full flex flex-col justify-center" },
                    React.createElement("h2", { className: utils_1.cn("w-full text-center text-3xl font-extrabold text-white", order.progress_entries.length > 4 ? "text-green-300" : "") },
                        React.createElement(react_countup_1["default"], { start: 0, end: Math.round((order.progress_entries.length / 5) * 100), duration: 5 }),
                        "%"),
                    React.createElement("span", { className: utils_1.cn("w-full text-center text-xs text-slate-300", order.progress_entries.length > 4 ? "text-green-300" : "") }, "Completion")),
                React.createElement(image_1["default"], { src: order.vehicle_entries[0].type === "small"
                        ? vehicle_small_hd_png_1["default"]
                        : order.vehicle_entries[0].type === "medium"
                            ? vehicle_medium_hd_png_1["default"]
                            : vehicle_large_hd_png_1["default"], alt: "Vehicle", className: "rounded-xl w-[70%] pointer-events-none" })),
            React.createElement("div", { className: "w-full flex justify-between pt-3 border-t border-dashed border-lightGray" },
                React.createElement("span", { className: "text-white text-md font-semibold" }, "Total"),
                React.createElement("span", { className: "text-white text-lg font-bold" },
                    "\u20B1",
                    " ",
                    order.total_price
                        .toFixed(2)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")))));
    })));
}
exports["default"] = OrdersContent;
