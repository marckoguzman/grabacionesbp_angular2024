export const COURSES: any = {

  11: {
    id: 11,
    description: 'Grabaciones AWS 2023-2024',
    longDescription: 'Testing grabaciones',
    //iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-material-course-1.jpg',
    iconUrl: 'https://img.freepik.com/free-photo/digital-cloud-data-storage-digital-concept-cloudscape-digital-online-service-global-network-database-backup-computer-infrastructure-technology-solution_90220-1046.jpg?w=900&t=st=1705611630~exp=1705612230~hmac=abfad58f0c2e8841d426609646d7ca192a61a0d43fbee068f44ea623678bfa48',
    category: 'BEGINNER',
    seqNo: 0,
    url: 'angular-material-course',
    price: 50,
    lessonsCount: 11,
  },



};

export const LESSONS = [
  {
    id: 1,
    conversationId: '22222222-73e4-4817-93d0-8ff4074214e3',
    conversationStart: '2024-01-02T16:51:43.159Z',
    path: 'year=2024/month=1/day=2/hour=16/conversation_id=acc32f36-73e4-4817-93d0-8ff4074214e3',
    customerDocumentNumber: '1715592547',
    customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
    queueName: 'ELIMINACION CLAVE DIGITAL KN',
    namefile: 'acc32f36-73e4-4817-93d0-8ff4074214e3_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
    courseId: 11
},
{
    id:2,
    conversationId: '085ff8c8-32ed-471e-9cd0-9f4b1ed2f305',
    conversationStart: '2024-01-02T16:57:26.269Z',
    path: 'year=2024/month=1/day=2/hour=16/conversation_id=085ff8c8-32ed-471e-9cd0-9f4b1ed2f305',
    customerDocumentNumber: '1715592547',
    customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
    queueName: 'ELIMINACION CLAVE DIGITAL KN',
    namefile: '085ff8c8-32ed-471e-9cd0-9f4b1ed2f305_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
    courseId: 11
},
{
  id: 3,
  conversationId: '33333333-73e4-4817-93d0-8ff4074214e3',
  conversationStart: '2024-01-02T16:51:43.159Z',
  path: 'year=2024/month=1/day=2/hour=16/conversation_id=acc32f36-73e4-4817-93d0-8ff4074214e3',
  customerDocumentNumber: '1715592547',
  customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
  queueName: 'ELIMINACION CLAVE DIGITAL KN',
  namefile: 'acc32f36-73e4-4817-93d0-8ff4074214e3_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
  courseId: 11
},
{
  id:4,
  conversationId: '44444444-32ed-471e-9cd0-9f4b1ed2f305',
  conversationStart: '2024-01-02T16:57:26.269Z',
  path: 'year=2024/month=1/day=2/hour=16/conversation_id=085ff8c8-32ed-471e-9cd0-9f4b1ed2f305',
  customerDocumentNumber: '1715592547',
  customerFullName: 'DIANA CRISTINA HIDALGO LAVAYEN',
  queueName: 'ELIMINACION CLAVE DIGITAL KN',
  namefile: '085ff8c8-32ed-471e-9cd0-9f4b1ed2f305_AGUILAR MOLINA JAIME RENAN_ELIMINACION CLAVE DIGITAL KN_20240102_16',
  courseId: 11
}


];


export const USERS = {
  1: {
    id: 1,
    email: 'test@angular-university.io',
    password: 'test',
    pictureUrl: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
   
  }

};


export function findCourseById(conversationId: string) {
  return COURSES[conversationId];
}

export function findLessonsForCourse(conversationId: string) {
  return Object.values(LESSONS).filter(lesson => lesson.conversationId == conversationId);
}

export function authenticate(email: string, password: string) {

  const user: any = Object.values(USERS).find(user => user.email === email);

  if (user && user.password == password) {
    return user;
  } else {
    return undefined;
  }

}
