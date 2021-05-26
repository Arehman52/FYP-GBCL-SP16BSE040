export interface LabMembersmodel {
  _id: string;
  LabJoinCode: string, //     foreign key
  MemberUsername: string, //     foreign key
  LabTitle: string,
  LabMemberFN: string,
  LabMemberLN: string,
  MemberType: string,
  MemberzLabAccessStatus: string, //Pending or Allowed or Rejected
}

