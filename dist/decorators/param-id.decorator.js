"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetId = void 0;
const common_1 = require("@nestjs/common");
exports.GetId = (0, common_1.createParamDecorator)((data, ctx) => {
    const requestId = ctx.switchToHttp().getRequest().params.id;
    if (requestId) {
        console.log('requestId OK', requestId);
        return requestId;
    }
    else {
        console.log('requestId FAIL', requestId);
        return null;
    }
});
//# sourceMappingURL=param-id.decorator.js.map