use ordermng;
create table person(
	person_id int not null auto_increment,
    first_name varchar(255),
    last_name varchar(255),
    address varchar(255),
    email varchar (255) unique,
    pwd varchar(255),
    primary key(person_id)
);

create table product (
	product_id int not null auto_increment,
    prod_name varchar(255),
    prod_price float,
    prod_descr varchar(255),
    primary key (product_id)
);

create table orders(
	order_id int not null auto_increment,
    order_status varchar(255),
    total_amount float,
    person_person_id int,
    order_date timestamp,
    primary key(order_id),
    foreign key(person_person_id) references person(person_id)
);

create table Order_Item (
    item_id int not null auto_increment,
    order_order_id int not null,
    prod_product_id int not null,
    quantity int,
    primary key(item_id),
    foreign key(prod_product_id) references Product(product_id),
    foreign key(order_order_id) references Orders(order_id)
);
insert into product(prod_name,prod_price,prod_descr) 
values('Calculator', 3.25, 'A simple and smart calculator'),
    ('notebook', 1.23,'A variety of colors!'),
    ('Pencil', 0.25,'H2 pencil');

insert into person(first_name,last_name,address, email, pwd)
values('Fernando', 'Lizola', 'Gdl, Mex', 'luisfernandol@hexaware.com','$2a$12$J.f07yPe/MQBTteewxhYvu8rXVEbhrsGfVfZKEeMNcHrbxDY2D6tC' );

insert into person(first_name,last_name,address, email, pwd)
values('Fernando', 'Lizola', 'Gdl, Mex', 'fer_lizola@hotmail.com', '$2a$12$J.f07yPe/MQBTteewxhYvu8rXVEbhrsGfVfZKEeMNcHrbxDY2D6tC'),
    ('Luis', 'Chavarin','Tpc, Mex', 'test_testing@hotmail.com', 'password123'),
    ('April', 'Hernandez','Gdl, Mex', 'test2@hotmail.com', 'password123');
    
insert into orders(order_status,total_amount,person_person_id, order_date)
values('IN_PROGRESS', 6.50, 1, sysdate()),
    ('COMPLETED', 1.48, 5, sysdate()),
    ('COMPLETED', 3.69, 1, sysdate());
    
insert into order_Item(order_order_id,prod_product_id,quantity)
values(4, 1, 2),
    (5,2,1),
    (5,3,1),
    (6,2,3);
    
select * from product;
select * from person;
select * from orders;
use ordermng;
select * from order_item;
select person0_.person_id as person_i1_2_, person0_.address as address2_2_, person0_.email as email3_2_, person0_.first_name as first_na4_2_, person0_.last_name as last_nam5_2_, person0_.pwd as pwd6_2_ from person person0_ where person0_.email='fer_lizola@hotmail.com';
select person0_.person_id as person_i1_2_, person0_.address as address2_2_, person0_.email as email3_2_, person0_.first_name as first_na4_2_, person0_.last_name as last_nam5_2_, person0_.pwd as pwd6_2_ from person person0_ where person0_.email=

 id={prod.prodID}
        key={prod.prodID}
        name={prod.prodName}
        description={prod.prodDescr}
        price={prod.prodPrice}

        id={prod.id}
        key={prod.id}
        name={prod.name}
        description={prod.description}
        price={prod.price}