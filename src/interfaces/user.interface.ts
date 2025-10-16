export interface UserProfile {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  mobile: string;
  mobile_verify: boolean;
  email: string;
  birth_date: Date;
  role: 'admin' | 'trainer' | 'client';
  score: number;
}
