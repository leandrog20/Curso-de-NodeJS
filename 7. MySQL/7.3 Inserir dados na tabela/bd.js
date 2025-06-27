// Para inserir dados na tabela, você pode usar o seguinte comando:

insert into nome_da_tabela() values ();

// Dentro dos Primeiros parenteses, você deve especificar os campos nos quais deseja inserir os dados. Por exemplo:

insert into nome_da_tabela (id, nome, idade, email)

// Dentro dos segundos parênteses, você pode definir os valores dos campos a serem inseridos, como por exemplo:

insert into nome_da_tabela (id, nome, idade, email) values (1, 'João', 25, 'test@test.com');

// Isso inserirá um registro na tabela "nome_da_tabela" com os valores especificados para os campos "id", "nome", "idade" e "email".

// Lembre-se de que os tipos de dados dos valores devem corresponder aos tipos de dados dos campos definidos na tabela. Por exemplo, se o campo "id" for do tipo "int", você deve inserir um valor inteiro.

// Lembre-se de que, para inserir dados na tabela, você deve estar conectado ao banco de dados MySQL e devera entrar dentro do banco com o comando USE.

// Para ver os dados inseridos na tabela, você pode usar o seguinte comando:

select * from nome_da_tabela;

// Para mostrar um dados específico, você pode usar o seguinte comando:

select * from nome_da_tabela where id = 1;

select * from nome_da_tabela where nome = "test";
