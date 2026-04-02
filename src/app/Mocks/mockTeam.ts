import { ITeam } from "../Interfaces/ITeam.interface";

export default class MockTeam {
    static giveEmptyTeam():ITeam {
        const mockTeam: ITeam = {
            id: '',
            nome: '',
            membros: [],
            cobertura: [],
            status: '',
        }
        return mockTeam
    }
}