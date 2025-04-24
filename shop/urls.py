from django.urls import path
from . import views

from .views import (
    ProductListView, ProductDetailView, add_to_cart,
    CategoryListView, ProductsPoCategoryView,
    CartView, remove_from_cart, register,
)
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('products/<int:pk>/', ProductDetailView.as_view()),
    path('products/add-to-cart/', add_to_cart),
    path('categories/', CategoryListView.as_view()),
    path('products/by-category/', ProductsPoCategoryView.as_view()),
    path('cart/', CartView.as_view()),
    path('cart/item/<int:item_id>/delete/', remove_from_cart),
    path('auth/register/', register),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
