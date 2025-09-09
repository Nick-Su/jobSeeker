export interface IShift {
  id: string;
  logo: string;
  coordinates: ICoordinates,
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: string;
  planWorkers: number,
  workTypes: IWorkTypes[],
  priceWorker: number;
  bonusPriceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number | null;
  isPromotionEnabled: boolean;
}

interface IWorkTypes {
  id: number,
  name: string;
  nameGt5: string;
  nameLt5: string;
  nameOne: string;
}

export interface ICoordinates {
  longitude: number;
  latitude: number;
}
