const RolePermissionService = require('../utils/acmodule');

module.exports ={
    // AuthService:require('./authService'),
    UserService:require('./userService'),
    EmailService:require('./emailService'),
    RoleService:require('./roleService'),
    CategoryService:require('./categoryService'),
    PermissionService: require('./permissionService'),
    RolePermissionService:require('./rolePermissionService')
}