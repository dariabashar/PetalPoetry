import django_filters
from .models import Product

class ProductFilter(django_filters.FilterSet):
    size = django_filters.CharFilter(field_name='size', lookup_expr='in')
    price_lte = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    category = django_filters.BaseInFilter(field_name='category', lookup_expr='in')

    class Meta:
        model = Product
        fields = ['category', 'size', 'price']
