import type { MoneyDetailDto } from "@/Models/Dtos/MoneyDetailDto";

export class AmountAndDetailDto {
    Amount?: number = 0;
    Details?: MoneyDetailDto[];
}