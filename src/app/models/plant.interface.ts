import { Plant } from "../models/plant";

export interface InterfacePlant { // On définit l'interface InterfacePlant
    status: string,
    data: Plant[]
}