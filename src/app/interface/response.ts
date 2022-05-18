import { IPatient } from "./patient";
export interface IResponse {
    statut: string;
    errorCode: string;
    errorDescription: string;
    data: any
}
