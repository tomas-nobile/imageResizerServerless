export default class ErrorCustom {
    public message: string;
    public status: string;
    public statusDescription:string;
  

    constructor(message: string, status: string,statusDescription?:string) {
      this.message = message;
      this.status = status;
      if (statusDescription) this.statusDescription= statusDescription
    }
  
    public logError() {
      console.error(`Error ${this.status}: ${this.message}`);
    }
    public getMessage():string{
      return this.message
    }
  }