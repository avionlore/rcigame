

let zoneTypes = {
    Residantial,
    Commercial,
    Industry,
}

let zones = {
    R: {
        name: "Residential",
        type: zoneTypes.Residantial,
        baseCost: 1,
        costMultiplicator: 1.5,
        owned: 0,
    },
}


let loadObject = {};
let gameObject = {
    credits: {name: "credits", value: 0},
    creditsBaseIncome: {name: "creditsBaseIncome", value: 1},
    maxZones: 10,
};

let gameIds = {
    gameContainer: "gameContainer",
    creditValue: "creditValue",
}

function setGameObject(key, value)
{
    if(!(key in gameObject)) { return; }
    if(key in loadObject) { gameObject[key].value = loadObject[key].value; return;}
    gameObject[key].value = value;
}

function mainScreen()
{
    const mainContainer = document.getElementById(gameIds.gameContainer);


    mainContainer.appendChild(creditContainer());
}

function creditContainer()
{
    const container = document.createElement("p");

    const text = document.createElement("p");
    text.textContent = "Credits: ";

    const value = document.createElement("p");
    value.id = gameIds.creditValue;

    container.appendChild(text);
    container.appendChild(value);

    return container;

}

function updateCredits()
{
    setGameObject(gameObject.credits.name, gameObject.credits.value + gameObject.creditsBaseIncome.value);
    document.getElementById(gameIds.creditValue).innerHTML = gameObject.credits.value;
}

function gameUpdate()
{
    console.log("Tick");
    updateCredits();
}

mainScreen();

setInterval(() => {
    gameUpdate();

  }, 1000);