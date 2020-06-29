import api from './api'

class App{
    constructor(){
        this.button = document.getElementById('form-button').onclick = async () => {

            let cep = document.getElementById('form-cep');
            let divEl = document.querySelector('div#res');

            if(cep.length === 0){
                alert('Você deve preencher o campo do CEP')
                return;
            }
    
            this.setLoading(true);

            try{
                const response = await api.get(`${cep.value}/json/`);
                if(response.data.erro === true){
                    alert('CEP inexistente');
                    divEl.innerHTML = '';
                    cep.value = '';
                    cep.focus();

                }else{
                    this.render(response.data);
                }
            }catch(erro){
                console.warn('CEP inválido')
            }

            this.setLoading(false);

        }
    }

    render(objeto){
        let divEl = document.getElementById('res');
        divEl.innerHTML = '';

        let cidade = document.createElement('p');
        cidade.appendChild(document.createTextNode("Cidade: " + objeto.localidade))

        let bairro = document.createElement('p');
        bairro.appendChild(document.createTextNode('Bairro: ' + objeto.bairro))

        let logradouro = document.createElement('p');
        logradouro.appendChild(document.createTextNode('Logradouro:' + objeto.logradouro))

        divEl.appendChild(cidade);
        divEl.appendChild(bairro);
        divEl.appendChild(logradouro);
    }

    setLoading(loading = true){
        let divFormEl = document.querySelector('div#form');
        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');
            divFormEl.appendChild(loadingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }
}

new App();