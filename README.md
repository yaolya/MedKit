# Описание
Веб-приложение, позволяющее отслеживать наличие/отсутствие у пользователя медицинских препаратов, всю небходимую информацию о них (срок годности, противопоказания, случаи применения, температуру хранения, побочные эффекты и т. д.), распределять по категориям, создавать список покупок для оптимального ведения домашней аптечки. 

При покупке медикамента пользователь ищет его в базе и добавляет к себе в 'аптечку', заполняя количество единиц препарата и их срок годности. Если препарат заканчивается, пользователь отмечает это в приложении. Срок годности отслеживается приложением автоматически.

Препараты можно распределять по существующим категориям ('в поездку', 'всегда с собой',...) или создавать собственные (например, под конкретные заболевания).

У пользователей есть возможность составлять списки покупок, чтобы сразу добавлять в них закончившиеся препараты и препараты с вышедшим сроком годности. В списке  указывается количество требуемых единиц товара, и оно автоматически обновляется после введения пользователем срока годности приобретенных препаратов.
## Наименование
MedKit
## Предметная область
Лекарственные препараты
# Данные
### medicament
name | type | constraints
--- | --- | ---
medicament_id | Integer | NOT NULL PRIMARY KEY
name | String(50) | NOT NULL
pharm_properties | Text | 
contraindications | Text | 
side_effects | Text | 
mode_of_application | Text | 
driving | Boolean | 
storage_temperature | Integer | 
prescriprtion_required | Boolean | 
manufacturer_id | Integer | NOT NULL

### product
name | type | constraints
--- | --- | ---
product_id | Integer | NOT NULL PRIMARY KEY
medicament_id | Integer | NOT NULL
expiration_date | Date | NOT NULL
user_id | Integer | NOT NULL

### user's list
name | type | constraints
--- | --- | ---
user_id | Integer | NOT NULL
medicament_id | Integer | NOT NULL
quantity | Integer | NOT NULL

### manufacturer
name | type | constraints
--- | --- | ---
manufacturer_id | Integer | NOT NULL PRIMARY KEY
manufacturer_name | String(100) | NOT NULL

### disease
name | type | constraints
--- | --- | ---
disease_id | Integer | NOT NULL PRIMARY KEY
disease_name | String(50) | NOT NULL

### medicaments for diseases
(отношение между болезнями и медикаментами)
name | type | constraints
--- | --- | ---
disease_id | Integer | NOT NULL PRIMARY KEY
medicament_id | Integer | NOT NULL PRIMARY KEY

### categories of medicaments
(в какие категории входят препараты)
name | type | constraints
--- | --- | ---
medicament_id | Integer | NOT NULL
category_id | Integer | NOT NULL

### category
name | type | constraints
--- | --- | ---
category_id | Integer | NOT NULL PRIMARY KEY
category_name | String(100) | NOT NULL
category_description | Text |
user_id | Integer | NOT NULL

### user
name | type | constraints
--- | --- | ---
user_id | Integer | NOT NULL PRIMARY KEY
login | String(50) | NOT NULL
password | String(50) | NOT NULL
is_admin | Boolean | NOT NULL

## Общие ограничения целостности
- Связь `many to many`: `medicament` и `disease`, `medicament` и `category`, `product` и `user's list`.
- Связь `one to many`: `medicament` и `product`, `user` и `category`, `user` и `product`.
- Связь `one to one`: `medicament` и `manufacturer`, `user` и `user's list`.

# Пользовательские роли
- user (кол-во: не ограничено): поиск по базе лекарственных препаратов, выбор медикаментов, добавление к себе, создание/удаление категорий, распределение по категориям, изменение списка покупок.
- оператор базы данных (кол-во: от 1): добавление/редактирование/удаление препаратов; добавление/удаление категорий, существующих по умолчанию.

# UI/API
- UI: React.js
- API: Python Flask

# Технологии разработки
## Язык программирования
SQL, HTML, CSS, Javascript, Python
## СУБД
PostgreSQL

# ER Diagram
![ER Diagram blank](https://user-images.githubusercontent.com/61321903/139284135-439b59dd-fd46-4c60-85e2-b92e646cef2f.png)
