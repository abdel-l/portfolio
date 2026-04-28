#!/bin/bash

echo "📥 Pull du dépôt Git..."
git pull origin main

echo "🚚 Déploiement..."
sudo rm -rf /var/www/roudard.fr/*
sudo cp -r ./* /var/www/roudard.fr/

echo "🧹 Nettoyage..."
sudo rm -rf /var/www/roudard.fr/.git
sudo rm -rf /var/www/roudard.fr/node_modules
sudo rm -f /var/www/roudard.fr/deploy*.sh
sudo rm -f /var/www/roudard.fr/README.md

echo "🔧 Permissions..."
sudo chown -R www-data:www-data /var/www/roudard.fr/
sudo chmod -R 755 /var/www/roudard.fr/

echo "🔄 Restart Nginx..."
sudo systemctl restart nginx

echo "✅ Déploiement terminé !"