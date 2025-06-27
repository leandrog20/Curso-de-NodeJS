// Para criar uma tabela, você pode usar o seguinte comando:

import { create } from "domain"

create table nome_da_tabela()

// Dentro dos parênteses, você pode definir os campos da tabela, como por exemplo:

create table nome_da_tabela (
    id int,
    nome varchar(50),
    idade int,
    email varchar(50)
);

// Isso criará uma tabela chamada "nome_da_tabela" com os campos "id", "nome", "idade" e "email".

// Para ver as tabelas existentes no banco de dados, use o seguinte comando:

show tables;

// Para ver a estrutura de uma tabela específica, use o seguinte comando:

describe nome_da_tabela;

// Isso mostrará os campos da tabela, seus tipos de dados e outras informações.