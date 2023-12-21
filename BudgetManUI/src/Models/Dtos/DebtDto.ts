export class DebtDto {
    name: string | undefined;
    totalAmount: number | undefined;
    remainAmount: number | undefined;
    paidAmount: number | undefined;
    totalInterest: number | undefined;
    interestRate: number;
    ratePeriod: number | undefined;
    constructor() {
      this.interestRate = 0;
    }
  }
  