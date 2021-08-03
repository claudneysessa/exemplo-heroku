exports.up = function(knex) {
    return knex.schema.createTable('usuario', function(table) {

        table
            .increments('id')
            .comment("Identificador do Registro")
            .primary();

        table
            .string('nome')
            .comment("Nome do Usu�rio");

        table
            .string('email')
            .comment("Endere�o de Correio Eletr�nico");

        table
            .string('telefone')
            .comment("Telefone de Contato");

        table
            .string('senha')
            .comment("Senha de Acesso");

        table
            .boolean('status')
            .comment("Status do Usu�rio");

    })
};

exports.down = function(knex) {
    knex.schema.dropTable('usuario');
};