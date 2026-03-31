import { Read } from "./Read";
import { User } from "./User";
import { Walk } from "./Walk";

export interface Entry {
    entryId: number;
    dtEntryDate: Date;
    liReads: Read[];
    liWalks: Walk[];
    objUser: User;
}