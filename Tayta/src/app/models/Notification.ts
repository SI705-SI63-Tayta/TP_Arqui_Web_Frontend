import { Recipe } from "./Recipe";
import { User } from "./User";


export class Notification{
    idNotification: number=0;
    message: string="";
    user: User = new User();
    recipe: Recipe = new Recipe();

}
