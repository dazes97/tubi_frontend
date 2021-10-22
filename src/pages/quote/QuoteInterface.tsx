export interface QuoteInterface {
  id?: string;
  bikeBrand: string;
  bikeModel: string;
  bikeWheelSize: string;
  bikeColor: string;
  bikeObservation: string;
  clientName: string;
  clientLastName: string;
  clientPhone: string;
  clientLat?: string;
  clientLng?: string;
  requestDeliveryDateTime: Date;
  requestTotal?: number;
  requestCode?: string;
}
export default QuoteInterface;
