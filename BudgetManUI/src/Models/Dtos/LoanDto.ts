export class LoanDto {
  name: string | undefined;
  totalAmount: number | undefined;
  remainAmount: number | undefined;
  loanAmount: number | undefined;
  totalInterest: number | undefined;
  interestRate: number;
  ratePeriod: number | undefined;
  constructor() {
    this.interestRate = 0;
  }
}
