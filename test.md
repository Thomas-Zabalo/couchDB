// la liste des livres 
// let biblio = [
//     {
//         numero: 10,
//         titre: "le rouge et le noir",
//         pages: ["La petite ville de Verrières peut passer pour l’une des plus jolies",
//             "Ses maisons blanches s’étendent sur la pente d’une colline"]
//     },
//     {
//         numero: 11,
//         titre: "candide ou l'optimisme",
//         pages: ["Comment Candide fut élevé dans un château, et comment il fut chassé d’icelui.",
//             "Ce que devint Candide parmi les Bulgares"]
//     }
// ];
// const dbName = "livres"
// async function createDB() {
//     try {
//         const dbList = await nano.db.list();
//         if (!dbList.includes(dbName)) {
//             await nano.db.create(dbName);
//             console.log(`Base de données '${dbName}' créée.`);
//         } else {
//             console.log(`La base '${dbName}' existe déjà.`);
//         }
//     } catch (error) {
//         console.error("Error lors de l'ajout de la BD")
//     }

// }

// async function insertBooks() {
//     const livre = nano.use('livres');

//     let books = [
//         {
//             numero: 10,
//             titre: "le rouge et le noir",
//             pages: ["La petite ville de Verrières peut passer pour l’une des plus jolies",
//                 "Ses maisons blanches s’étendent sur la pente d’une colline"]
//         },
//         {
//             numero: 11,
//             titre: "candide ou l'optimisme",
//             pages: ["Comment Candide fut élevé dans un château, et comment il fut chassé d’icelui.",
//                 "Ce que devint Candide parmi les Bulgares"]
//         }
//     ];

//     try {
//         for (const book of books) {
//             await livre.insert(book);
//         }
//         console.log("Livres insérés avec succès !");
//     } catch (error) {
//         console.error("Erreur lors de l'insertion des livres :", error);
//     }
// }

// createDB()
// insertBooks()

// app.get('/', (req, res) => {
//     res.json({ message: 'API de gestion des livres' })
// })

// app.get('/livres', (req, res) => {
//     res.json(biblio)
// })

// app.get('/livres/:id', (req, res) => {
//     const livre = biblio.find(l => l.numero === parseInt(req.params.id))
//     if (livre) {
//         res.json(livre)
//     }
//     else {
//         res.status(404).json({ message: "Aucun livre trouvé" })
//     }
// });

// app.get('/livres/:id/pages', (req, res) => {
//     const livre = biblio.find(l => l.numero === parseInt(req.params.id))
//     if (livre) {
//         res.json(livre.pages)
//     }
//     else {
//         res.status(404).json({ message: "Aucune pages" })
//     }
// })

// app.get('/livres/:id/pages/:page', (req, res) => {
//     const livre = biblio.find(l => l.numero === parseInt(req.params.id))
//     if (livre) {
//         const page = livre.pages[parseInt(req.params.page) - 1];
//         if (page) {
//             res.json(page);
//         } else {
//             res.status(404).json({ message: 'Page non trouvée' });
//         }
//     } else {
//         res.status(404).json({ message: 'Livre non trouvé' });
//     }
// })

// app.post('/livres', (req, res) => {
//     const livre = req.body // Prend les données contenue dans le body de la req
//     console.log(livre)
//     // Vérifie s'il un des champs n'est pas vide
//     if (!livre.numero || !livre.titre || !livre.pages) {
//         res.status().json({ message: "Format invalide" })
//     } else {
//         // Ajoute le livre
//         biblio.push(livre)
//         res.status(201).json({
//             message: "ajout d'un livre",
//             livre
//         })
//     }
// })

// app.delete('/livres/:id', (req, res) => {
//     const idlivre = parseInt(req.params.id)
//     const livre = biblio.find(l => l.numero === idlivre)
//     console.log(livre)
//     if (livre) {
//         biblio.splice(livre, 1)
//         res.status(200).json({ message: `suppression du livre ${req.params.id}` })
//     } else {
//         res.status(404).json({ message: "Suppression impossible" })
//     }
// })

// app.put('/livres', (req, res) => {
//     const idlivre = parseInt(req.params.id)
//     const livre = biblio.find(l => l.numero === idlivre)
//     console.log(livre)
//     if (req.body.titre) {
//         livre.titre = req.body.titre
//         res.status(200).json({ message: "modification du titre" })
//     }
//     if (req.body.pages) {
//         livre.pages = req.body.pages
//         res.status(200).json({ message: "modification des pages" })
//     }
// })