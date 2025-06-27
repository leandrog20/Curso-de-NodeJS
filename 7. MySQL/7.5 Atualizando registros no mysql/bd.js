// Para atualizar um registro específico da tabela, você pode usar o seguinte comando:

update nome_da_tabela set campo1 = valor1 where id = 1;

// Isso atualizará o campo "campo1" com o valor "valor1" do registro com o "id" igual a 1 da tabela "nome_da_tabela".

// Você pode atualizar vários campos ao mesmo tempo, separando-os por vírgula:

update nome_da_tabela set campo1 = valor1, campo2 = valor2 where id = 1;

// Voce pode usar qualquer campo da tabela para filtrar o registro que deseja atualizar. Por exemplo, se você quiser atualizar o registro com o nome "João", você pode usar o seguinte comando:

update nome_da_tabela set campo1 = valor1 where nome = 'João';