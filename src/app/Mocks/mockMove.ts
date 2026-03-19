import { IMove } from "../Interfaces/IMove.interface"

export default class MockMove {
    static giveEmptyMove(): IMove {
        const move: IMove = {
            nome: '',
            tipo:'',
            classe: '',
            descricao: '',
            poder: 0,
            acuracia: 0,
            pp: 0,
            prioridade: 0,
            chanceEfeito: 0,
        }
        return move
    }
}