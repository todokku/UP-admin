from rest_framework import permissions
from rest_framework import viewsets
from .serializers import ClientSerializer
from admin.models import Client


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = ClientSerializer