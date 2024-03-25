"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeDecorator = void 0;
const common_1 = require("@nestjs/common");
exports.EmployeeDecorator = (0, common_1.createParamDecorator)((filter, context) => {
    const request = context.switchToHttp().getRequest();
    if (request.employee) {
        request.employee[filter];
        if (filter) {
        }
        else {
            return request.employee;
        }
    }
    else {
        throw new common_1.NotFoundException('O colaborador não foi encontrado na base de dados.');
    }
});
//# sourceMappingURL=employee.decorator.js.map