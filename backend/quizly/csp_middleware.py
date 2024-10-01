# csp_middleware.py

from django.utils.deprecation import MiddlewareMixin

class ContentSecurityPolicyMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        response['Content-Security-Policy'] = "script-src 'self'; report-uri /csp-violation-report-endpoint/"
        return response
