export function calcEtudes(ageEnfant: number, budget: number, apport: number) {
  const annees = Math.max(1, 18 - ageEnfant)
  const restant = Math.max(0, budget - apport)
  const mensuel = restant / annees / 12
  return {
    annees,
    restant: Math.round(restant),
    mensuel: Math.round(mensuel),
  }
}

export function calcRetraite(age: number, ageDepart: number, revenus: number) {
  const revenusRetraite = Math.round(revenus / 2)
  const gap = revenus - revenusRetraite
  const duree = Math.max(1, ageDepart - age)
  const capitalCible = gap * 12 * 25
  const mensuel = Math.round(capitalCible / (duree * 12))
  return { revenusRetraite, gap, duree, capitalCible, mensuel }
}

export function calcDependance(age: number) {
  const coutMin = 12000
  const coutMax = 42000
  const coutMoyen = Math.round((coutMin + coutMax) / 2)
  const anneesAvant80 = Math.max(0, 80 - age)
  const urgence = age >= 55 ? 'haute' : age >= 45 ? 'moyenne' : 'normale'
  return { coutMin, coutMax, coutMoyen, anneesAvant80, urgence }
}

export function calcSuccession(patrimoine: number, nbEnfants: number) {
  const abattementParEnfant = 100000
  const abattementTotal = nbEnfants > 0 ? nbEnfants * abattementParEnfant : 100000
  const baseImposable = Math.max(0, patrimoine - abattementTotal)
  const droitsEstimes = Math.round(baseImposable * 0.2)
  return { abattementTotal, baseImposable, droitsEstimes }
}

export function calcImpots(revenus: number, tmi: number) {
  const revenuAnnuel = revenus * 12
  const baseImposable = revenuAnnuel * 0.9
  const irppEstime = Math.round(baseImposable * (tmi / 100) * 0.75)
  const plafondNiches = 10000
  const economiePer = Math.min(Math.round(revenuAnnuel * 0.1 * (tmi / 100)), plafondNiches)
  return { irppEstime, plafondNiches, economiePer }
}

export function formatEuro(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

export function formatNum(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n)
}
