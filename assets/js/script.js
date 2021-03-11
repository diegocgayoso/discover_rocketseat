const Modal = {

    open() {
        // Abrir modal

        // Adicionar a class active ao modal

        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        // Fechar o Modal

        // Remover a class active no 
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

const btnNewTransition = document.querySelector("#btnTransition")

btnNewTransition.addEventListener("click", _ => {
    let transition = new Array();

    //Pegar os dados dos campos e tranformar e atribuir em variaveis
    const description = $('input[id=description]').val();
    const amount = $('input[name=amount]').val();
    const date = $('input[name=date]').val();

    // Pegar os dados e converter em strings
    const dataObj = JSON.stringify({ description, amount, date });

    // Verifica se existe no localStorage
    if (localStorage.hasOwnProperty("transition")) {
        // Converte de string para Object
        transition = JSON.parse(localStorage.getItem("transition"))

    };
    

    transition.push(dataObj);

    localStorage.setItem("transition", JSON.stringify(transition));
    
    

    
})





