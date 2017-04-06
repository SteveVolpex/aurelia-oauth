var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-dependency-injection", "./jwt-token-service", "./oauth-polyfills"], function (require, exports, aurelia_dependency_injection_1, jwt_token_service_1, oauth_polyfills_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OAuthTokenService = (function () {
        function OAuthTokenService(jwtTokenService) {
            var _this = this;
            this.jwtTokenService = jwtTokenService;
            this.configure = function (config) {
                if (config.urlTokenParameters) {
                    config.urlTokenParameters = oauth_polyfills_1.objectAssign(_this.config.urlTokenParameters, config.urlTokenParameters);
                }
                _this.config = oauth_polyfills_1.objectAssign(_this.config, config);
                return config;
            };
            this.createToken = function (urlTokenData) {
                var token = urlTokenData[_this.config.urlTokenParameters.idToken];
                var tokenType = urlTokenData[_this.config.urlTokenParameters.tokenType] || 'Bearer';
                var accessToken = urlTokenData[_this.config.urlTokenParameters.accessToken];
                if (!token) {
                    return null;
                }
                var claims = _this.jwtTokenService.getJwtClaims(token);
                var issuedTime = claims.nbf ? claims.nbf : claims.iat;
                var expirationTime = claims.exp - issuedTime;
                return {
                    token: token,
                    accessToken: accessToken,
                    tokenType: tokenType,
                    expiresAt: _this.getTimeNow() + expirationTime,
                    jwtClaims: claims
                };
            };
            this.setToken = function (data) {
                return _this.tokenData = data;
            };
            this.getToken = function () {
                return _this.tokenData;
            };
            this.getIdToken = function () {
                return _this.getToken() ? _this.getToken().token : undefined;
            };
            this.getAccessToken = function () {
                return _this.getToken() ? _this.getToken().accessToken : undefined;
            };
            this.getAuthorizationHeader = function () {
                if (!(_this.getTokenType() && _this.getIdToken())) {
                    return '';
                }
                var tokenType = _this.getTokenType().charAt(0).toUpperCase() + _this.getTokenType().substr(1);
                if (_this.getAccessToken()) {
                    return tokenType + " " + _this.getAccessToken();
                }
                return tokenType + " " + _this.getIdToken();
            };
            this.getTokenType = function () {
                return _this.getToken() ? _this.getToken().tokenType : undefined;
            };
            this.getTokenExpirationTime = function () {
                var tokenRenewalOffsetSeconds = 30;
                var expireOffset = _this.config.expireOffsetSeconds + tokenRenewalOffsetSeconds;
                return (_this.tokenData.expiresAt - _this.getTimeNow() - expireOffset);
            };
            this.removeToken = function () {
                return _this.tokenData = null;
            };
            this.isTokenValid = function () {
                var token = _this.getToken();
                if (!token) {
                    return false;
                }
                var timeNow = _this.getTimeNow();
                var expiresAt = token.expiresAt;
                var isValid = (expiresAt && (expiresAt > timeNow + _this.config.expireOffsetSeconds));
                return isValid;
            };
            this.getTimeNow = function () {
                return Math.round(new Date().getTime() / 1000.0);
            };
            this.config = {
                name: 'id_token',
                urlTokenParameters: {
                    idToken: 'id_token',
                    accessToken: 'access_token',
                    tokenType: 'token_type'
                },
                expireOffsetSeconds: 60
            };
        }
        return OAuthTokenService;
    }());
    OAuthTokenService = __decorate([
        aurelia_dependency_injection_1.autoinject(),
        __metadata("design:paramtypes", [jwt_token_service_1.default])
    ], OAuthTokenService);
    exports.OAuthTokenService = OAuthTokenService;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC10b2tlbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQXdCQSxJQUFhLGlCQUFpQjtRQU0xQiwyQkFBb0IsZUFBZ0M7WUFBcEQsaUJBVUM7WUFWbUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1lBWTdDLGNBQVMsR0FBRyxVQUFDLE1BQXdCO2dCQUd4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUMsa0JBQWtCLEdBQUcsOEJBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN4RyxDQUFDO2dCQUVELEtBQUksQ0FBQyxNQUFNLEdBQUcsOEJBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUVoRCxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQ2xCLENBQUMsQ0FBQztZQUVLLGdCQUFXLEdBQUcsVUFBQyxZQUFpQjtnQkFDbkMsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ25FLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztnQkFDckYsSUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRTdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNoQixDQUFDO2dCQUVELElBQU0sTUFBTSxHQUFjLEtBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFD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QUNsQyxJQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxJQUFNLE9BQU8sR0FBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7Z0JBRXZGLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDbkIsQ0FBQyxDQUFDO1lBRU0sZUFBVSxHQUFHO2dCQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQztZQXpHRSxJQUFJLENBQUMsTUFBTSxHQUFHO2dCQUNWLElBQUksRUFBRSxVQUFVO2dCQUNoQixrQkFBa0IsRUFBRTtvQkFDaEIsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFdBQVcsRUFBRSxjQUFjO29CQUMzQixTQUFTLEVBQUUsWUFBWTtpQkFDMUI7Z0JBQ0QsbUJBQW1CLEVBQUUsRUFBRTthQUMxQixDQUFDO1FBQ04sQ0FBQztRQWlHTCx3QkFBQztJQUFELENBakhBLEFBaUhDLElBQUE7SUFqSFksaUJBQWlCO1FBRDdCLHlDQUFVLEVBQUU7eUNBTzRCLDJCQUFlO09BTjNDLGlCQUFpQixDQWlIN0I7SUFqSFksOENBQWlCIiwiZmlsZSI6Im9hdXRoLXRva2VuLXNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1kZXBlbmRlbmN5LWluamVjdGlvbic7XHJcblxyXG5pbXBvcnQgSnd0VG9rZW5TZXJ2aWNlLCB7IEp3dENsYWltcyB9IGZyb20gJy4vand0LXRva2VuLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBvYmplY3RBc3NpZ24gfSBmcm9tICcuL29hdXRoLXBvbHlmaWxscyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoVG9rZW5Db25maWcge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdXJsVG9rZW5QYXJhbWV0ZXJzPzoge1xyXG4gICAgICAgIGlkVG9rZW46IHN0cmluZztcclxuICAgICAgICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG4gICAgICAgIHRva2VuVHlwZT86IHN0cmluZztcclxuICAgIH07XHJcbiAgICBleHBpcmVPZmZzZXRTZWNvbmRzPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIE9BdXRoVG9rZW5EYXRhIHtcclxuICAgIHRva2VuOiBzdHJpbmc7XHJcbiAgICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xyXG4gICAgdG9rZW5UeXBlOiBzdHJpbmc7XHJcbiAgICBleHBpcmVzQXQ6IG51bWJlcjtcclxuICAgIGp3dENsYWltcz86IEp3dENsYWltcztcclxufVxyXG5cclxuQGF1dG9pbmplY3QoKVxyXG5leHBvcnQgY2xhc3MgT0F1dGhUb2tlblNlcnZpY2Uge1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IE9BdXRoVG9rZW5Db25maWc7XHJcblxyXG4gICAgcHJpdmF0ZSB0b2tlbkRhdGE6IE9BdXRoVG9rZW5EYXRhO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgand0VG9rZW5TZXJ2aWNlOiBKd3RUb2tlblNlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcclxuICAgICAgICAgICAgbmFtZTogJ2lkX3Rva2VuJyxcclxuICAgICAgICAgICAgdXJsVG9rZW5QYXJhbWV0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBpZFRva2VuOiAnaWRfdG9rZW4nLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzVG9rZW46ICdhY2Nlc3NfdG9rZW4nLFxyXG4gICAgICAgICAgICAgICAgdG9rZW5UeXBlOiAndG9rZW5fdHlwZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXhwaXJlT2Zmc2V0U2Vjb25kczogNjBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjb25maWd1cmUgPSAoY29uZmlnOiBPQXV0aFRva2VuQ29uZmlnKTogT0F1dGhUb2tlbkNvbmZpZyA9PiB7XHJcblxyXG4gICAgICAgIC8vIEV4dGVuZCBkZWZhdWx0IGNvbmZpZ3JhdGlvbiB3aXRoIHN1cHBsaWVkIGNvbmZpZyBkYXRhXHJcbiAgICAgICAgaWYgKGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgY29uZmlnLnVybFRva2VuUGFyYW1ldGVycyA9IG9iamVjdEFzc2lnbih0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMsIGNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBvYmplY3RBc3NpZ24odGhpcy5jb25maWcsIGNvbmZpZyk7XHJcblxyXG4gICAgICAgIHJldHVybiBjb25maWc7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjcmVhdGVUb2tlbiA9ICh1cmxUb2tlbkRhdGE6IGFueSk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHVybFRva2VuRGF0YVt0aGlzLmNvbmZpZy51cmxUb2tlblBhcmFtZXRlcnMuaWRUb2tlbl07XHJcbiAgICAgICAgY29uc3QgdG9rZW5UeXBlID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy50b2tlblR5cGVdIHx8ICdCZWFyZXInO1xyXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdXJsVG9rZW5EYXRhW3RoaXMuY29uZmlnLnVybFRva2VuUGFyYW1ldGVycy5hY2Nlc3NUb2tlbl07XHJcblxyXG4gICAgICAgIGlmICghdG9rZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjbGFpbXM6IEp3dENsYWltcyA9IHRoaXMuand0VG9rZW5TZXJ2aWNlLmdldEp3dENsYWltcyh0b2tlbik7XHJcbiAgICAgICAgY29uc3QgaXNzdWVkVGltZSA9IGNsYWltcy5uYmYgPyBjbGFpbXMubmJmIDogY2xhaW1zLmlhdDtcclxuICAgICAgICBjb25zdCBleHBpcmF0aW9uVGltZSA9IGNsYWltcy5leHAgLSBpc3N1ZWRUaW1lO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0b2tlbjogdG9rZW4sXHJcbiAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbixcclxuICAgICAgICAgICAgdG9rZW5UeXBlOiB0b2tlblR5cGUsXHJcbiAgICAgICAgICAgIGV4cGlyZXNBdDogdGhpcy5nZXRUaW1lTm93KCkgKyBleHBpcmF0aW9uVGltZSxcclxuICAgICAgICAgICAgand0Q2xhaW1zOiBjbGFpbXNcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgc2V0VG9rZW4gPSAoZGF0YTogT0F1dGhUb2tlbkRhdGEpOiBPQXV0aFRva2VuRGF0YSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5EYXRhID0gZGF0YTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldFRva2VuID0gKCk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGE7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRJZFRva2VuID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlbiA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldEFjY2Vzc1Rva2VuID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS5hY2Nlc3NUb2tlbiA6IHVuZGVmaW5lZDtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGdldEF1dGhvcml6YXRpb25IZWFkZXIgPSAoKTogc3RyaW5nID0+IHtcclxuICAgICAgICBpZiAoISh0aGlzLmdldFRva2VuVHlwZSgpICYmIHRoaXMuZ2V0SWRUb2tlbigpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b2tlblR5cGUgPSB0aGlzLmdldFRva2VuVHlwZSgpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgdGhpcy5nZXRUb2tlblR5cGUoKS5zdWJzdHIoMSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdldEFjY2Vzc1Rva2VuKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGAke3Rva2VuVHlwZX0gJHt0aGlzLmdldEFjY2Vzc1Rva2VuKCl9YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGAke3Rva2VuVHlwZX0gJHt0aGlzLmdldElkVG9rZW4oKX1gO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0VG9rZW5UeXBlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW4oKSA/IHRoaXMuZ2V0VG9rZW4oKS50b2tlblR5cGUgOiB1bmRlZmluZWQ7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBnZXRUb2tlbkV4cGlyYXRpb25UaW1lID0gKCk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW5SZW5ld2FsT2Zmc2V0U2Vjb25kcyA9IDMwO1xyXG4gICAgICAgIGNvbnN0IGV4cGlyZU9mZnNldCA9IHRoaXMuY29uZmlnLmV4cGlyZU9mZnNldFNlY29uZHMgKyB0b2tlblJlbmV3YWxPZmZzZXRTZWNvbmRzO1xyXG5cclxuICAgICAgICByZXR1cm4gKHRoaXMudG9rZW5EYXRhLmV4cGlyZXNBdCAtIHRoaXMuZ2V0VGltZU5vdygpIC0gZXhwaXJlT2Zmc2V0KTtcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlbW92ZVRva2VuID0gKCk6IE9BdXRoVG9rZW5EYXRhID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2tlbkRhdGEgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBwdWJsaWMgaXNUb2tlblZhbGlkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdGhpcy5nZXRUb2tlbigpO1xyXG5cclxuICAgICAgICBpZiAoIXRva2VuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRpbWVOb3cgPSB0aGlzLmdldFRpbWVOb3coKTtcclxuICAgICAgICBjb25zdCBleHBpcmVzQXQgPSB0b2tlbi5leHBpcmVzQXQ7XHJcbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IChleHBpcmVzQXQgJiYgKGV4cGlyZXNBdCA+IHRpbWVOb3cgKyB0aGlzLmNvbmZpZy5leHBpcmVPZmZzZXRTZWNvbmRzKSk7XHJcblxyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGdldFRpbWVOb3cgPSAoKTogbnVtYmVyID0+IHtcclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDAuMCk7XHJcbiAgICB9O1xyXG59Il19
