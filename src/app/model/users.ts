export class Users{

    conversationId:string;
    conversationStart:string;
    path:string;
    customerDocumentNumber:string;
    customerFullName:string;
    queueName:string;
    namefile:string;
    courseId:number;

    constructor(conversationId, conversationStart, path,customerDocumentNumber,customerFullName,queueName,namefile,courseId){

        this.conversationId=conversationId;
        this.conversationStart=conversationStart;
        this.path= path;
        this.customerDocumentNumber=customerDocumentNumber;
        this.customerFullName=customerFullName;
        this.queueName=queueName;
        this.namefile=namefile;
        this.courseId=courseId;

    }

}