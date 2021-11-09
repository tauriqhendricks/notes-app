/**
 * Data passed when a user either logs in or signs up
 */
export class AuthData {
   // server asign, used when getting a user to save it with their notes
   id?: string
   email: string;
   password: string;
}
