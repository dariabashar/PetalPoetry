from django.db import models
from django.contrib.auth.models import AbstractUser

# Product — название, описание, цена, изображение, категория
# Category — для фильтрации
# CartItem — продукт, количество, корзина
# User  — используем AbstractUser
# Cart — пользователь, список товаров

class Category(models.Model):
    CATEGORY_CHOICES = [
        ('F', 'Flowers'),
        ('B', 'Bouquets'),
        ('T', 'Toys'),
    ]

    name = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='B')

    def __str__(self):
        return dict(self.CATEGORY_CHOICES).get(self.name, self.name)

    
class Product(models.Model):
    SIZE_CHOICES = [
        ('XL', 'Extra Large'),
        ('L', 'Large'),
        ('M', 'Medium'),
        ('S', 'Small'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='media/products/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, default='M')

    def __str__(self):
        return self.name
    
class CartItem(models.Model):
    cart = models.ForeignKey('Cart',on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}" 

class User(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=False, null=False)
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.first_name


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
       return f"Cart for {self.user.username}"