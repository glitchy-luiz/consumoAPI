import { ICard } from "../Interfaces/ICard.interface"

export default class MockCard {
    static giveEmptyCard(): ICard {
        const card: ICard = {
            nome: '',
            tipo1: '',
            tipo2: '',
            sprite: '',
            id: ''
        }
        return card
    }
}