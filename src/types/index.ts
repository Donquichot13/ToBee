export type Situation = 'celibataire' | 'marie' | 'divorce' | 'veuf' | 'pacse'
export type Profession = 'salarie' | 'independant' | 'fonctionnaire' | 'retraite' | 'autre'
export type Pilier = 'etudes' | 'retraite' | 'projet' | 'dependance' | 'succession' | 'impots'

export interface Enfant {
  id: string
  age: number
  budgetEtudes: number
  apportDisponible: number
}

export interface Patrimoine {
  epargne: number
  immobilier: number
  valeursMob: number
  retraite: number
}

export interface UserProfile {
  age: number
  situation: Situation
  enfants: Enfant[]
  revenus: number
  profession: Profession
  patrimoine: Patrimoine
  objectifs: Pilier[]
  ageDepart: number
  tmi: number
}

export interface CalcResult {
  label: string
  value: number
  unit: string
}

export type SolutionId = 'immobilier' | 'scpi' | 'assurance-vie' | 'per' | 'pea' | 'gav' | 'prevoyance'

export interface Solution {
  id: SolutionId
  nom: string
  icone: string
  description: string
  avantages: string[]
  piliers: Pilier[]
  priorite: Pilier[]
}
