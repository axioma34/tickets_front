export class Event {
  constructor(
    public id: number,
    public name: string,
    public location: string,
    public date: string,
    public photo: string,
    public ticketsCount: number,
    public validateTickets: number
  ) {
  }
}
