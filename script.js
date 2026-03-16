//seleciona os elementos do form.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");


//selectiona elementos da lista .
const expenseList = document.querySelector("ul");
const expensesQuantity = document.querySelector("aside header p span ");
const expensesTotal = document.querySelector("aside header h2");
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
form.onsubmit = (event) => {
    //previne reload
    event.preventDefault();

    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(""),

    }
    expenseAdd(newExpense);
}

//add novo item a lista
function expenseAdd(newExpense) {
    try {
        //cria elemento para adicionar o item (li).
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        //CRIA ícone E ENDEREÇO DINAMICO DA IMG
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        //cria div  
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info");

        //cria nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense;

        //cria categoria
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name;

        //cria valor
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        //ICONE DE REMOVER
        const expenseRemoveIcon = document.createElement("img");
        expenseRemoveIcon.classList.add("remove-icon");
        expenseRemoveIcon.setAttribute("src", `img/remove.svg`);
        expenseRemoveIcon.setAttribute("alt", "remover");


        //adiciona nome e categoria na div
        expenseInfo.append(expenseName, expenseCategory);
        //adiciona informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseRemoveIcon);

        //add item na lista
        expenseList.append(expenseItem);

        updateExpenseCount();
    }
    catch (error) {
        console.error("Erro ao adicionar despesa:", error);
        console.log(error)
    }
}

function updateExpenseCount() {
    try {
        const items = expenseList.children
        //navega até o elemento que exibe a quantidade de despesas


        //atualiza a quantidade de items da lista

        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`;

        let totalAmount = 0;
        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount")
            //remove caracteres não numéricos e substitui virgula por ponto para conversão correta
            let value = itemAmount.textContent.replace(/[^\d,]/g, '').replace(",", ".")


            //converte string para float
            value = parseFloat(value)

            //verifica numero valido
            if (isNaN(value)) {
                return alert("Não foi possivel calcular o total NAN.")
            }
            totalAmount += Number(value)


        }
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";
        totalAmount = formatCurrency(totalAmount).toUpperCase().replace("R$", "")
        

        expensesTotal.innerHTML = "";
        //adiciona simbolo da moeda e o valor total
        expensesTotal.append(symbolBRL, totalAmount);



    }


    catch (error) {
        console.error("Erro ao atualizar contagem de despesas:", error);
    }
}

