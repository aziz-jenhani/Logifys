import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException{
    constructor (){
        super("User Not Fount",HttpStatus.NOT_FOUND)
    }
}