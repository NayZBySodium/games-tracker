echo "===================== | Récupération de l'image nayzbysodium/games-tracker sur le DOCKER HUB | ====================="
docker pull nayzbysodium/games-tracker:latest
echo "======================================= | Arrêt des services existent | ======================================="
docker-compose down
echo "======================================= | Démarrage des services | ======================================="
docker-compose up -d
