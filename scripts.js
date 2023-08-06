document.getElementById("sex-1").addEventListener("click", function(){ sex_check("sex-1") });
document.getElementById("sex-2").addEventListener("click", function(){ sex_check("sex-2") });
document.getElementById("sex-3").addEventListener("click", function(){ sex_check("sex-3") });
document.getElementById("button").addEventListener("click", Gen);


function pesel_control(pesel){
    weight_table = [1,3,7,9,1,3,7,9,1,3]
    control_number = 0;
    for (let i = 0; i < pesel.length; i++){
        control_number += parseInt(pesel[i])*weight_table[i];
    }
    if (control_number % 10 == 0){
        return 0
    }
    else{
        return 10 - (control_number % 10);
    }
}
function pesel_check(pesel){
    if (pesel_control(pesel) == pesel[10]){
        return true;
    }
    else{
        return false;
    }
}
function pesel_recover(pesel){
    pesel_list = pesel.split("");
    missing_index = pesel_list.indexOf("#");
    //console.log(missing_index);
    for (var i = 0; i < 10; i++){
        pesel_list[missing_index] = i;
        pesel_temp = pesel_list.join("");
        if (pesel_check(pesel_temp) == true){
            //console.log(missing_index,i);
            return pesel_temp;
        }
    }
    return "error";
}

//day month year gender
//gender 0-female 1-male
function pesel_first_list(d,m,y){
    y_string = String(y);
    if (d < 10){
        d_string = "0" + String(d);
    }
    else{
        d_string = String(d);
    }

    if (m < 10){
        m_string = "0" + String(m);
    }
    else{
        m_string = String(m);
    }
    bruh = 0;
    if (y >= 1800 && y <= 1899){
        bruh = 8;
    }
    if (y >= 2000 && y <= 2099){
        bruh = 2;
    }
    if (y >= 2100 && y <= 2199){
        bruh = 4;
    }
    if (y >= 2200 && y <= 2299){
        bruh = 6;
    }

    pesel_list = [y_string[2],y_string[3],String(parseInt(m_string[0])+bruh),m_string[1],d_string[0],d_string[1]]
    return pesel_list;
}

//day month year gender control
//gender 0-female 1-male
function pesel_find(d,m,y,g,c){
    pesel_list = pesel_gen(d,m,y);
    pesel_string = pesel_list[0] + pesel_list[1] + pesel_list[2] + pesel_list[3] + pesel_list[4] + pesel_list[5];
    pesel_string2 = ""
    random_string = ""
    count = 0
    for (var j = g; j < 10; j+=2){
        for (var i = 0; i < 1000; i++){
            pesel_string2 = ""
            random_string = String(i);
            while (random_string.length < 3){
                random_string = "0" + random_string;
            }
            //console.log(random_string);
            pesel_string2 = pesel_string + random_string + j + c;
            //console.log(pesel_string2);
            if (pesel_check(String(pesel_string2))){
                //console.log(pesel_string2);
                count += 1;
            }
            
        }
    }
    console.log(count)
}

function sex_check(input_name){
    if (document.getElementById(input_name).checked == true){
        document.getElementById("sex-1").checked = false;
        document.getElementById("sex-2").checked = false;
        document.getElementById("sex-3").checked = false;
        document.getElementById(input_name).checked = true;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//options = [date, gender]
//if date == null => date = random
//if gender == null => gender = random
function pesel_gen(options){
    let pesel_list = [];
    let date = [0,0,0];
    if (options[0] == null){
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        random_date_timestamp = getRandomIntInclusive(0,timestamp);
        const random_date = new Date(random_date_timestamp);
        date = [random_date.getDate(),random_date.getMonth(),random_date.getFullYear()];
    }
    else{
        date = options[0];
    }

    let gender;
    if (options[1] == null){
        gender = getRandomIntInclusive(0,9);
    }
    if (options[1] == "male"){
        gender = getRandomIntInclusive(0,4) * 2 + 1; 
    }
    if (options[1] == "female"){
        gender = getRandomIntInclusive(0,4) * 2;
    }

    pesel_list= pesel_list.concat(pesel_first_list(date[0],date[1],date[2]));
    pesel_random_3dig = [String(getRandomIntInclusive(0,9)),String(getRandomIntInclusive(0,9)),String(getRandomIntInclusive(0,9))];
    pesel_list = pesel_list.concat(pesel_random_3dig);
    pesel_list.push(String(gender));
    
    const control = pesel_control(pesel_list);
    //console.log(pesel_list);
    pesel_list.push(String(control));
    pesel_string = ""
    for (let i = 0; i < pesel_list.length; i++){
        pesel_string += pesel_list[i];
    }

    let sex;
    if (pesel_list[9] % 2 == 0){
        sex = "kobieta";
    }
    else{
        sex = "mężczyzna";
    }

    return [pesel_string, date, sex];
}

function Gen(){
    console.log(document.getElementById("output").value);
    let options = [0,0];
    const date_input = document.getElementById("date-1").value;
    if (date_input == ""){
        options[0] = null
    }
    else{
        const date = date_input.split("-");
        options[0] = [parseInt(date[2]),parseInt(date[1]),parseInt(date[0])];
    }

    if (document.getElementById("sex-1").checked){
        options[1] = "male"
    }
    else if (document.getElementById("sex-2").checked){
        options[1] = "female"
    }
    else if (document.getElementById("sex-3").checked){
        options[1] = null
    }

    let gen = pesel_gen(options)
    let output = gen[0] + " " + gen[1][0] + "-" + gen[1][1] + "-" + gen[1][2] + " " + gen[2] + "\n";
    for (let i = 0; i < parseInt(document.getElementById("pesel_num").value) - 1; i++){
        gen = pesel_gen(options)
        output += gen[0] + " " + gen[1][0] + "-" + gen[1][1] + "-" + gen[1][2] + " " + gen[2] + "\n";
    }

    console.log(output);
    document.getElementById("output").innerHTML = output;
}