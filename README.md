# Описание
Веб-приложение, позволяющее отслеживать наличие/отсутствие у пользователя медицинских препаратов, их случаи применения, срок годности для оптимального ведения домашней аптечки. 
## Наименование
MedKit
## Предметная область
Лекарственные препараты
# Данные
### medicament
name | type | constraints
--- | --- | ---
medicament_reg_num | CHAR(12) | NOT NULL PRIMARY KEY
inn | VARCHAR(50) | NOT NULL
atc_code | CHAR(7) | NOT NULL
pharm_properties | TEXT | 
contraindications | TEXT | 
side_effects | TEXT | 
mode_of_application | TEXT | 
driving | BOOL | 
storage_temperature | INT | 
prescriprtion_required | BOOL | 

### product
name | type | constraints
--- | --- | ---
series | INT | NOT NULL
serial_number | VARCHAR(20) | NOT NULL
medicament_reg_num | CHAR(12) | NOT NULL
gtin_number | VARCHAR(20) | 
trade_name | VARCHAR(50) | NOT NULL
expiration_date | DATE | NOT NULL
marketing_id | SERIAL | NOT NULL
manufacturer_id | SERIAL | NOT NULL

PRIMARY KEY(name, series, serial number)

### manufacturer
name | type | constraints
--- | --- | ---
manufacturer_id | SERIAL | NOT NULL PRIMARY KEY
manufacturer_name | VARCHAR(100) | NOT NULL
address_id | SERIAL | NOT NULL

### marketing authorisation holder
name | type | constraints
--- | --- | ---
marketing_id | SERIAL | NOT NULL PRIMARY KEY
marketing_name | VARCHAR(100) | NOT NULL
address_id | SERIAL | NOT NULL

### address
name | type | constraints
--- | --- | ---
address_id | SERIAL | NOT NULL PRIMARY KEY
country_name | VARCHAR(50) | NOT NULL
city_name | VARCHAR(50) | NOT NULL
street_name | VARCHAR(50) | 
postal_code | VARCHAR(10) | 
phone_number | VARCHAR(12) | UNIQUE
website | VARCHAR(100) | UNIQUE


### disease
name | type | constraints
--- | --- | ---
disease_id | SERIAL | NOT NULL PRIMARY KEY
disease_name | VARCHAR(50) | NOT NULL

### medicaments for diseases
(отношение между болезнями и медикаментами)
name | type | constraints
--- | --- | ---
disease_id | SERIAL | NOT NULL PRIMARY KEY
medicament_reg_num | CHAR(12) | NOT NULL PRIMARY KEY

### symptoms
name | type | constraints
--- | --- | ---
symptom_id | SERIAL | NOT NULL PRIMARY KEY
symptom_name | VARCHAR(50) | NOT NULL

### symptoms of diseases
(отношение между болезнями и симптомами)
name | type | constraints
--- | --- | ---
disease_id | SERIAL | NOT NULL
symptom_id | SERIAL | NOT NULL

### dosage form
форма выпуска препарата
name | type | constraints
--- | --- | ---
dosage_form_id | SERIAL | NOT NULL PRIMARY KEY
dosage_form_name | VARCHAR(100) | NOT NULL

### medicament dosage form
(отношение между медикаментами и формой их выпуска)
name | type | constraints
--- | --- | ---
medicament_reg_num | CHAR(12) | NOT NULL
dosage_form_id | SERIAL | NOT NULL

### user
name | type | constraints
--- | --- | ---
user_id | SERIAL | NOT NULL PRIMARY KEY
login | VARCHAR(50) | NOT NULL
password | VARCHAR(50) | NOT NULL
is_admin | BOOL | NOT NULL

## Общие ограничения целостности
- Связь `many to many`: `medicament` и `disease`, `symptoms` и `disease`, `medicament` и `dosage_form`.
- Связь `one to many`: `medicament` и `product`.
- Связь `one to one`: `product` и `manufacturer`, `product` и `marketing authorisation holder`, `manufacturer` и `address`, `marketing authorisation holder` и `address`.

# Пользовательские роли
- user (кол-во: не ограничено): поиск по базе лекарственных препаратов, выбор медикаментов, добавление к себе.
- оператор базы данных (кол-во: от 1): добавление/редактирование/удаление препаратов.

# UI/API
- UI: React.js
- API: Node.js, Express.js

# Технологии разработки
## Язык программирования
SQL, HTML, CSS, Javascript
## СУБД
PostgreSQL

# ER Diagram
![e879a4be64433513ecdd060a2e24cb2fccb1a08a597036415205170a4122d144](https://user-images.githubusercontent.com/61321903/138564776-b3245d21-1c15-4556-82db-1d1517192f28.png)

