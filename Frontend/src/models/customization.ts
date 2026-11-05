// Egy választható téma a téma váltóban (key = a <html data-theme="..."> értéke)
export interface ThemeOption {
  key: string
  label: string
  description: string
  premium: boolean
  images: string[]
}

// A saját téma színei, ezek a :root CSS változóit írják felül
export interface CustomColors {
  bg: string
  moduls: string
  text: string
  accent: string
}
