import type { MoneySpendDetailDto } from "@/Models/Dtos/MoneySpendDetail";

export class CreateMoneySpendRequest {
    BudgetId?: string = "";
    Amount?: number = 0;
    MoneyHolderId?: string;
    Reason?: string;
    Description?: string;
    
    Details?:MoneySpendDetailDto[];
}