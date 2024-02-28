export interface Grabs {
    message:{
        id: string,
        conversationId:string;
        conversationStart:string;
        path: string;
        customerDocumentNumber: string;
        customerFullName: string;
        queueName:string;
        namefile:string;
    
    }
}



export type DisplayGrabs = Omit<Grabs, 'message'> & {
    id:string;
    conversationId:string;
    conversationStart:string;
    path: string;
    customerDocumentNumber: string;
    customerFullName: string;
    queueName:string;
    namefile:string;
  };

  
/*
"conversationId": "acc32f36-73e4-4817-93d0-8ff4074214e3",
"conversationStart": "2024-01-02T16:51:43.159Z",
"path": "year=2024/month=1/day=2/hour=16/conversation_id=acc32f36-73e4-4817-93d0-8ff4074214e3",
"customerDocumentNumber": "1715592547",
"customerFullName": "DIANA CRISTINA HIDALGO LAVAYEN",
"queueName": "ELIMINACION CLAVE DIGITAL KN",
"namefile": "acc32f36-73e4-4817-93d0-8ff4074214e3_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16"
*/