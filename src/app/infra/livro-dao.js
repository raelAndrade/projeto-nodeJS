// Essa classe é responsável por disponibilizar toda e qualquer funcionalidade de acesso ao Banco de dados relativos ao Livro
class LivroDao {

    constructor(db){
        this._db = db;
    }

    lista(){
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro, resultados) => {
                    if(erro) return reject('Não foi possível listar os livros');

                    return resolve(resultados);
                }
            )
        });
    }

    adiciona(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO livros (
                        titulo,
                        preco,
                        descricao
                    ) values (?, ?, ?)
                `, 
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ], 
                function(err){
                    if(err){
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }
                    resolve();
                }
            );
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM livros 
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if(erro){
                        console.log(erro);
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }

    buscaPorId(id){
        return new Promise((resolve, reject) => {
            this._db.get(`
                SELECT * 
                FROM livros 
                WHERE id = ?
            `,
            [
                id
            ],
            (err, livro) => {
                if(err){
                    console.log(err);
                    return reject('Não possível encontrar o livro!');
                }
                return resolve(livro);
            });
        });
    }

    atualiza(livro){
        return new Promise((resolve, reject) => {
            this._db.run(`
                UPDATE LIVROS SET
                titulo = ?,
                preco = ?,
                descricao = ?
                WHERE id = ?
            `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            (err) => {
                if(err){
                    return reject('Não foi possível atualizar o livro!');
                }
                resolve();
            });
        });
    }
}

module.exports = LivroDao;