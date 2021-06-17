create database if not exists koddler;
use koddler;

create table if not exists stations(
    `station_id` tinyint not null auto_increment,
    `name` varchar(32) not null,
    `status` enum('on', 'off') not null,
    `address` varchar(32) not null,
    `lat` float(17) not null,
    `lng` float(17) not null,
    primary key(`station_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into stations (name, status, address, lat, lng)
values 
('Stazione Galielo Galilei', 'on', 'Corso Italia, 129', 41.117903563003054, 16.857547523482133),
('Stazione Rita Levi Montalcini', 'on', 'Via Brigata Regina, 24', 41.12393873259007, 16.851683327654683),
('Stazione Camillo Golgi', 'on', 'Str. Sagges, 13', 41.12720076943326, 16.86906886924834),
('Stazione Giuseppe Garibaldi', 'off', 'Via Caldarola 11', 41.115903563003054, 16.883347523482133);

-- 0=user, 1=operator, 2=admin
create table if not exists groups(
    `group_id` tinyint not null auto_increment,
    `group_name` varchar(32) not null unique,
    primary key(`group_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into groups(group_id, group_name)
values
(1, 'user'),
(2, 'operator'),
(3, 'administrator');

-- male, female, non binary and other
create table if not exists users(
    `user_id` bigint not null auto_increment,
    `name` varchar(32) not null,
    `surname` varchar(32) not null,
    `sex` enum('m', 'f', 'n', 'o') not null,
    `email` varchar(64) not null unique,
    `is_email_confirmed` boolean not null default false,
    `password` varchar(72) not null,
    `address` varchar(64) not null,
    `birth_date` date not null,
    `phone_number` varchar(10) not null,
    `is_newsletter` boolean not null default false,
    `group` tinyint not null,
    primary key(`user_id`),
    foreign key(`group`) references groups(`group_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into users(`name`, `surname`, `sex`, `email`, `is_email_confirmed`, `password`, `address`, `birth_date`, `phone_number`, `is_newsletter`, `group`)
values('Vincenzo', 'Turturro', 'm', 'turturro.vincenzot@gmail.com', 1, '$2y$12$Bentxtjip2uM00MkRUJnoertWywpH63kagNMzyNXT5LmBslq.Z0RK', 'Via Siamesi 13', '2002-10-18', '3920838879', 0, 3),
('Giovanni', 'Siamesi', 'm', 'giovanni.siamesi@gmail.com', 1, '$2y$12$CJzgjMWTw6ouk3q.3MsxnuqgTOf84Ap2b0EzUzAxXeDwu3s1fT74i', 'Via Molfetta 22', '2001-11-18', '3453561829', 1, 1),
('Sara', 'Visecchi', 'n', 'sara.visecchi@gmail.com', 1, '$2y$12$cYNuUBpuF7ccrhc1Kd2iNO9w4.29/pMRDw6GzjsaUCQuc.0FP9KYW', 'Via Fiorentino 58', '2000-01-08', '3921352810', 1, 1),
('Giuseppe', 'Alma', 'n', 'giuseppe.alma@gmail.com', 1, '$2y$12$Nq6Z5d9lbvbMcpV0JG0bBek7UXdAJYQMjnW9UlJfMOWHszIz.Jpxy', 'Via Giovinazzo 142', '1999-10-20', '3208020312', 0, 1),
('Erica', 'Caporeale', 'o', 'erica.caporeale@gmail.com', 1, '$2y$12$3k.k2b4GpXqAoWZI4s4.GOTLN4yMyORsykqZwFqEav1MCaRMdnUTa', 'Via Siamesi 218', '2002-05-22', '3923819320', 1, 1),
('Gianmarco', 'Abbatista', 'o', 'gianmarco.abbatista@gmail.com', 1, '$2y$12$B2pkpYz0yRcOcVzsDreZt.rTdmAYW0WOS2x48wVPmK65WfIjr5lj2', 'Via Pugliesi Anna 118', '2001-03-11', '3921133379', 0, 1),
('Sam', 'Cavani', 'm', 'samuel.cavani@gmail.com', 1, '$2y$12$Cx7ervyteYu6F6rQxwArUex9PP83spInOKbOjkOD3T2HahzHSOZ52', 'Via Russo 112', '1995-01-29', '3960531829', 0, 1);

create table if not exists logs(
    `u_id` bigint not null,
    `user_ip` varchar(15) not null,
    `device_type` varchar(64) not null,
    `date` datetime not null,
    foreign key (`u_id`) references users(`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- o = ordinata, s = spedita, p = operativa (consegnata / in possesso del cliente), m = mancante (in assistenza / persa)
create table if not exists cards(
    `card_id` bigint not null auto_increment,
    `issue_date` date not null,
    `expiry_date` date not null,
    `status` enum('o', 's', 'p', 'm'),
    `tag` varchar(36) not null unique,
    `user` bigint not null unique,
    primary key(`card_id`),
    foreign key(`user`) references users(`user_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into cards (`issue_date`, `expiry_date`, `status`, `tag`, `user`)
values
('2021-05-26', '2026-05-26', 'p', 'e56912ab-b9cf-4207-85f5-86d9a0133a73', 1),
('2021-05-27', '2026-05-27', 'p', '49f34eca-7374-4aec-9819-f9febffa2747', 2),
('2021-05-27', '2026-05-27', 'p', 'b5e99ea4-0ed9-4958-a4be-83ae2ee98333', 3),
('2021-05-27', '2026-05-27', 'p', '94788596-c4ed-4ffc-9c16-eefcf82723a2', 4),
('2021-05-27', '2026-05-27', 's', 'fc06e9f1-2cde-4bd4-93b5-e3ac896e135d', 5),
('2021-05-27', '2026-05-27', 's', '024bbc63-984b-4732-92d0-ae1434663cf7', 6),
('2021-05-27', '2026-05-27', 'p', 'c9a7c145-35ee-45dc-a003-3807ecd2766a', 7);

create table if not exists scooters_models(
    `sc_model_id` smallint not null auto_increment,
    `manufacter` varchar(32) not null,
    `model` varchar(32) not null unique,
    `price_per_hour` float not null,
    primary key(sc_model_id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into scooters_models(`manufacter`, `model`, `price_per_hour`)
values
('Xiaomi', 'Mi Electric Scooter', 7.50),
('GO!SMART', 'GS-FS85', 5.00),
('Vivobike', 'Monopattino Elettrico S2', 8.25),
('Inokim', 'Ox Super', 5.50);

create table if not exists scooters(
    `scooter_id` int not null auto_increment,
    `release_date` date not null,
    `rfid_tag` varchar(36) not null unique,
    `model` smallint not null,
    primary key(`scooter_id`),
    foreign key(`model`) references scooters_models(`sc_model_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into scooters(`release_date`, `rfid_tag`, `model`)
values
('2021-05-26', '05287690-7606-4ca2-b474-34851b5b8654', 1),
('2021-05-26', '8c4a9cb5-b500-4617-9bb0-526d4120a0ed', 1),
('2021-05-26', '0a9bba52-1ea5-4a75-ba99-f2f4322f2b1d', 1),
('2021-05-26', '52c0d55d-c10e-4d6e-85c1-c9dc6de608be', 2),
('2021-05-26', 'ea1836a2-237c-4a7a-94f1-9bf880ddf00d', 2),
('2021-05-26', 'f1fdc184-7c1f-467d-a85b-3a64ab7d4b2a', 2),
('2021-05-26', 'b53fd04c-1b68-4ecc-9d33-b461e95e2ea7', 3),
('2021-05-26', 'de0a381c-4186-460a-97ab-59fafb9028e6', 3),
('2021-05-26', '5772bafe-7b30-4bda-84cb-e4a70261c0b0', 4),
('2021-05-26', '6a0e1d79-318f-4a30-b428-118013ced819', 4),
('2021-05-26', '21c92c9e-cf1e-4d3b-92eb-7f1a8e23e9c0', 1),
('2021-05-26', '299803aa-1315-4f7e-91af-56032071ff6f', 1),
('2021-05-26', 'c8d40c8e-3d87-4ea7-9f3a-d49502bae0f4', 1),
('2021-05-26', '628e9b2c-c805-439f-8d68-c210f79f510b', 2),
('2021-05-26', 'e5265f30-e4c0-47fd-a3e8-a4b0de263dd2', 2),
('2021-05-26', 'abbe957f-d185-40d6-9182-87d80a3cf1fd', 2),
('2021-05-26', 'cb087055-667d-4404-bfb9-0694d90ae8f3', 3),
('2021-05-26', '1c570a1b-2910-4f40-8d5a-dff4207579be', 3),
('2021-05-26', '03878da4-4e3d-4e63-bdbd-2caed08d2293', 4),
('2021-05-26', '6dcb2677-bef4-4bb7-9412-52a5c681dbf6', 4),
('2021-05-26', 'd9a88bd5-32ac-4f3a-9fa4-e5e085328ec6', 1),
('2021-05-26', '949af744-979b-4aea-a372-433e6df20402', 1),
('2021-05-26', '90d49621-2186-4137-8e20-716c4439e569', 1),
('2021-05-26', '81bf2ec1-b9fe-400f-ae99-eab7c288d7ac', 2),
('2021-05-26', '1566b302-dd4e-4335-9ada-c951a70751e6', 2),
('2021-05-26', '1df8cad1-3ddd-490a-87f1-70e77dd0d80a', 2),
('2021-05-26', '070a1bce-f603-42d7-9c46-f5a6ba25b892', 3),
('2021-05-26', 'df228b37-3eaa-4ef7-b9bc-a6543a7379e8', 3),
('2021-05-26', 'ecb252c3-fddf-4497-a5cc-bf1b412b01f0', 4),
('2021-05-26', '3c2fe3aa-6a0f-4cb2-83ed-f7931df60ce2', 4);

-- action_type => n = noleggio, r = riconsegna, i = init (associazione) = r (?), a = assistenza = n (?)
-- status => a = accettato, r = respinto
--  CHECK ((`action_type`=' r' AND `action_cost` is not null) OR `action_type`<>'r')
create table if not exists actions(
    `action_id` bigint not null auto_increment,
    `action_type` enum('n', 'r') not null,
    `action_datetime` datetime not null,
    `action_cost` float CHECK ((`action_type`='r' AND `action_cost` is not null) OR `action_type`<>'r'),
    `card` bigint not null,
    `scooter` int not null,
    `station` tinyint not null,
    primary key(`action_id`),
    foreign key(`card`) references cards(`card_id`),
    foreign key(`scooter`) references scooters(`scooter_id`),
    foreign key(`station`) references stations(`station_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into actions(`action_type`, `action_datetime`, `action_cost`, `card`, `scooter`, `station`)
values
('r', '2021-05-25 15:35:33', 0.00, 1, 1, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 2, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 3, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 4, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 5, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 6, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 7, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 8, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 9, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 10, 1),
('r', '2021-05-25 15:35:33', 0.00, 1, 11, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 12, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 13, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 14, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 15, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 16, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 17, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 18, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 19, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 20, 2),
('r', '2021-05-25 15:35:33', 0.00, 1, 21, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 22, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 23, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 24, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 25, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 26, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 27, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 28, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 29, 3),
('r', '2021-05-25 15:35:33', 0.00, 1, 30, 3);

insert into actions(`action_type`, `action_datetime`, `card`, `scooter`, `station`)
values
('n', '2021-05-27 09:35:33', 1, 1, 1),
('n', '2021-05-27 09:35:33', 2, 2, 1),
('n', '2021-05-27 09:35:33', 3, 3, 1),
('n', '2021-05-27 09:35:33', 5, 4, 1),
('n', '2021-05-27 09:35:33', 6, 6, 1),
('n', '2021-05-27 09:35:33', 7, 7, 1),
('n', '2021-05-27 09:35:33', 1, 11, 2),
('n', '2021-05-27 10:35:00', 2, 12, 2),
('n', '2021-05-27 10:35:00', 3, 14, 2);

insert into actions(`action_type`, `action_datetime`, `action_cost`, `card`, `scooter`, `station`)
values
('r', '2021-05-27 10:35:33', 187.50, 2, 2, 1),
('r', '2021-05-27 11:35:33', 195.00, 1, 1, 1),
('r', '2021-05-27 11:35:33', 130.00, 7, 6, 2),
('r', '2021-05-27 12:35:33', 135.00, 6, 4, 1);

insert into actions(`action_type`, `action_datetime`, `card`, `scooter`, `station`)
values
('n', '2021-05-27 12:55:00', 4, 24, 3),
('n', '2021-05-27 13:15:00', 1, 25, 3);

insert into actions(`action_type`, `action_datetime`, `action_cost`, `card`, `scooter`, `station`)
values
('r', '2021-05-27 11:35:33', 125.00, 4, 14, 3),
('r', '2021-05-27 15:35:33', 225.00, 4, 3, 3),
('r', '2021-05-27 16:35:33', 255.75, 1, 7, 2),
('r', '2021-05-27 16:35:33', 232.50, 2, 11, 2),
('r', '2021-05-27 13:35:33', 225.00, 3, 12, 1);

insert into actions(`action_type`, `action_datetime`, `card`, `scooter`, `station`)
values
('n', '2021-05-28 14:25:33', 2, 26, 3),
('n', '2021-05-28 14:25:33', 3, 27, 3),
('n', '2021-05-28 15:35:33', 4, 28, 3),
('n', '2021-05-28 15:45:33', 5, 29, 3),
('n', '2021-05-28 16:35:33', 6, 30, 3);

-- vista per i monopattini presenti

CREATE VIEW temp_nol AS (
    SELECT * 
    FROM actions
    GROUP BY scooter DESC 
    HAVING action_type = 'r');

-- vista per i monopattini in noleggio

CREATE VIEW temp_in AS (
    SELECT * 
    FROM actions
    GROUP BY scooter DESC 
    HAVING action_type = 'n');