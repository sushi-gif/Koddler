-- ottenere tutte le stazioni con il numero di monopattini totali presenti a quella stazione

-- query per ottenere tutte le ultime operazioni per monopattino

SELECT * 
FROM actions 
GROUP BY scooter DESC 

-- query per ottenere tutti i noleggi in corso

SELECT * 
FROM actions 
GROUP BY scooter DESC 
HAVING action_type = 'n'

-- query per ottenere il numero di monopattini presenti in una stazione
    
SELECT count(*) as monopattini_disponibili, station
FROM temp_nol
GROUP BY station;

-- query per calcolcare il prezzo medio

SELECT AVG(scooters_models.price_per_hour) as prezzo_medio, station
FROM scooters 
INNER JOIN scooters_models ON scooters.model = scooters_models.sc_model_id 
INNER JOIN temp_nol ON temp_nol.scooter = scooters.scooter_id
GROUP BY station;

-- query per le informazioni delle stazioni
SELECT stations.*, available, price
FROM 
(SELECT COUNT(action_id) as available, station_id
FROM temp_nol RIGHT JOIN stations on station_id=station
GROUP BY station) as t1 
INNER JOIN 
(SELECT IFNULL(AVG(scooters_models.price_per_hour),0) as price, station_id
FROM scooters 
INNER JOIN scooters_models ON scooters.model = scooters_models.sc_model_id 
INNER JOIN temp_nol ON temp_nol.scooter = scooters.scooter_id
RIGHT JOIN stations on station_id=station
GROUP BY station) as t2 
ON t1.station_id = t2.station_id
INNER JOIN stations ON t1.station_id = stations.station_id;


-- query per noleggiare

INSERT INTO actions(action_type, action_datetime, card, scooter, station)
VALUES 
('n', now(), 
(select cards.card_id from cards where tag = :cardTag), 
(select scooters.scooter_id from scooters where rfid_tag = :scooterRfidTag), 
:stationPk);

-- query per riconsegnare

INSERT INTO actions(action_type, action_datetime, action_cost, card, scooter, station)
VALUES 
('r', now(), 
(timestampdiff(minute, (select action_datetime from temp_in where temp_in.scooter = (select scooter_id from scooters where rfid_tag = :scooterRfidTag)), now()) / 60) * (select price_per_hour from scooters_models inner join scooters on scooters_models.sc_model_id = scooters.model where rfid_tag = :scooterRfidTag),
(select cards.card_id from cards where tag = :cardTag), 
(select scooters.scooter_id from scooters where rfid_tag = :scooterRfidTag), :stationPk);

-- query per mostrare tutti i monopattini in noleggio con i relativi dati degli utenti

SELECT action_datetime, tag as card_tag, concat(name, ' ', surname) as full_name, email, phone_number, rfid_tag as scooter_tag 
FROM temp_in INNER JOIN cards ON cards.card_id = temp_in.card 
INNER JOIN users on users.user_id = cards.card_id 
LEFT JOIN scooters ON scooters.scooter_id = temp_in.scooter;
