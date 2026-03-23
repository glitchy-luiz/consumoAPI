import { IDetalhesVM } from "./IDetalhesVM.interface";
import { IRelations } from "./ITipo.interface";

export interface ITeam {
    id: string
    nome: string
    membros: TeamMember[]
    cobertura: IRelations[]
    status: string
}

export type TeamMember= {
    pokemon: IDetalhesVM
    tipoRelation: IRelations[]
}