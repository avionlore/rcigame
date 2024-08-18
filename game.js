

const zoneTypes = Object.freeze({
    Residantial: "Residantial",
    Commercial: "Commercial",
    Industry: "Industry",
});

let zones = {
    R: {
        name: "Residential",
        type: zoneTypes.Residantial,
        baseCost: 1,
        costMultiplicator: 1.5,
        owned: 0,
    },
};


let loadObject = {};
let gameObject = {
    credits: {name: "credits", value: 0},
    creditsBaseIncome: {name: "creditsBaseIncome", value: 1},
    maxZones: 10,
};

let gameIds = {
    gameContainer: "gameContainer",
    creditValue: "creditValue",
};

function setGameObject(key, value)
{
    if(!(key in gameObject)) { return; }
    if(key in loadObject) { gameObject[key].value = loadObject[key].value; return;}
    gameObject[key].value = value;
};

function mainScreen()
{
    const mainContainer = document.getElementById(gameIds.gameContainer);


    mainContainer.appendChild(creditContainer());
    mainContainer.appendChild(inventoryContainer());
    mainContainer.appendChild(buyZonesContainer());
};

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

};

function inventoryContainer()
{
    const container = document.createElement("p");
    for (const key in zones) {
        const zone = zones[key];
        const zoneContainer = document.createElement("p");
        zoneContainer.textContent = `${zone.name}: ${zone.owned}`
        container.appendChild(zoneContainer);
    }

    return container;
}

function buyZonesContainer()
{
    const container = document.createElement("p");
    for (const key in zones) {
        const zone = zones[key];
        const buyZoneButton = document.createElement("button");
        const zoneCost = getZoneCost(zone);
        buyZoneButton.innerText = `Buy ${zone.name} (${zoneCost})`;
        buyZoneButton.addEventListener('click', function(){
            buyZone(zone, 1);
        });
        container.appendChild(buyZoneButton);
    }

    return container;
}

function getZoneCost(zone)
{
    let zoneCost = 0;
    zoneCost = zone.costMultiplicator * zone.owned;
    if(zoneCost<1) { zoneCost = 1};
    return zoneCost;
}

function buyZone(zone, number)
{
    const zoneCost = getZoneCost(zone);
    if(!canAfford(zoneCost, number))
    {
        return false;
    }

    zone.owned+=number;
    gameObject.credits.value-= (zoneCost*number);
}

function canAfford(cost, number)
{
    if((cost * number) <= gameObject.credits.value) { return true};
    return false;
}

function updateCredits()
{
    setGameObject(gameObject.credits.name, gameObject.credits.value + gameObject.creditsBaseIncome.value);
    document.getElementById(gameIds.creditValue).innerHTML = gameObject.credits.value;
};

function gameUpdate()
{
    console.log("Tick");
    updateCredits();
};

mainScreen();

setInterval(() => {
    gameUpdate();

  }, 1000);