"use strict";
exports.__esModule = true;
var avatar_1 = require("@/components/ui/avatar");
function ImageInput(_a) {
    var data = _a.data;
    return (React.createElement(avatar_1.Avatar, { className: "w-32 h-32 rounded-lg  cursor-pointer z-0" },
        React.createElement(avatar_1.AvatarImage, { className: "rounded-lg", src: data, alt: "something" }),
        React.createElement(avatar_1.AvatarFallback, { className: "bg-darkBg rounded-lg" }, "+")));
}
exports["default"] = ImageInput;
