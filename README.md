# Cabinet Médical Dr. Fathi Sana — Site Web Officiel

Application web bilingue (Français / Arabe RTL) dédiée au **Cabinet Médical Dr. Fathi Sana** à Rabat (Médecine Esthétique, Anti-Âge & Lasers Médicaux).

## Fonctionnalités Principales

- **Identité Visuelle Authentique** : Logo officiel transparent, photographies réelles du cabinet, des soins et du Dr. Fathi Sana.
- **Statut Ouvert / Fermé en Temps Réel** : Synchronisé sur le fuseau horaire `Africa/Casablanca` avec indicateur dynamique et prochain créneau d'ouverture/fermeture.
- **Prise de Rendez-vous & WhatsApp** : Créneaux fixes de **30 minutes** synchronisés avec les horaires du cabinet (Lun–Ven 10:00–18:30, Sam 10:00–13:30) et génération automatique du message WhatsApp bilingue.
- **Bilingue FR / AR (RTL)** : Bascule instantanée entre le français (`dir="ltr"`) et l'arabe (`dir="rtl"`).

## Installation & Démarrage

```bash
# 1. Installer les dépendances
npm install

# 2. Lancer le serveur de développement
npm run dev

# 3. Prévisualiser sur mobile sur le réseau local
npm run dev -- --host

# 4. Générer le build de production
npm run build
```
