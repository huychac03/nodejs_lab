-- CREATE database eMenu;

USE eMenu;

CREATE TABLE  Category (
	ID	int AUTO_INCREMENT,
	name	nvarchar(50),
	primary key(ID)
);
    
CREATE TABLE Dish (
	ID	int AUTO_INCREMENT,
	category_ID	int,
	name	nvarchar(50),
	available	boolean,
	price	double CHECK (price > 1),
	primary key(ID),
	foreign key(category_ID) references Category (ID) 
		on delete set null
);
	
CREATE TABLE Origin (
	ID	int AUTO_INCREMENT,
	name	nvarchar(50),
	primary key(ID)
);
    
CREATE TABLE Dish_Origin (
	dish_ID	int AUTO_INCREMENT,
	origin_ID int,
	primary key(dish_ID, origin_ID),
	foreign key(dish_ID) references Dish (ID)
		on delete cascade,
	foreign key(origin_ID) references Origin (ID)
		on delete cascade
);
    
CREATE TABLE Ingredient (
	ID	INT AUTO_INCREMENT,
	name	nvarchar(50),
	unit	varchar(30),
	primary key (ID)
);

CREATE TABLE Warehose (
	ID	INT AUTO_INCREMENT,
	ingredient_ID	INT,
	importDate	timestamp,
	expiredDate	timestamp,
	quantity DECIMAL(9,3),
	foreign key (ingredient_ID) references Ingredient(ID),
	primary key(ID),
	CHECK (expiredDate > importDate)
);

CREATE TABLE Recipe (
    ID INT AUTO_INCREMENT,
    dish_ID INT,
    ingredient_ID INT,
    primary key(ID),
    FOREIGN KEY (dish_ID) REFERENCES Dish(ID)
		on delete cascade,
    FOREIGN KEY (ingredient_ID) REFERENCES Ingredient(ID)
		on delete cascade,
    UNIQUE (dish_ID, ingredient_ID)
);

