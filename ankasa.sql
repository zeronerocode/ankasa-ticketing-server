CREATE TABLE airlines (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    image character varying(255) NOT NULL,
    is_active integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


CREATE TABLE bookings (
    id character varying(255) NOT NULL,
    user_id character varying(255),
    flight_id character varying(255),
    title character varying(20),
    full_name character varying(255),
    nationality character varying(255),
    travel_insurance character varying(10),
    payment_status integer,
    total_payment integer,
    seat varchar(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


CREATE TABLE countries (
    id character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    alias character varying(5) NOT NULL,
    city_name character varying(255) NOT NULL,
    city_image character varying(300) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);



CREATE TABLE flights (
    id character varying(255) NOT NULL,
    airline_id character varying(255),
    departure_city character varying(255),
    arrival_city character varying(255),
    departure_time time without time zone,
    arrival_time time without time zone,
    code character varying(10),
    class character varying(50),
    departure_date date,
    direct integer,
    transit integer,
    more_transit integer,
    lugage integer,
    meal integer,
    wifi integer,
    gate character varying(20),
    terminal character varying(20),
    price integer,
    stock integer,
    is_active integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);



CREATE TABLE users (
    id character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    phone_number character varying(20),
    city character varying(255),
    address character varying(255),
    post_code character varying(20),
    photo character varying(255),
    is_active boolean,
    level integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);



INSERT INTO airlines (id, name, image, is_active, created_at, updated_at) VALUES ('c57ecfda-0c00-4ff7-a430-3ac62294558e', 'Garuda Indoenesia', '1651714757252.png', 1, '2022-05-05 08:37:46.846513', '2022-05-05 01:39:17.505');
INSERT INTO airlines (id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('26a6bfc5-7a19-4a43-9a22-3965684b0a55', 'Lion Air', '1651715377510.png', 1, '2022-05-05 08:49:38.000802', NULL);
INSERT INTO airlines (id, name, image, is_active, created_at, updated_at, deleted_at) VALUES ('264344s5-7a19-4a43-9a22-3965684b0a55', 'Air Asia', '1651564377510.png', 1, '2022-08-05 08:49:38.000802', NULL);

-- countries
INSERT INTO countries (id, name, alias, city_name, city_image) VALUES ('first_city', 'INDONESIA', 'IDN', 'Jakarta', NULL);
INSERT INTO countries (id, name, alias, city_name, city_image) VALUES ('ke_2', 'INDONESIA', 'IDN', 'Medan', 'Medan.png');
INSERT INTO countries (id, name, alias, city_name, city_image) VALUES ('ke_3', 'INDONESIA', 'IDN', 'Papua', 'papua.png');

--flights
INSERT INTO flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, 
					 departure_date, direct, transit, more_transit,lugage, meal, wifi, gate, terminal, price, stock, 
					 is_active) VALUES ('first_flight', 'c57ecfda-0c00-4ff7-a430-3ac62294558e', 'first_city',
					 'ke_3', '12:33', '17:33', 'GI-221', 'Economy', '2022-09-07', 0, 1, 0, 1, 1, 1, 221, 'A',
					  4868000, 5, 1);
INSERT INTO flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, 
					 departure_date, direct, transit, more_transit,lugage, meal, wifi, gate, terminal, price, stock, 
					 is_active) VALUES ('flight_2', '26a6bfc5-7a19-4a43-9a22-3965684b0a55', 'ke_2',
					 'ke_3', '15:00', '09:00', 'L1-345', 'Bussiness', '2022-07-09', 0, 0, 1, 1, 0, 0, 345, 'LI',
					  6868000, 2, 1);
INSERT INTO flights (id, airline_id, departure_city, arrival_city, departure_time, arrival_time, code, class, 
					 departure_date, direct, transit, more_transit,lugage, meal, wifi, gate, terminal, price, stock, 
					 is_active) VALUES ('flight_3', '26a6bfc5-7a19-4a43-9a22-3965684b0a55', 'first_city',
					 'ke_3', '08:00', '10:30', 'L1-123', 'Bussiness', '2022-07-09', 1, 0, 0, 1, 1, 1, 123, 'LI',
					  1200000, 3, 1);
	
SELECT flights.id, flights.airline_id, flights.departure_city, flights.arrival_city, flights.departure_time,
                  flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
                  flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
                  flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image FROM 
				  flights INNER JOIN airlines ON flights.airline_id
                  = airlines.id WHERE flights.stock >= 1 AND airlines.name = 'Garuda Indonesoa' LIMIT 1 OFFSET 0;

SELECT flights.id, flights.airline_id, flights.departure_city, flights.arrival_city, flights.departure_time,
                  flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
                  flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
                  flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image,
                  origin.city_name AS origin, destination.city_name AS destination
                  FROM flights 
                  INNER JOIN airlines ON flights.airline_id = airlines.id
                  INNER JOIN countries AS origin ON flights.departure_city = origin.id
				  INNER JOIN countries AS destination ON flights.arrival_city = destination.id
                  WHERE flights.stock >= 1;

SELECT flights.id, flights.airline_id, flights.departure_time,
                  flights.arrival_time, flights.code, flights.class, flights.departure_date, flights.direct,
                  flights.transit, flights.more_transit, flights.lugage, flights.meal, flights.wifi, flights.gate,
                  flights.terminal, flights.price, flights.stock, flights.is_active, airlines.name AS airline_name, airlines.image AS airline_image,
                  origin.city_name AS origin, destination.city_name AS destination
                  FROM flights 
                  INNER JOIN airlines ON flights.airline_id = airlines.id
                  INNER JOIN countries AS origin ON flights.departure_city = origin.id
				  INNER JOIN countries AS destination ON flights.arrival_city = destination.id
                  WHERE flights.stock >= 1;




INSERT INTO users (id, username, email, password, name, phone_number, city, address, post_code, photo, is_active, level, created_at, updated_at) VALUES ('c39c53c6-ee87-447b-8c5f-9d11ce007ceb', 'Master Programmer', 'masterprogrammer123@gmail.com', '$2b$10$qGutdwxWCYMKhYidnZDjPO/3e7glh4ptB1ZbqUM4bkM2sq1ZwD92K', NULL, NULL, NULL, NULL, NULL, '1651749321000.png', NULL, 1, 0, '2022-05-03 11:45:24.934934', '2022-05-05 18:15:21.673757');



