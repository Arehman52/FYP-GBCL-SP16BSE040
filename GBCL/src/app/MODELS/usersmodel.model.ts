export interface Usersmodel {
  _id: string;
  // attribs of UserType = Student/Teacher
  FirstNameOfUser: string;
  LastNameOfUser: string;
  UniversityNameOfUser: string;
  RegistrationNumberOfUser: string;
  // attribs of UserType = University
  TitleOfUniversity: string;
  HECIDofUniversity: string;
  // common attribs
  UserType: string;
  UserzAccessStatus: string;
  Username: string;
  Password: string;




}

