import { PartialType } from "@nestjs/mapped-types";
import { CreateAppliDto } from "./create-appli.dto";

export class UpdateAppliDto extends PartialType(CreateAppliDto) {
  
}