# Generated by Django 3.2.12 on 2022-05-19 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.RemoveField(
            model_name='movie',
            name='genre_ids',
        ),
        migrations.AddField(
            model_name='movie',
            name='genre_ids',
            field=models.ManyToManyField(to='movies.Genre'),
        ),
    ]
