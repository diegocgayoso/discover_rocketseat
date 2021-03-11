// MODAL =  Abri e fecha formulário de novas transações
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

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("my.bolso:transactions")) || []
        console.log(localStorage)
    },
    set(transactions) {
        localStorage.setItem("my.bolso:transactions", JSON.stringify(transactions))
    }
}

// 
const Operactions = {
    all: Storage.get()
    //     [
    //     {
    //         description: 'FreeLancer',
    //         amount: 50000,
    //         date: '12/12/2020'
    //     },
    //     {
    //         description: 'exemplo',
    //         amount: 22200,
    //         date: '11/12/2020'
    //     },
    //     {
    //         description: 'exemplo',
    //         amount: -50.00,
    //         date: '13/12/2020'
    //     }
    // ]
    ,
    add(transaction){
        Operactions.all.push(transaction)

        App.reload()
    },
    remove(index){
        Operactions.all.splice(index, 1)

        App.reload()
    },
    incomes() {
        let income = 0; 
        Operactions.all.forEach(transaction => {
            if(transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;

    },
    expense() {
        let expense = 0; 
        Operactions.all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },
    total() {
         
        return Operactions.incomes() + Operactions.expense(); 
    },
}

// Inserir no HTML - DOM
const insertHTML = {
    // Pegando elemento HTML
    transactionsContainer: document.querySelector('#data-table tbody'),

    // Adicionar transação
    addTransaction(transactions, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = insertHTML.innerHTMLTransaction(transactions, index)
        tr.dataset.index = index

        insertHTML.transactionsContainer.appendChild(tr)
    },
    // 
    innerHTMLTransaction(transactions, index) {
        
        // Comparando o amount
        const addClass = transactions.amount > 0 ?"income":"expense"


        const amount = Utils.formatCurrency(transactions.amount)

        const html = 
                `<td class="description">${transactions.description}</td>
                <td class="${addClass}">${amount}</td>
                <td class="date">${transactions.date}</td>
                <td><img onclick="Operactions.remove(${index})" src="./assets/minus.svg" alt=""></td>
                `
            return html
    },
    //
    updateBalance() {
        document.querySelector('#incomeDisplay')
        .innerHTML = Utils.formatCurrency(Operactions.incomes())
        document.querySelector('#expenseDisplay')
        .innerHTML = Utils.formatCurrency(Operactions.expense())
        document.querySelector('#totalDisplay')
        .innerHTML = Utils.formatCurrency(Operactions.total())
    },
    // 
    clearTransactions() {
        insertHTML.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100
        return value
    },
    formatDate(date){
        const splitteDate =date.split("-")
        return `${splitteDate[2]}/${splitteDate[1]}/${splitteDate[0]}`
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g,"")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        })
        return signal + value

    }
}

const Form = {
    description:  document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    // 
    getValues(){
        return {    
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },
    // 
    validateFields() {
        const { description, amount, date} = Form.getValues()

        if (
            description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "")
                {   throw new Error("Por favor, preencha todos os campos.")
                }
    },
    // 
    formateValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)
        
        date = Utils.formatDate(date)
        
        return {
            description,
            amount,
            date
        }
    },
    // 
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },
    // 
    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()
            
            const transaction = Form.formateValues()
            
            Operactions.add(transaction)

            Form.clearFields()

            Modal.close()
            
        } catch (error) {
            alert(error.message)
        }

    }
}



const App = {
    init () {
        Operactions.all.forEach((transaction, index) =>{
            insertHTML.addTransaction(transaction, index)
        })
        insertHTML.updateBalance()
        Storage.set(Operactions.all)
    },
    reload () {
        insertHTML.clearTransactions()
        App.init()
    }
}

App.init()







