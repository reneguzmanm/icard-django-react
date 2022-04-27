from rest_framework.routers import DefaultRouter
from tables.api.views import TablaApiViewSet

router_table = DefaultRouter();

router_table.register(
    prefix='tables', basename='tables', viewset=TablaApiViewSet
)