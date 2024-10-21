export class Recipe {
    idRecipe: number = 0
    description: string = ""
    startDate:Date=new Date(Date.now())
    endDate:Date=new Date(Date.now())
    state: string = ""
}