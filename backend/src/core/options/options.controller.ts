import { Controller, Get, Param } from "@nestjs/common";
import { OptionService } from "./options.service";

@Controller("options")
export class OptionsController {
  constructor(private readonly service: OptionService) { }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get(":name")
  async findOne(@Param("name") name: string) {
    return this.service.findOne(name);
  }
}
