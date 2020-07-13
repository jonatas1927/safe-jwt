
export default class SafeJwt {
    token = "";
    constructor(token: string) {
        if (token && token != this.token) {
            this.token = token;
            this.iniciaDb()
        }
    }


    request = indexedDB.open("safe-jwt", 1);
    conexao: any = null;
    iniciaDb = () => {
        const comp = this;
        this.request.onupgradeneeded = function (event: any) {
            let db = event.target.result;
            var store1 = db.createObjectStore("base1");
            store1.add({ token: comp.token, updated_at: new Date() }, 1);
        }

        this.request.onsuccess = function (event: any) {
            comp.conexao = event.target.result;
            console.log('conectado com sucesso a base de dados do safe-jwt')
        }

        this.request.onerror = function (event: any) {
            console.log(event.target.error)
        }
    }

    atualizaToken = (newToken: string) => {
        this.token = newToken;
        this.deletarToken();
        this.adicionaToken();
    }

    buscaToken = () => {
        // let tokenAtual: any;
        if (this.conexao) {
            let transaction = this.conexao.transaction(["base1"], "readwrite");
            let store = transaction.objectStore("base1");
            let cursor = store.openCursor();
            return cursor.onsuccess = (event: any) => {
                let atual = event.target.result;
                console.log(atual.value)
                if (atual && atual.value) {
                    // tokenAtual = ;
                    return atual.value;
                }
            };

            cursor.onerror = (event: any) => console.log(event.target.error.name);
        }
    }

    deletarToken = () => {
        var transaction = this.conexao.transaction(['base1'], 'readwrite');
        var objectStore = transaction.objectStore('base1');

        objectStore.openCursor().onsuccess = function (event: any) {
            var cursor = event.target.result;
            if (cursor) {
                if (cursor.value) {
                    var request = cursor.delete();
                    request.onsuccess = function () {
                        console.log('token removido');
                    };
                }
                cursor.continue();
            }
        };
    };
    adicionaToken = () => {
        let transaction = this.conexao.transaction(["base1"], "readwrite");
        var objectStore = transaction.objectStore('base1');
        objectStore.add({ token: this.token, updated_at: new Date() })
    }
}