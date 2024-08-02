import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Redirect,
  Res,
} from '@nestjs/common';
import { CreateCatDto } from './dto/CreateCatDto';
import { ListAllEntities } from './dto/ListAllEntities';
import { UpdateCatDto } from './dto/UpdateCatDto';

@Controller('cats')
export class CatsController {
  // the response status code is always 200 by default, except for POST requests which are 201.
  // We can easily change this behavior by adding the @HttpCode(...) decorator at a handler level.
  // @HttpCode(204)
  @Header('Cache-Control', 'none') // response header
  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response): Promise<string> {
    //res.status(HttpStatus.CREATED).send();
    return `This action adds a new cat with the name: ${createCatDto.name}`;
  }

  @Get('breed')
  @Redirect('https://nestjs.com', 301)
  breed() {
    //Returned values will override any arguments passed to the @Redirect() decorator.
    return 'This action returns breeding cats';
  }

  @Get()
  findAll(@Res() res: Response) {
    // res.status(HttpStatus.OK).json([]);
    return 'This action returns all cats';
  }

  @Get('query')
  findAllByQuery(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  /**
   * The 'ab*cd' route path will match abcd, ab_cd, abecd, and so on.
   * The characters ?, +, *, and () may be used in a route path, and are subsets of their regular expression counterparts.
   * The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
   *
   * A wildcard in the middle of the route is only supported by express.
   */
  @Get('ab*cd')
  findWithWildcards() {
    return 'This route uses a wildcard';
  }

  //async
  @Get('async')
  async findAllAsync(@Res({ passthrough: true }) res: Response) {
    // res.status(HttpStatus.OK);
    return ['This function is async'];
  }

  // Route parameters cats/1
  @Get(':id')
  @Bind(Param())
  findOne(params) {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  // Route parameters cats/5
  @Get(':id')
  @Bind(Param('id'))
  findOneByParamName(id) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
