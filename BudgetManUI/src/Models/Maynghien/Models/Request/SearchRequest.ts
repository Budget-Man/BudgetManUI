// @ts-ignore
import Filter from "./SearchModels/Filter.ts";
// @ts-ignore
import SortByInfo from "./SearchModels/SortByInfo.js";


export class SearchRequest {
    
    PageIndex: number | undefined;
    PageSize:number |undefined;
    filters:Filter[]|undefined;
    SortByInfo:SortByInfo|undefined;
}