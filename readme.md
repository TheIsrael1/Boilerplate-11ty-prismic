# BoilerPoint (vite + 11ty + pug + prismic)

---

## Folder Structure

```
src/
  app/
------/animations/
------/classes/
------/components/
------/images/
------/pages/
------/utils/

  index.js

  fonts/
  styles/
  views/
        -_data/
        -_includes/
```


- **_data** : Contient les données de l'application
- **_includes** : Contient les fichiers html qui seront inclus dans les pages
- Tous les fichiers à la racines de views sont considérés comme des (routes) pages


---
# Prismic

.env
```env
PRISMIC_REPOSITORY=
PRISMIC_ACCESS_TOKEN
```
<br></br>
- Exemple de récupération de données de prismic
- fichier : views/_data/prismic.cjs
```javascript
async function fetchAbout() {
  return await client.getSingle('about');
}
fetchAbout().then((document) => {
  console.log(document);
})
```
# BoilerPlate-11ty-pug-prismic
