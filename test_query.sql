use emenu;
update category set name = 'Main Dishes' where ID =2;


select * from dish;

select * from recipe;

select * from dish
inner join recipe on dish.ID = recipe.dish_ID
inner join ingredient on ingredient.ID = recipe.ingredient_ID;

select * from category;

select category.name as category, origin.name as origin, dish.name, dish.price, ingredient.name as ingredients from dish
inner join recipe on dish.ID = recipe.dish_ID
inner join ingredient on ingredient.ID = recipe.ingredient_ID
inner join category on category.ID = dish.category_ID
inner join dish_origin on dish_origin.dish_ID = dish.ID
inner join origin on dish_origin.origin_ID = origin.ID
where dish.name = 'Spaghetti';


select origin.name, dish.name from dish
inner join dish_origin on dish_origin.dish_ID = dish.ID
inner join origin on dish_origin.origin_ID = origin.ID
where dish.name = 'Spaghetti';