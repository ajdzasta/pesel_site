function pesel_control(pesel10){
    pesel10_list = pesel10.split("");
    //console.log(pesel10_list);
    weight_table = [1,3,7,9,1,3,7,9,1,3]
    control_number = 0;
    for (var i = 0; i < pesel10_list.length; i++){
        control_number += parseInt(pesel10_list[i])*weight_table[i];
    }
    //console.log(control_number);
    if (control_number % 10 == 0){
        return 0
    }
    else{
        return 10 - (control_number % 10);
    }
}
function pesel_check(pesel){
    pesel10 = pesel.slice(0,10);
    if (pesel_control(pesel10) == pesel[10]){
        return 1;
    }
    else{
        return 0;
    }
}
function pesel_recover(pesel){
    pesel_list = pesel.split("");
    missing_index = pesel_list.indexOf("#");
    //console.log(missing_index);
    for (var i = 0; i < 10; i++){
        pesel_list[missing_index] = i;
        pesel_temp = pesel_list.join("");
        if (pesel_check(pesel_temp) == 1){
            //console.log(missing_index,i);
            return pesel_temp;
        }
    }
    return "error";
}
//day month year gender
//gender 0-female 1-male
function pesel_gen(d,m,y){
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
//console.log(pesel_list);
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