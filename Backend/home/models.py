from django.db import models

# Create your models here.
class Transaction(models.Model):

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')

    )


    transaction_id = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places= 2)
    transaction_date = models.DateField()
    status = models.CharField(max_length=10, choices= STATUS_CHOICES, default= "pending")


    def save(self, *args, **kwargs):
        if not self.transaction_id:
            self.transaction_id = f"TXNID{str(Transaction.objects.count() +1).zfill(4)}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.transaction_id

