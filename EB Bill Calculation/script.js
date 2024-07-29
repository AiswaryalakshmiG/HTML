function calculateBills() {
    const periods = ["janfeb", "marapr", "mayjun", "julaug", "sepoct", "novdec"];
    const ratePerUnit = 4.80; // Rate in Indian Rupees
    const freeUnits = 100.0;

    let unitsConsumed = [];
    for (let period of periods) {
        let units = parseFloat(document.getElementById(period).value);
        if (isNaN(units)) {
            units = 0;
        }
        unitsConsumed.push(units);
    }

    let highestConsumption = Math.max(...unitsConsumed);
    let lowestConsumption = Math.min(...unitsConsumed);

    let highestPeriod = periods[unitsConsumed.indexOf(highestConsumption)].replace(/([a-z]+)([a-z])/gi, '$1-$2');
    let lowestPeriod = periods[unitsConsumed.indexOf(lowestConsumption)].replace(/([a-z]+)([a-z])/gi, '$1-$2');

    let bills = unitsConsumed.map(units => {
        let billableUnits = units - freeUnits;
        if (billableUnits < 0) billableUnits = 0;
        return billableUnits * ratePerUnit;
    });

    let billsOutput = periods.map((period, index) => {
        let formattedPeriod = period.replace(/([a-z]+)([a-z])/gi, '$1-$2');
        return `${formattedPeriod.charAt(0).toUpperCase() + formattedPeriod.slice(1)}: ₹${bills[index].toFixed(2)}`;
    }).join('<br>');

    document.getElementById('bills').innerHTML = `<strong>Electricity Bills for each period:</strong><br>${billsOutput}`;
    document.getElementById('highest').innerHTML = `<strong>Period with highest consumption:</strong> ${highestPeriod.charAt(0).toUpperCase() + highestPeriod.slice(1)} (${highestConsumption} units)`;
    document.getElementById('lowest').innerHTML = `<strong>Period with lowest consumption:</strong> ${lowestPeriod.charAt(0).toUpperCase() + lowestPeriod.slice(1)} (${lowestConsumption} units)`;
}
