// Function to display the selected section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Function to display the selected tool for productivity
function showTool(toolId) {
    document.querySelectorAll('.tool').forEach(tool => {
        tool.style.display = 'none';
    });
    document.getElementById(toolId).style.display = 'block';
}

// Function to calculate Excavator Productivity
function calculateExcavatorProductivity() {
    const bucketVolume = parseFloat(document.getElementById("bucketVolumeExcavator").value);
    const efficiencyFactor = parseFloat(document.getElementById("efficiencyFactorExcavator").value);
    const cycleTime = parseFloat(document.getElementById("cycleTimeExcavator").value);
    const workHours = parseFloat(document.getElementById("workHoursExcavator").value);

    if (bucketVolume && efficiencyFactor && cycleTime && workHours) {
        const productivity = (bucketVolume * efficiencyFactor * 60) / cycleTime * workHours;
        document.getElementById("resultExcavator").textContent = `Produktivitas Excavator: ${productivity.toFixed(2)} m³/hari`;
    } else {
        document.getElementById("resultExcavator").textContent = "Mohon isi semua parameter.";
    }
}

// Function to calculate Dump Truck Productivity
function calculateDumpTruckProductivity() {
    const truckCapacity = parseFloat(document.getElementById("truckCapacity").value);
    const efficiencyFactor = parseFloat(document.getElementById("efficiencyFactorTruck").value);
    const cycleTime = parseFloat(document.getElementById("cycleTimeTruck").value);
    const workHours = parseFloat(document.getElementById("workHoursTruck").value);

    if (truckCapacity && efficiencyFactor && cycleTime && workHours) {
        const productivity = (truckCapacity * efficiencyFactor * 60) / cycleTime * workHours;
        document.getElementById("resultDumpTruck").textContent = `Produktivitas Dump Truck: ${productivity.toFixed(2)} m³/hari`;
    } else {
        document.getElementById("resultDumpTruck").textContent = "Mohon isi semua parameter.";
    }
}

// Function to calculate Tool Requirements and Match Factor
function calculateToolRequirements() {
    const targetProduction = parseFloat(document.getElementById("targetProduction").value);
    const excavatorProductivity = parseFloat(document.getElementById("resultExcavator").textContent.split(': ')[1]);
    const truckProductivity = parseFloat(document.getElementById("resultDumpTruck").textContent.split(': ')[1]);

    if (targetProduction && excavatorProductivity && truckProductivity) {
        const excavatorsNeeded = targetProduction / excavatorProductivity;
        const trucksNeeded = targetProduction / truckProductivity;
        const matchFactor = truckProductivity / excavatorProductivity;

        document.getElementById("resultRequirements").textContent = `
            Jumlah Excavator yang Dibutuhkan: ${Math.ceil(excavatorsNeeded)}, 
            Jumlah Dump Truck yang Dibutuhkan: ${Math.ceil(trucksNeeded)}, 
            Match Factor: ${matchFactor.toFixed(2)}
        `;
    } else {
        document.getElementById("resultRequirements").textContent = "Mohon isi semua parameter dan hitung produktivitas terlebih dahulu.";
    }
}


