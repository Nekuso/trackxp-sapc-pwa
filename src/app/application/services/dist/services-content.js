"use client";
"use strict";
exports.__esModule = true;
exports.viewport = void 0;
var navigation_1 = require("next/navigation");
var avatar_1 = require("@/components/ui/avatar");
var dialog_1 = require("@/components/ui/dialog");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var image_input_1 = require("./image-input");
exports.viewport = {
    themeColor: "#fff"
};
function ServicesContent(_a) {
    var servicesData = _a.servicesData;
    var router = navigation_1.useRouter();
    console.log(servicesData);
    return (React.createElement("div", { className: "w-full flex flex-col gap-6 justify-between rounded-2xl pb-14" }, servicesData.map(function (order) {
        return (React.createElement("div", { className: "w-full h-fit bg-darkComponentBg rounded-2xl p-4 shadow-xl flex flex-col gap-2 active:scale-95 transition-all duration-300" },
            React.createElement(dialog_1.Dialog, null,
                React.createElement(dialog_1.DialogTrigger, { asChild: true },
                    React.createElement("div", { className: "flex place-items-start gap-3" },
                        React.createElement(avatar_1.Avatar, { className: "w-24 h-24 cursor-pointer z-0 rounded-md" },
                            React.createElement(avatar_1.AvatarImage, { src: order.image_url, alt: order.image_url }),
                            React.createElement(avatar_1.AvatarFallback, { className: "bg-darkBg rounded-md text-white" }, order.name[0])),
                        React.createElement("div", { className: "flex flex-col" },
                            React.createElement("p", { className: "flex text-md flex-wrap font-semibold text-white" }, order.name),
                            React.createElement("p", { className: "flex flex-wrap text-xs text-white/50" },
                                "Status: ",
                                order.status),
                            React.createElement("p", { className: "flex flex-wrap text-xs text-white/50" },
                                "Duration: ",
                                order.duration),
                            React.createElement("p", { className: "flex flex-wrap text-xs text-white/50" },
                                "Branch: ",
                                order.inventory.branches.branch_name)))),
                React.createElement(dialog_1.DialogContent, { className: "w-[90%] bg-darkComponentBg border border-lightBorder shadow-2xl rounded-2xl" },
                    React.createElement(dialog_1.DialogHeader, null,
                        React.createElement(dialog_1.DialogTitle, { className: "text-white" }, "Service")),
                    React.createElement("div", { className: "w-full flex flex-col h-fit" },
                        React.createElement("div", { className: "w-full h-full flex flex-col gap-4" },
                            React.createElement("div", { className: "w-full flex justify-center place-items-center gap-4" },
                                React.createElement(image_input_1["default"], { data: order.image_url }),
                                React.createElement("div", { className: "w-full flex flex-col gap-4" },
                                    React.createElement("div", { className: "w-full flex flex-col gap-1" },
                                        React.createElement("span", { className: "text-xs text-white" }, "Service Name"),
                                        React.createElement(input_1.Input, { className: "rounded-lg bg-lightComponentBg border-slate-600/50 text-white text-xs", type: "text", placeholder: "Service name", value: order.name, readOnly: true })),
                                    React.createElement("div", { className: "w-full flex gap-4" },
                                        React.createElement("div", { className: "w-full flex flex-col gap-1" },
                                            React.createElement("span", { className: "text-xs text-white" }, "Estimated Duration (mins)"),
                                            React.createElement(input_1.Input, { className: "rounded-lg bg-lightComponentBg border-slate-600/50 text-white", type: "number", placeholder: "Duration", value: order.duration, readOnly: true }))))),
                            React.createElement("div", { className: "w-full flex flex-col gap-4" },
                                React.createElement("div", { className: "w-full flex flex-col gap-1" },
                                    React.createElement("span", { className: "text-xs text-white" }, "Branch"),
                                    React.createElement(input_1.Input, { className: "rounded-lg bg-lightComponentBg border-slate-600/50 text-white text-xs", type: "text", placeholder: "Service name", value: order.inventory.branches.branch_name, readOnly: true })),
                                React.createElement("div", { className: "w-full flex gap-4" },
                                    React.createElement("div", { className: "w-full flex flex-col gap-1" },
                                        React.createElement("span", { className: "text-xs text-white" }, "Location"),
                                        React.createElement(textarea_1.Textarea, { className: "h-fit rounded-lg bg-lightComponentBg border-slate-600/50 text-white resize-none", placeholder: "Location", value: order.inventory.branches.branch_location, readOnly: true })))),
                            React.createElement("div", { className: "w-full h-full" },
                                React.createElement("span", { className: "text-xs text-white" }, "Description"),
                                React.createElement(textarea_1.Textarea, { className: "bg-lightComponentBg border-slate-600/50 w-full min-h-[150px] resize-none no-scrollbar text-white", placeholder: "Description", value: order.description, readOnly: true }))))))));
    })));
}
exports["default"] = ServicesContent;
