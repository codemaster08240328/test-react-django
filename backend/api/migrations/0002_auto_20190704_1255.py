# Generated by Django 2.2.3 on 2019-07-04 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='company',
            options={'ordering': ('name',)},
        ),
        migrations.AddField(
            model_name='office',
            name='headquarter',
            field=models.BooleanField(default=False, verbose_name='Is headquarter'),
        ),
    ]
