Expense and Income Money Manager Backend

This is a simple backend API for managing expenses and income, built with Spring Boot and Java. The API provides basic CRUD (Create, Read, Update, Delete) operations for expenses and income, with categorization support.

Features:

- Manage expenses and income with categories (e.g., housing, transportation, food, etc.)
- Create, read, update, and delete expenses and income
- Support for multiple users 

API Endpoints:

- Expenses:
    - POST /expenses: Create a new expense
    - GET /expenses: Retrieve a list of all expenses
    - GET /expenses/{id}: Retrieve an expense by ID
    - PUT /expenses/{id}: Update an expense
    - DELETE /expenses/{id}: Delete an expense
- Income:
    - POST /income: Create a new income
    - GET /income: Retrieve a list of all income
    - GET /income/{id}: Retrieve an income by ID
    - PUT /income/{id}: Update an income
    - DELETE /income/{id}: Delete an income
- Categories:
    - GET /categories: Retrieve a list of all categories
    - POST /categories: Create a new category
    - PUT /categories/{id}: Update a category


Data Models:

- Expense:
    - id (Long): Unique identifier
    - category (String): Category name
    - amount (Double): Expense amount
    - date (Date): Expense date
    - description (String): Expense description
- Income:
    - id (Long): Unique identifier
    - category (String): Category name
    - amount (Double): Income amount
    - date (Date): Income date
    - description (String): Income description
- Category:
    - id (Long): Unique identifier
    - name (String): Category name
    - description(String) 

Technologies Used:

- Spring Boot
- Java
- Spring Data JPA
- Hibernate
- MySQL 
