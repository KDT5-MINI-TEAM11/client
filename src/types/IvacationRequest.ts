export interface IvacationRequest {
  id: string;
  userName: string;
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4';
  type: 'VACATION' | 'DUTY';
  start_date: string;
  end_date: string;
  state: 'PENDING' | 'RESOLVE' | 'REJECT';
}
