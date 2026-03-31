import { Count } from "./Count";
import { Entry } from "./Entry";

export interface User {
    userId: number;
    strFirstName: string;
    strLastName: string;
    strUsername: string;
    strPassword: string;
    objFinalCount: Count;
}