function calculate() {
    //getting the input - ip address
    let ip_address = document.getElementById("ip-address").value;

    //validating ip address
    let ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!ip_address.match(ipformat)) {
        errorMessage("Внесовте невалидна IP адреса!");
        document.getElementById("ip-address").value = "";
        document.getElementById("ip-address").classList.add("is-invalid");
        return;
    }
    document.getElementById("ip-address").classList.remove("is-invalid");
    document.getElementById("ip-address").classList.add("is-valid");

    //validating selection of a subnet mask
    let selection = document.getElementById("subnet").value;
    if (selection === "default") {
        errorMessage("Ве молиме изберете подмрежна маска од менито!");
        document.getElementById("subnet").classList.add("is-invalid");
        return;
    }
    document.getElementById("subnet").classList.remove("is-invalid");
    document.getElementById("subnet").classList.add("is-valid");

    //getting the selected subnet mask
    let index = document.getElementById("subnet");
    let subnet_mask = index.options[index.selectedIndex].text;

    //getting the selected subnet mask without the CIDR notation
    let parts = subnet_mask.split("/");
    let subnet_without_CIDR = parts[0];

    //getting the CIDR notation
    let CIDR = parts[1];

    //printing the ip address into the first field
    document.getElementById("ipaddr").value = ip_address;

    //printing the dot decimal notation of the subnet mask
    document.getElementById("subnet-mask").value = subnet_without_CIDR;

    //printing the CIDR notation
    document.getElementById("cidr-notation").value = "/" + CIDR;

    //getting the binary notation of the subnet mask
    let decimals = subnet_without_CIDR.split(".");
    let octet1 = parseInt(decimals[0]).toString(2);
    let octet1leadingZeros = "00000000".substr(octet1.length) + octet1;
    let octet2 = parseInt(decimals[1]).toString(2);
    let octet2leadingZeros = "00000000".substr(octet2.length) + octet2;
    let octet3 = parseInt(decimals[2]).toString(2);
    let octet3leadingZeros = "00000000".substr(octet3.length) + octet3;
    let octet4 = parseInt(decimals[3]).toString(2);
    let octet4leadingZeros = "00000000".substr(octet4.length) + octet4;

    //printing the binary notation of the subnet mask
    document.getElementById("subnet-mask-binary").value = octet1leadingZeros + "." + octet2leadingZeros + "." + octet3leadingZeros + "." + octet4leadingZeros;

    //calculating total number of hosts
    let total_hosts = Math.pow(2, 32 - parseInt(CIDR));
    document.getElementById("total-hosts").value = total_hosts;

    //calculating number of available hosts
    let usable_hosts = total_hosts - 2; //for network and broadcast
    if (usable_hosts < 0) {
        usable_hosts = 0;
    }
    document.getElementById("usable-hosts").value = usable_hosts;

    //determining the class of the ip address
    let inputParts = ip_address.split(".");
    let firstOctet = parseInt(inputParts[0]);
    if (firstOctet >= 0 && firstOctet <= 126) {
        document.getElementById("ip-class").value = "A";
    }
    if (firstOctet >= 128 && firstOctet <= 191) {
        document.getElementById("ip-class").value = "B";
    }
    if (firstOctet >= 192 && firstOctet <= 223) {
        document.getElementById("ip-class").value = "C";
    }
    if (firstOctet >= 224 && firstOctet <= 239) {
        document.getElementById("ip-class").value = "D";
    }
    if (firstOctet >= 240 && firstOctet <= 255) {
        document.getElementById("ip-class").value = "E";
    }

    //determining if the ip address is private or public
    firstOctet = parseInt(inputParts[0]);
    secondOctet = parseInt(inputParts[1]);
    if (firstOctet === 10 || firstOctet === 192 && secondOctet === 168 || firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) {
        document.getElementById("ip-type").value = "Приватна";
    } else {
        document.getElementById("ip-type").value = "Јавна";
    }

    //determining the network address
    let subnetMaskBinary = octet1leadingZeros + octet2leadingZeros + octet3leadingZeros + octet4leadingZeros;

    let inputOctet1 = parseInt(inputParts[0]).toString(2);
    let inputOctet1LeadingZeros = "00000000".substr(inputOctet1.length) + inputOctet1;
    let inputOctet2 = parseInt(inputParts[1]).toString(2);
    let inputOctet2LeadingZeros = "00000000".substr(inputOctet2.length) + inputOctet2;
    let inputOctet3 = parseInt(inputParts[2]).toString(2);
    let inputOctet3LeadingZeros = "00000000".substr(inputOctet3.length) + inputOctet3;
    let inputOctet4 = parseInt(inputParts[3]).toString(2);
    let inputOctet4LeadingZeros = "00000000".substr(inputOctet4.length) + inputOctet4;

    let inputAddrBinary = inputOctet1LeadingZeros + inputOctet2LeadingZeros + inputOctet3LeadingZeros + inputOctet4LeadingZeros;

    let networkAddr = "";
    for (let i = 0; i < inputAddrBinary.length; i++) {
        if (subnetMaskBinary[i] === "1") {
            networkAddr += inputAddrBinary[i];
        } else {
            networkAddr += "0";
        }
    }

    let firstOctetBinary = networkAddr.substring(0, 8);
    let secondOctetBinary = networkAddr.substring(8, 16);
    let thirdOctetBinary = networkAddr.substring(16, 24);
    let fourthOctetBinary = networkAddr.substring(24, 32);

    document.getElementById("networkaddr").value = parseInt(firstOctetBinary, 2) + "." + parseInt(secondOctetBinary, 2) + "." + parseInt(thirdOctetBinary, 2) + "." + parseInt(fourthOctetBinary, 2);

    //determining the broadcast address
    let broadcastAddr = "";
    for (let i = 0; i < parseInt(CIDR); i++) {
        broadcastAddr += networkAddr[i];
    }
    for (let i = parseInt(CIDR); i < 32; i++) {
        broadcastAddr += "1";
    }

    let firstOctetBroadcast = broadcastAddr.substring(0, 8);
    let secondOctetBroadcast = broadcastAddr.substring(8, 16);
    let thirdOctetBroadcast = broadcastAddr.substring(16, 24);
    let fourthOctetBroadcast = broadcastAddr.substring(24, 32);

    document.getElementById("broadcastaddr").value = parseInt(firstOctetBroadcast, 2) + "." + parseInt(secondOctetBroadcast, 2) + "." + parseInt(thirdOctetBroadcast, 2) + "." + parseInt(fourthOctetBroadcast, 2);

    //determining available host address range
    if (parseInt(CIDR) === 31 || parseInt(CIDR) === 32) {
        document.getElementById("host-range").value = "NA";
    } else {
        let firstAvailableHost = parseInt(firstOctetBinary, 2) + "." + parseInt(secondOctetBinary, 2) + "." + parseInt(thirdOctetBinary, 2) + "." + (parseInt(fourthOctetBinary, 2) + 1);
        let lastAvailableHost = parseInt(firstOctetBroadcast, 2) + "." + parseInt(secondOctetBroadcast, 2) + "." + parseInt(thirdOctetBroadcast, 2) + "." + (parseInt(fourthOctetBroadcast, 2) - 1)
        document.getElementById("host-range").value = firstAvailableHost + " - " + lastAvailableHost;
    }
}

function errorMessage(message) {
    // Get the modal
    var modal = document.getElementById("myModal");
    document.getElementById('mdBody').innerHTML = `
            <p>${message}</p>
        `

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 
    function showMessage() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    showMessage();
}