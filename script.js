//seleciona os elementos do form.
const form = document.querySelector("form");    
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

amount.oninput = () => {
    let value = amount.value.replace(/\D/g, "")
    //transforma números pra centavos durante digitação, para evitar erros de formatação.
    value = Number(value) / 100
    amount.value = formatCurrency(value)
}

function formatCurrency(value) {
    value = value.toLocaleString('pt-BR',
        { style: 'currency', currency: 'BRL' });
    return value;
}
//Captura o evento de submit do form , obtendo os valores.
form.onsubmit =  (event) =>{
    //previne reload
    event.preventDefault();

    const newExpense ={
        id: new Date().getTime(),
        expense: expense.value,
        category_id:category.value,
        category_name:category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(""),

    }
    console.log(newExpense);
}