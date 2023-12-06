use emenu;

-- View Menu:
SELECT name, price FROM dish where available = 1;

-- Search by Categories:
SELECT d.name, d.price FROM dish AS d
INNER JOIN category AS c ON d.category_ID = c.ID
WHERE d.available = 1 
AND c.name = "Main Dishes";


-- Search by Origins:
SELECT d.name, d.price FROM dish AS d
INNER JOIN dish_origin AS od ON d.ID = od.dish_ID
INNER JOIN origin AS o ON od.origin_ID = o.ID
WHERE d.available = 1 
AND o.name = "Italian";


-- See Dish details:
SELECT d.name, d.price, c.name AS category, o.name AS origin, i.name AS ingredient FROM dish AS d
INNER JOIN dish_origin AS od ON d.ID = od.dish_ID
INNER JOIN origin AS o ON od.origin_ID = o.ID
INNER JOIN category AS c ON d.category_ID = c.ID
INNER JOIN recipe AS r ON r.dish_ID = d.ID
INNER JOIN ingredient AS i ON i.ID = r.ingredient_ID
WHERE d.available = 1
AND d.name = "Spaghetti";


-- See Ingredient details:
SELECT i.name, i.unit, w.importDate, w.expiredDate, w.quantity FROM ingredient AS i
INNER JOIN warehose AS w ON w.ingredient_ID = i.ID
WHERE i.name = "Beef";


--
	
SELECT
    d.name AS dish_name,
    d.price,
    c.name AS category,
    GROUP_CONCAT( distinct o.name) AS origins,
    GROUP_CONCAT( distinct i.name) AS ingredients
FROM
    dish AS d
INNER JOIN dish_origin AS od ON d.ID = od.dish_ID
INNER JOIN origin AS o ON od.origin_ID = o.ID
INNER JOIN category AS c ON d.category_ID = c.ID
INNER JOIN recipe AS r ON r.dish_ID = d.ID
INNER JOIN ingredient AS i ON i.ID = r.ingredient_ID
WHERE
    d.available = 1
AND d.name = "Spaghetti";

SELECT d.name, d.price, c.name AS category, GROUP_CONCAT( distinct o.name) AS origins, GROUP_CONCAT( distinct i.name) AS ingredients FROM dish AS d INNER JOIN dish_origin AS od ON d.ID = od.dish_ID INNER JOIN origin AS o ON od.origin_ID = o.ID INNER JOIN category AS c ON d.category_ID = c.ID INNER JOIN recipe AS r ON r.dish_ID = d.ID INNER JOIN ingredient AS i ON i.ID = r.ingredient_ID WHERE d.available = 1 AND d.name = 'Spaghetti';







