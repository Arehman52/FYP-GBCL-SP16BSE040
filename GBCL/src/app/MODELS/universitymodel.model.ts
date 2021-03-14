export interface UniversityModel {
  Id: String;
  UniTitle: String;
  AccessStatuses: {allowed: 'Allowed', pending: 'Pending', paused: 'Paused', deleted: 'Deleted'};
  AccessStatus: String;
  HECID: String;
  FacultyCount: number;
  LabsCount: number;
  StudentsCount: number;

}
