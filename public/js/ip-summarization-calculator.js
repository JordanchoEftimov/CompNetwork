function add() {
    $('#form-summarization').append('<br/><input type="text" class="form-control ip-address" aria-describedby="input" required autocomplete = "off" /> ');
}

function summarize() {
    let ip_addresses = $(".ip-address");
    
    //validating ip adresses
    let flag = 0;
    let ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    for (let i = 0; i < ip_addresses.length; i++) {
        if (!ip_addresses[i].value.match(ipformat)) {
            ip_addresses[i].style.borderColor = "red";
            flag = 1;
        } else {
            ip_addresses[i].style.borderColor = "green";
        }
    }
    if (flag === 1) {
        alert("Внесовте невалидна IP адреса!");
        return;
    }


    

    //printing the summarized route
    document.getElementById("summar-ip-addr").value;
}