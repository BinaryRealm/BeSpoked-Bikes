INSERT INTO app_user (id, email, username, password) VALUES
(1, 'jack@test.com', 'Jack', 'sha256$Xx7EzqfhZAfsz6wm$4c7f5b094bdeece49e598565a307f1412baa16ac37fec7ed919a230d220d60a4');

INSERT INTO customers (id, first_name, last_name, address, phone, start_date) VALUES
(DEFAULT, 'John', 'Smith','888 St Margarets Ave.
Dubuque, IA 52001', '517-566-5682', TIMESTAMP '2012-08-23'),
(DEFAULT, 'Ross',  'Chavez', '2371 Michael Street
Houston, TX 77022', '505-921-1491', TIMESTAMP '2015-09-01'),
(DEFAULT, 'Julie',  'Schrader', '4273 Prospect Valley Road
Los Angeles, CA 90017', '410-690-4879', TIMESTAMP '2016-10-28'),
(DEFAULT, 'Kimberly',  'Corpus', '2984 Indiana Avenue
Waipahu, HI 96797', '563-942-0696', TIMESTAMP '2019-03-07'),
(DEFAULT, 'David',  'Pack', '4284 Still Pastures Drive
Columbia, SC 29210', '917-350-3288', TIMESTAMP '2020-05-05');

INSERT INTO salespersons (id, first_name, last_name, address, phone, start_date, termination_date, manager) VALUES
(DEFAULT, 'Craig', 'Janssen', '2509 Centennial Farm Road
Boyden, IA 51234', '712-725-6768', TIMESTAMP '2012-08-23', TIMESTAMP '2022-05-23', 'Larry M. Bold'),
(DEFAULT, 'Deborah', 'Jay', '1520 Rinehart Road
Miami, FL 33132', '786-365-1342', TIMESTAMP '2015-08-23', NULL, 'Larry M. Bold'),
(DEFAULT, 'Angel', 'Stepp', '4514 Hiddenview Drive
Cleveland, OH 44106', '216-229-5173', TIMESTAMP '2010-01-30', NULL, 'Larry M. Bold'),
(DEFAULT, 'Maria', 'Howard', '1367 Luke Lane
Longdale, OK 73755', '580-274-6619', TIMESTAMP '2018-03-13', NULL, 'Trina G. Mintz'),
(DEFAULT, 'Jason', 'Hargraves', '93 Henery Street
Wichita, KS 67202', '316-889-5912', TIMESTAMP '2013-05-08', NULL, 'Trina G. Mintz');

INSERT INTO products (id, name, manufacturer, style, purchase_price, sale_price, qty_on_hand, commission_percentage) VALUES
(DEFAULT, '2021 Polygon Premier 5 - Grey/ Lemon - 27.5 inch Mountain Bike', 'Polygon', 'Mountain', 400.00, 549.00, 5, 5),
(DEFAULT, '2021 Polygon Strattos S2 - Shimano Claris Road Bike', 'Polygon', 'Road', 490.00, 649.00, 3, 5),
(DEFAULT, 'Nishiki Men''s Pueblo 26 inch Mountain Bike', 'Nishiki', 'Mountain', 225.00, 299.99, 8, 5),
(DEFAULT, 'Schwinn Signature Women''s Largo 7 26'''' Cruiser Bike', 'Schwinn', 'Cruiser', 360.00, 479.99, 4, 5),
(DEFAULT, 'Schwinn Adult 27.5” Marshall Electric Hybrid Bike', 'Schwinn', 'Hybrid', 1200.00, 1599.99, 2, 5);

INSERT INTO discounts (product_id, begin_date, end_date, discount_percentage) VALUES
(1, TIMESTAMP '2021-01-01', TIMESTAMP '2021-03-01', 10),
(1, TIMESTAMP '2021-05-01', TIMESTAMP '2021-07-01', 8),
(2, TIMESTAMP '2021-03-01', TIMESTAMP '2021-05-01', 10),
(2, TIMESTAMP '2021-08-01', TIMESTAMP '2021-10-01', 9),
(3, TIMESTAMP '2021-10-01', TIMESTAMP '2021-12-01', 10),
(4, TIMESTAMP '2021-08-01', TIMESTAMP '2021-11-01', 15);


INSERT INTO sales (product_id, salesperson_id, customer_id, sales_date) VALUES
(1, 3, 1, TIMESTAMP '2021-01-01'),
(5, 2, 1, TIMESTAMP '2021-01-15'),
(4, 5, 4, TIMESTAMP '2021-02-03'),
(5, 1, 3, TIMESTAMP '2021-02-20'),
(1, 1, 2, TIMESTAMP '2021-03-03'),
(2, 5, 2, TIMESTAMP '2021-03-10'),
(1, 4, 1, TIMESTAMP '2021-04-11'),
(3, 2, 1, TIMESTAMP '2021-04-04'),
(1, 3, 1, TIMESTAMP '2021-05-08'),
(2, 1, 5, TIMESTAMP '2021-05-17'),
(4, 5, 5, TIMESTAMP '2021-06-18'),
(3, 4, 5, TIMESTAMP '2021-06-28'),
(1, 3, 5, TIMESTAMP '2021-07-25'),
(1, 5, 5, TIMESTAMP '2021-07-13'),
(3, 5, 3, TIMESTAMP '2021-08-16'),
(3, 1, 5, TIMESTAMP '2021-08-23'),
(2, 1, 5, TIMESTAMP '2021-09-16'),
(4, 4, 3, TIMESTAMP '2021-09-05'),
(2, 1, 5, TIMESTAMP '2021-10-14'),
(3, 5, 4, TIMESTAMP '2021-10-08'),
(5, 4, 1, TIMESTAMP '2021-11-09'),
(2, 5, 1, TIMESTAMP '2021-11-14'),
(3, 5, 2, TIMESTAMP '2021-12-05'),
(4, 4, 4, TIMESTAMP '2021-12-10');
