const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

let ajd = new Date()
let options = {weekday: 'long'}
let jourActuel = ajd.toLocaleDateString("fr-FR", options)

//console.log(jourActuel, ajd)

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1)

let tabJoursOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)))
//console.log(tabJoursOrdre)

export default tabJoursOrdre