import { classes } from "@automapper/classes";
import { createMap, createMapper } from "@automapper/core";;
import { SignupDto,User } from "src/auth";
import { Category, CategoryAddDto } from "src/category";




export const mapper = createMapper({
    strategyInitializer: classes(),
});


createMap(mapper,SignupDto,User);
createMap(mapper,CategoryAddDto,Category);