# Generated by Django 2.2.3 on 2019-07-04 12:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20190704_1255'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='office',
            unique_together={('company', 'headquarter')},
        ),
    ]
