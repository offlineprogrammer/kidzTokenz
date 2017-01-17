import { Task } from './task';

export class Child {
    childId: string;
    childimage: string;
    name: string;
    tokenType: string;
    negativetokenType: string;
    tokenNumbers: number;
    srcTokenNumbers: string;    
    isActive: boolean;
    tasks: Task[];
   
}