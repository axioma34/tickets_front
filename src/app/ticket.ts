export class Ticket {
  constructor(
    public validationCode: number | null,
    public eventId: number
  ) {
  }
}
