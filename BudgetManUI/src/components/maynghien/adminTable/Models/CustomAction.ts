// @strict: false
export class CustomAction {
    ActionName: string = "";
    IsRowAction?: boolean = false;
    ApiAction?: string;
    DataType?: CustomActionDataType = CustomActionDataType.RowId;

}

export class CustomActionResponse {
    Action: CustomAction;
    Data: any;
    constructor(action: CustomAction, data: any) {
        this.Action = action;
        this.Data = data;
    }
}

export enum CustomActionDataType {
    MultiRowId, FullRow, RowId
}
