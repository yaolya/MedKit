# Описание
Веб-приложение, позволяющее отслеживать наличие/отсутствие у пользователя медицинских препаратов, всю небходимую информацию о них (срок годности, лекарственную форму, противопоказания, случаи применения, место и температуру хранения, побочные эффекты, способы применения и т. д.), распределять по категориям, создавать списки покупок для оптимального ведения домашней аптечки. 

При покупке медикамента пользователь ищет его в базе и добавляет к себе в 'аптечку'. Срок годности вводится вручную и отслеживается приложением. При приближении окончания срока пользователю приходит напоминание. Если препарат заканчивается, пользователь также отмечает это в приложении. 

Препараты можно распределять по существующим категориям ('в поездку', 'всегда с собой',...) или создавать собственные (например, под конкретные заболевания).
У пользователей есть возможность составлять списки покупок, чтобы сразу добавлять в них закончившиеся препараты и препараты с вышедшим сроком годности.
## Наименование
MedKit
## Предметная область
Лекарственные препараты
# Данные
### medicament
name | type | constraints
--- | --- | ---
medicament_reg_num | CHAR(12) | NOT NULL PRIMARY KEY
trade_name | VARCHAR(50) | NOT NULL
img_url | VARCHAR(150) |
inn | VARCHAR(50) | NOT NULL
atc_code | CHAR(7) | NOT NULL
pharm_properties | TEXT | 
contraindications | TEXT | 
side_effects | TEXT | 
mode_of_application | TEXT | 
driving | BOOL | 
storage_temperature | INT | 
prescriprtion_required | BOOL | 
marketing_id | SERIAL | NOT NULL
manufacturer_id | SERIAL | NOT NULL

### product
name | type | constraints
--- | --- | ---
product_id | SERIAL | NOT NULL PRIMARY KEY
series | INT | NULLABLE
serial_number | VARCHAR(20) | NULLABLE
medicament_reg_num | CHAR(12) | NOT NULL
expiration_date | DATE | NULLABLE
in_list | BOOL | NOT NULL
user_id | SERIAL | NOT NULL

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

### categories of medicaments
(в какие категории входят препараты)
name | type | constraints
--- | --- | ---
medicament_reg_num | CHAR(12) | NOT NULL
category_id | SERIAL | NOT NULL

### category
name | type | constraints
--- | --- | ---
category_id | SERIAL | NOT NULL PRIMARY KEY
category_name | VARCHAR(100) | NOT NULL
user_id | SERIAL | NOT NULL

### user
name | type | constraints
--- | --- | ---
user_id | SERIAL | NOT NULL PRIMARY KEY
login | VARCHAR(50) | NOT NULL
password | VARCHAR(50) | NOT NULL
is_admin | BOOL | NOT NULL

## Общие ограничения целостности
- Связь `many to many`: `medicament` и `disease`, `symptoms` и `disease`, `medicament` и `dosage_form`, `medicament` и `category`.
- Связь `one to many`: `medicament` и `product`, `user` и `category`, `user` и `product`.
- Связь `one to one`: `medicament` и `manufacturer`, `medicament` и `marketing authorisation holder`, `manufacturer` и `address`, `marketing authorisation holder` и `address`.

# Пользовательские роли
- user (кол-во: не ограничено): поиск по базе лекарственных препаратов, выбор медикаментов, добавление к себе, создание/удаление категорий, распределение по категориям, изменение списка покупок.
- оператор базы данных (кол-во: от 1): добавление/редактирование/удаление препаратов; добавление/удаление категорий, существующих по умолчанию.

# UI/API
- UI: React.js
- API: Node.js, Express.js

# Технологии разработки
## Язык программирования
SQL, HTML, CSS, Javascript
## СУБД
PostgreSQL

# ER Diagram
![ER Diagram blank](https://user-images.githubusercontent.com/61321903/139266047-18d63d55-cc8e-48c3-ab4d-87e9153b23d1.png)
