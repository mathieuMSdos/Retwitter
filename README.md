//Pour start le projet : 
pnpm install

//Base de donnée postgresql :
- Donc créé une BD en ligne : neon.tech : mettre http://localhost:3000/ partout
- Récupérer l'url de connexion à votre base de donnée
- insérer cet url dans le fichier .env.local du projet 

// créer une clé openSSL
- lancer dan sl terminal :openssl rand -base64 32
- copié la clé ssl dans le .env

//Push la base de donnée :
- pnpm prisma db push


//Créer une app sur google cloud :
- Créer un projet sur google cloud
- Créer une app sur google cloud
- Activé l'API Google+
- Configuré les URI autorisés
- Ajouté http://localhost:3000/api/auth/callback/google aux URI de redirection
- Récupérer l'id client et le secret client
- insérer ces id et secret dans le fichier .env.local du projet 

//Lancer le projet :
pnpm dev

//lancer prisma studio:
pnpm prisma studio

//Vérifier que le système d'auth google fonctionne !