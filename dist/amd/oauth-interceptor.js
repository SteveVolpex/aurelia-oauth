var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-event-aggregator", "aurelia-dependency-injection", "./oauth-service", "./oauth-token-service"], function (require, exports, aurelia_event_aggregator_1, aurelia_dependency_injection_1, oauth_service_1, oauth_token_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AUTHORIZATION_HEADER = 'Authorization';
    var OAuthInterceptor = (function () {
        function OAuthInterceptor(oauthTokenService, eventAggregator) {
            var _this = this;
            this.oauthTokenService = oauthTokenService;
            this.eventAggregator = eventAggregator;
            this.request = function (config) {
                if (_this.oauthTokenService.getToken() && !_this.oauthTokenService.isTokenValid()) {
                    config.tokenExpired = true;
                    _this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT);
                    return Promise.reject(config);
                }
                if (config.headers.add && !config.headers.get(AUTHORIZATION_HEADER)) {
                    config.headers.add(AUTHORIZATION_HEADER, _this.oauthTokenService.getAuthorizationHeader());
                }
                if (config.headers.append && !config.headers.get(AUTHORIZATION_HEADER)) {
                    config.headers.append(AUTHORIZATION_HEADER, _this.oauthTokenService.getAuthorizationHeader());
                }
                return config;
            };
            this.response = function (response, request) {
                _this.handleRequestError(response, request);
                return response;
            };
            this.responseError = function (response, request) {
                _this.handleRequestError(response, request);
                return Promise.reject(response);
            };
        }
        OAuthInterceptor.prototype.handleRequestError = function (response, requestMessage) {
            if (response && response.statusCode && response.statusCode === 401
                && !response.requestMessage.tokenExpired && !this.oauthTokenService.isTokenValid()) {
                response.tokenExpired = true;
                this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
            }
            if (response && response.status && response.status === 401
                && !requestMessage.tokenExpired && !this.oauthTokenService.isTokenValid()) {
                response.tokenExpired = true;
                this.eventAggregator.publish(oauth_service_1.OAuthService.INVALID_TOKEN_EVENT, response);
            }
        };
        return OAuthInterceptor;
    }());
    OAuthInterceptor = __decorate([
        aurelia_dependency_injection_1.autoinject(),
        __metadata("design:paramtypes", [oauth_token_service_1.OAuthTokenService, typeof (_a = typeof aurelia_event_aggregator_1.EventAggregator !== "undefined" && aurelia_event_aggregator_1.EventAggregator) === "function" && _a || Object])
    ], OAuthInterceptor);
    exports.default = OAuthInterceptor;
    var _a;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vYXV0aC1pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFNQSxJQUFNLG9CQUFvQixHQUFXLGVBQWUsQ0FBQztJQUdyRCxJQUFxQixnQkFBZ0I7UUFDakMsMEJBQ1ksaUJBQW9DLEVBQ3BDLGVBQWdDO1lBRjVDLGlCQUVpRDtZQURyQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1lBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtZQUVyQyxZQUFPLEdBQUcsVUFBQyxNQUFXO2dCQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUM5RSxNQUFNLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDM0IsS0FBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUUvRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEMsQ0FBQztnQkFHRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxLQUFJLENBQUMsaUJBQWlCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RixDQUFDO2dCQUdELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7Z0JBQ2pHLENBQUM7Z0JBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDLENBQUM7WUFFSyxhQUFRLEdBQUcsVUFBQyxRQUFhLEVBQUUsT0FBYTtnQkFDM0MsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQixDQUFDLENBQUM7WUFFSyxrQkFBYSxHQUFHLFVBQUMsUUFBYSxFQUFFLE9BQWE7Z0JBQ2hELEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsQ0FBQztRQS9COEMsQ0FBQztRQWlDekMsNkNBQWtCLEdBQTFCLFVBQTJCLFFBQWEsRUFBRSxjQUFvQjtZQUUxRCxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUc7bUJBQzNELENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNyRixRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RSxDQUFDO1lBR0QsRUFBRSxDQUFDLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxHQUFHO21CQUNuRCxDQUFDLGNBQWMsQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxRQUFRLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RSxDQUFDO1FBQ0wsQ0FBQztRQUNMLHVCQUFDO0lBQUQsQ0FuREEsQUFtREMsSUFBQTtJQW5Eb0IsZ0JBQWdCO1FBRHBDLHlDQUFVLEVBQUU7eUNBR3NCLHVDQUFpQixzQkFDbkIsMENBQWUsb0JBQWYsMENBQWU7T0FIM0IsZ0JBQWdCLENBbURwQztzQkFuRG9CLGdCQUFnQiIsImZpbGUiOiJvYXV0aC1pbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XHJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tICdhdXJlbGlhLWRlcGVuZGVuY3ktaW5qZWN0aW9uJztcclxuXHJcbmltcG9ydCB7IE9BdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IE9BdXRoVG9rZW5TZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC10b2tlbi1zZXJ2aWNlJztcclxuXHJcbmNvbnN0IEFVVEhPUklaQVRJT05fSEVBREVSOiBzdHJpbmcgPSAnQXV0aG9yaXphdGlvbic7XHJcblxyXG5AYXV0b2luamVjdCgpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9BdXRoSW50ZXJjZXB0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBvYXV0aFRva2VuU2VydmljZTogT0F1dGhUb2tlblNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBldmVudEFnZ3JlZ2F0b3I6IEV2ZW50QWdncmVnYXRvcikgeyB9XHJcblxyXG4gICAgcHVibGljIHJlcXVlc3QgPSAoY29uZmlnOiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldFRva2VuKCkgJiYgIXRoaXMub2F1dGhUb2tlblNlcnZpY2UuaXNUb2tlblZhbGlkKCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLnRva2VuRXhwaXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdXBwb3J0IGZvciBodHRwLWNsaWVudFxyXG4gICAgICAgIGlmIChjb25maWcuaGVhZGVycy5hZGQgJiYgIWNvbmZpZy5oZWFkZXJzLmdldChBVVRIT1JJWkFUSU9OX0hFQURFUikpIHtcclxuICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuYWRkKEFVVEhPUklaQVRJT05fSEVBREVSLCB0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmdldEF1dGhvcml6YXRpb25IZWFkZXIoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdXBwb3J0IGZvciBmZXRjaC1jbGllbnRcclxuICAgICAgICBpZiAoY29uZmlnLmhlYWRlcnMuYXBwZW5kICYmICFjb25maWcuaGVhZGVycy5nZXQoQVVUSE9SSVpBVElPTl9IRUFERVIpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLmFwcGVuZChBVVRIT1JJWkFUSU9OX0hFQURFUiwgdGhpcy5vYXV0aFRva2VuU2VydmljZS5nZXRBdXRob3JpemF0aW9uSGVhZGVyKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIHJlc3BvbnNlID0gKHJlc3BvbnNlOiBhbnksIHJlcXVlc3Q/OiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKHJlc3BvbnNlLCByZXF1ZXN0KTtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyByZXNwb25zZUVycm9yID0gKHJlc3BvbnNlOiBhbnksIHJlcXVlc3Q/OiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlUmVxdWVzdEVycm9yKHJlc3BvbnNlLCByZXF1ZXN0KTtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVJlcXVlc3RFcnJvcihyZXNwb25zZTogYW55LCByZXF1ZXN0TWVzc2FnZT86IGFueSkge1xyXG4gICAgICAgIC8vIFN1cHBvcnQgZm9yIGh0dHAtY2xpZW50XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1c0NvZGUgJiYgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9PT0gNDAxXHJcbiAgICAgICAgICAgICYmICFyZXNwb25zZS5yZXF1ZXN0TWVzc2FnZS50b2tlbkV4cGlyZWQgJiYgIXRoaXMub2F1dGhUb2tlblNlcnZpY2UuaXNUb2tlblZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmVzcG9uc2UudG9rZW5FeHBpcmVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5ldmVudEFnZ3JlZ2F0b3IucHVibGlzaChPQXV0aFNlcnZpY2UuSU5WQUxJRF9UT0tFTl9FVkVOVCwgcmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VwcG9ydCBmb3IgZmV0Y2gtY2xpZW50XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyAmJiByZXNwb25zZS5zdGF0dXMgPT09IDQwMVxyXG4gICAgICAgICAgICAmJiAhcmVxdWVzdE1lc3NhZ2UudG9rZW5FeHBpcmVkICYmICF0aGlzLm9hdXRoVG9rZW5TZXJ2aWNlLmlzVG9rZW5WYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlLnRva2VuRXhwaXJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRBZ2dyZWdhdG9yLnB1Ymxpc2goT0F1dGhTZXJ2aWNlLklOVkFMSURfVE9LRU5fRVZFTlQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=
