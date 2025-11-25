export interface SubmittedUserData {
  name: string;
  email: string;
  contact: string;
  address: string;
  photo: {
    name: string;
    size: number;
    type: string;
  };
  cv: {
    name: string;
    size: number;
    type: string;
  };
  submittedAt: string;
}
