from distutils.command.upload import upload
from email.mime import image
from pyexpat import model
from turtle import title
from django.db import models

# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='categories')

    def __str__(self):
        return(self.title)
