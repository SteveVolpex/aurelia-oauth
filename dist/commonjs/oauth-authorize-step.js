"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_dependency_injection_1 = require("aurelia-dependency-injection");
var oauth_service_1 = require("./oauth-service");
var OAuthAuthorizeStep = (function () {
    function OAuthAuthorizeStep(oauthService) {
        this.oauthService = oauthService;
    }
    OAuthAuthorizeStep.prototype.run = function (routingContext, next) {
        var toState = routingContext.config;
        if (this.oauthService.loginOnStateChange(toState)) {
            return next.complete('Redirect');
        }
        return next();
    };
    return OAuthAuthorizeStep;
}());
OAuthAuthorizeStep = __decorate([
    aurelia_dependency_injection_1.autoinject(),
    __metadata("design:paramtypes", [oauth_service_1.OAuthService])
], OAuthAuthorizeStep);
exports.OAuthAuthorizeStep = OAuthAuthorizeStep;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC1hdXRob3JpemUtc3RlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDZFQUEwRDtBQUUxRCxpREFBK0M7QUFHL0MsSUFBYSxrQkFBa0I7SUFDN0IsNEJBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO0lBQUksQ0FBQztJQUVuRCxnQ0FBRyxHQUFILFVBQUksY0FBYyxFQUFFLElBQVU7UUFDNUIsSUFBSSxPQUFPLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDSCx5QkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBWlksa0JBQWtCO0lBRDlCLHlDQUFVLEVBQUU7cUNBRXVCLDRCQUFZO0dBRG5DLGtCQUFrQixDQVk5QjtBQVpZLGdEQUFrQiIsImZpbGUiOiJvYXV0aC1hdXRob3JpemUtc3RlcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHQgfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IE9BdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBjbGFzcyBPQXV0aEF1dGhvcml6ZVN0ZXAge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgb2F1dGhTZXJ2aWNlOiBPQXV0aFNlcnZpY2UpIHsgfVxyXG5cclxuICBydW4ocm91dGluZ0NvbnRleHQsIG5leHQ6IE5leHQpIHtcclxuICAgIGxldCB0b1N0YXRlID0gcm91dGluZ0NvbnRleHQuY29uZmlnO1xyXG5cclxuICAgIGlmICh0aGlzLm9hdXRoU2VydmljZS5sb2dpbk9uU3RhdGVDaGFuZ2UodG9TdGF0ZSkpIHtcclxuICAgICAgcmV0dXJuIG5leHQuY29tcGxldGUoJ1JlZGlyZWN0Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHQoKTtcclxuICB9XHJcbn0iXX0=
