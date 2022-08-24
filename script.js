const selectbtn = document.querySelectorAll("input[name=value-buttons]");
const reset = document.querySelector(".output-values__reset");
const bill = document.getElementById("bill--input");
const people = document.getElementById("number-of-people__input");
const customLabel = document.getElementById("custom-label");
const tip_amount = document.getElementById("tip-person");
const total_person = document.getElementById("total-person");
let percentage = -1;
const warn = document.querySelector(".warning");
const custom = document.getElementById("bcustom");


selectbtn.forEach(element => {
    element.addEventListener("click", event =>{
        if(bill.value == ""){
             bill_warning();
        }
        else if(people.value == ""){
            people_warning();
        }
        else{
            selectbtn.forEach(element => {
                element.classList.remove("checked");
            });
            event.target.classList.add("checked");

            if(event.target.id == "bcustom"){
                event.target.value = 1.00;
                customLabel.innerHTML = event.target.value + "%";
                percentage = event.target.value;
                tip();
            }
            else{
                const val = document.querySelector("#" + event.target.id+"+label");
                percentage = val.textContent;
                percentage = percentage.substring(0, percentage.length-1)
                tip(val.textContent);
            }
        }
    })
});


reset.addEventListener("click", ()=>{
    tip_amount.innerHTML = "$0.00";
    total_person.innerHTML = "$0.00";
    bill.value="";
    people.value= "";
    customLabel.innerHTML = "Custom"
    selectbtn.forEach(element => {
        element.classList.remove("checked");
    });
    percentage = -1;
})

people.addEventListener("input", event =>{
    if(people.value != 0){
    people.style.border = "transparent";
    warn.style.display = "none";
    if(percentage != -1)
        tip();
    }
    else{
        people_warning();
    }
})

custom.addEventListener("input", event =>{
    customLabel.innerHTML = event.target.value + "%";
    percentage = event.target.value;
    tip();
})

function tip(){
    if(percentage != 0){
    percentage *= 0.01;
    let money_person = bill.value / people.value;
    let tip_person = bill.value * percentage / people.value;
    tip_amount.innerText = "$" + tip_person.toFixed(2);
    total_person.innerHTML = "$" + (money_person + tip_person).toFixed(2);
    }

    check_reset();
}

function people_warning(){
    warn.style.display = "inline";
    people.style.border = "2px solid red";
}

function bill_warning(){
    alert("Insert a valid number");
}

function check_reset(){
    if(percentage > 0 && bill.value >= 0 && people.value>0){
        reset.classList.add("reset-active");
    }
    else
        reset.classList.remove("reset-active");

}
