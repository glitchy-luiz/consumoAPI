import { IRelations, ITipo } from "../Interfaces/ITipo.interface"

export default class MockTipo {
    static giveEmptyTipo():ITipo {
        const mockTipo: ITipo = {
            nome: '',
            sprite: '',
            vantagens: [],
            fraquezas: [],
            resistencias: [],
            fraquezasOfencivas: [],
            imunidades: [],
        }
        return mockTipo
    }

    static giveEmptyRelations():IRelations {
        const mockRelation: IRelations = {
            fraquezas: [],
            vantagens: [],
            resistencias: [],
            fraquezasOfencivas: [],
            imunidades: []
        }
        return mockRelation
    }
}