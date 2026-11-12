
const readline = require('readline-sync');

function getCIDR(prompt) {
    while (true) {
        const cidr = Number(readline.question(prompt));

        if (Number.isInteger(cidr) && cidr >= 16 && cidr <= 30) {
            return cidr;
        }

        console.log("Invalid input. Enter a CIDR between /16 and /30.");
    }
}

function getDevices() {
    while (true) {
        const devices = Number(readline.question("Number of devices required: "));

        if (Number.isInteger(devices) && devices > 0) {
            return devices;
        }

        console.log("Please enter a positive whole number.");
    }
}

function subnetHostChecker() {
    console.log("\n===== SUBNET HOST CHECKER =====");

    const vpcCIDR = getCIDR("Enter VPC CIDR (example: 16): ");
    const subnetCIDR = getCIDR("Enter Subnet CIDR (example: 24): ");
    const devices = getDevices();

    console.log("\n===== RESULTS =====");

    if (subnetCIDR < vpcCIDR) {
        console.log("Subnet CIDR is NOT consistent with the VPC CIDR.");
        console.log("The subnet must have an equal or larger prefix number.");
        return;
    }

    console.log("Subnet CIDR is consistent with the VPC CIDR.");

    const totalIPs = Math.pow(2, 32 - subnetCIDR);
    const usableIPs = Math.max(0, totalIPs - 5);

    console.log("Total IP addresses: " + totalIPs);
    console.log("Usable IP addresses (after AWS reserves 5): " + usableIPs);

    if (usableIPs >= devices) {
        console.log("Subnet is SUFFICIENT for your devices.");
        console.log("Unused IP addresses: " + (usableIPs - devices));
    } else {
        console.log("Subnet is NOT SUFFICIENT for your devices.");
        console.log("Additional IP addresses needed: " + (devices - usableIPs));
    }
}

function computeEnvironmentSelector() {
    console.log("\n===== COMPUTE ENVIRONMENT SELECTOR =====");

    let appName = "";

    while (appName.trim() === "") {
        appName = readline.question("Application name: ");
        if (appName.trim() === "") {
            console.log("Application name cannot be empty.");
        }
    }

    let users;
    while (true) {
        users = Number(readline.question("Monthly users: "));
        if (Number.isInteger(users) && users >= 0) {
            break;
        }
        console.log("Enter a valid non-negative whole number.");
    }

    let budget;
    while (true) {
        budget = Number(readline.question("Monthly budget ($): "));
        if (Number.isFinite(budget) && budget >= 0) {
            break;
        }
        console.log("Enter a valid non-negative budget.");
    }

    let highAvailability = "";

    while (highAvailability !== "yes" && highAvailability !== "no") {
        highAvailability = readline.question(
            "High availability required? (yes/no): "
        ).toLowerCase().trim();

        if (highAvailability !== "yes" && highAvailability !== "no") {
            console.log("Please enter yes or no.");
        }
    }

    let architecture;

    if (users > 10000 || highAvailability === "yes") {
        architecture = "EC2 + Load Balancer + Auto Scaling";
    } else if (users >= 1000) {
        architecture = "EC2 + Load Balancer";
    } else {
        architecture = "Single EC2";
    }

    console.log("\n===== RECOMMENDATION =====");
    console.log("Application: " + appName);
    console.log("Monthly users: " + users);
    console.log("Monthly budget: $" + budget);
    console.log("High availability: " + highAvailability);
    console.log("Recommended architecture: " + architecture);

    if (budget < 1000 && architecture !== "Single EC2") {
        console.log("WARNING: Budget is under $1,000.");
        console.log("Recommended architecture requires more than one EC2.");
    }

    if (budget >= 1000 && budget <= 3000 &&
        architecture === "EC2 + Load Balancer + Auto Scaling") {
        console.log("WARNING: Budget is between $1,000 and $3,000.");
        console.log("Recommended architecture requires Auto Scaling.");
    }
}

function main()
 {
    let running = true;

    while (running) {
        console.log("\n================================");
        console.log("INFO 300 Infrastructure Decision Tool");
        console.log("================================");
        console.log("1. Subnet Host Checker");
        console.log("2. Compute Environment Selector");
        console.log("3. Exit");

        const choice = readline.question("Choose an option (1-3): ");

        if (choice === "1") {
            subnetHostChecker();
        } else if (choice === "2") {
            computeEnvironmentSelector();
        } else if (choice === "3") {
            running = false;
            console.log("Thank you for using the program!");
        } else {
            console.log("Invalid choice. Please select 1, 2, or 3.");
        }
    }
}

main();

