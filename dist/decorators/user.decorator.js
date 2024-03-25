"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.UserDecorator = (0, common_1.createParamDecorator)((filter, context) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
        request.user[filter];
        if (filter) {
        }
        else {
            return request.user;
        }
    }
    else {
        throw new common_1.NotFoundException('O usuário não foi encontrado na base de dados.');
    }
});
//# sourceMappingURL=user.decorator.js.map