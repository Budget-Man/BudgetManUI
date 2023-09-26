
class TableColumn {
    key: string="";
    label: string="";
    width: number =0;
    sortable:boolean=true;
    enableEdit:boolean=true;
    required: boolean = false;
    constructor(key:string,label:string,width:number,sorable:boolean,enbleEdit:boolean,required:boolean){
        this.key=key;
        this.label=label;
        this.width=width;
        this.sortable=sorable;
        this.enableEdit=this.enableEdit;
        this.required=required;
    }
}
