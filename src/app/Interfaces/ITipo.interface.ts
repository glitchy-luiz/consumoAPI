export interface ITipo {
    nome: string
    sprite: string
    vantagens: string[]
    fraquezas: string[]
    resistencias: string[]
    fraquezasOfencivas: string[]
    imunidades: string[]
}

export interface IRelations {
    fraquezas: Relation[]
    vantagens: Relation[]
    resistencias: Relation[]
    fraquezasOfencivas: Relation[]
    imunidades: Relation[]
}

export type Relation = {
    nome: string
    sprite: string
}