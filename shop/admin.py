from django.contrib import admin
from .models import Category, CartItem, Cart, User, Product

admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Category)
admin.site.register(User)
admin.site.register(Product)
