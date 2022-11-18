var val="";
var labelVal="";
const modules=[];
const internals=[];
const text=[];
var num = -1;
var del = false;
var foc;
var foc_i;
var act;
var labelEdit = true;
function addEvent() //Adds enter listener to editor panel
{
    document.getElementById("editor").addEventListener("keypress", function(event){
        if (event.key === "Enter" && document.activeElement === document.getElementById("editor"))
        {
            document.getElementById("editor").blur();
            document.getElementById(modules[foc][0]).focus();
            try{document.getElementById(modules[act][0]).style.backgroundColor = "";
            document.getElementById(modules[act][1]).style.backgroundColor = "";
            document.getElementById(modules[act][2][foc_i]).style.backgroundColor = "";}
            catch (error){;}
            foc = 0;
            foc_i = 0;
            act = 0;
            document.getElementById("editor").disabled = true;
        }
    });
}
function setEdit() //Sets edit component to label or item
{
    var temp;
    var elem = document.getElementById("label_select");
    if(!labelEdit)
    {
        temp = "Click to edit Item";
        elem.setAttribute("class", "btn btn-primary");
    }
    else
    {
        temp = "Click to edit Label";
        elem.setAttribute("class", "btn btn-danger");
    }
    labelEdit = !labelEdit;
    elem.innerHTML=temp;
    //getFocus(foc);
}
function enable(elem)
{
    document.getElementById(elem).disabled = false;
    document.getElementById(elem).hidden = false;
}
function disable(elem)
{
    document.getElementById(elem).disabled = true;
    document.getElementById(elem).hidden = true;
}
function addItem()
{
    if(modules[foc][1].substring(0,8) === "Checkbox")
        addCheckBox();
    else
        addRadioBtn();
}

function generate(type) //Generates all form components
{
    if(!labelEdit)
        setEdit();
    num++;
    if (document.getElementById("editor").disabled == true)
        document.getElementById("editor").disabled = false;
    elem = document.createElement("div");
    elem.setAttribute("class","module");
    elem.setAttribute("name", "div-"+(num+1));
    elem.setAttribute("id", "div-"+(num+1));
    document.getElementById("mid").appendChild(elem);
    if (type.toLowerCase() === "label")
    {
        genLabel("div-"+(num+1));
        modules[num][1] = "";
    }
    else if (type.toLowerCase() === "text")
        genText("div-"+(num+1));
    else if (type.toLowerCase() === "textarea")
        genTextAr("div-"+(num+1)); 
    else if (type.toLowerCase() === "checkbox")
        genCheck("div-"+(num+1));
    else if (type.toLowerCase() === "radiobutton")
        genRadio("div-"+(num+1));
    document.getElementById(modules[num][0]).click();
}



function genLabel(par) //Generates label of a form component
{
    //console.log(par);
    modules[num] = [];
    modules[num][0]="Label-"+(num+1);
    internals[num]="";
    text[num] = [];
    text[num][0]="";
    elem = document.createElement("div");
    elem.setAttribute("class","label");
    elem.setAttribute("name", modules[num][0]);
    elem.setAttribute("id", modules[num][0]);
    elem.setAttribute("onclick", "getFocus("+String(num)+")");
    elem.focus();
    elem.innerHTML = "Click to edit value.";
    document.getElementById(par).appendChild(elem);
    foc=num;
    document.getElementById("editor").value = "";
}

function genText(par) //Generates a textfield form component
{
    genLabel(par);

    modules[num][1]="Textfield-"+(num+1);
    modules[num][2]=[];
    modules[num][2][0]="Text-Box-"+(num+1);
    text[num][1]="";
    text[num][2]=[];
    text[num][2][0]="";
    
    el = document.createElement("div");
    el.setAttribute("name", modules[num][1]);
    el.setAttribute("id", modules[num][1]);
    el.setAttribute("onclick", "getFocus2("+String(num)+",0)");

    elem = document.createElement("input");
    elem.setAttribute("class","textfield form-control");
    elem.setAttribute("name", modules[num][2][0]);
    elem.setAttribute("id", modules[num][2][0]);
    elem.disabled=true;
    elem.setAttribute("placeholder", "Click to edit value.");

    el.appendChild(elem);
    document.getElementById(par).appendChild(el);
}

function genTextAr(par) //Generates a textarea form component
{
    genLabel(par);

    modules[num][1]="Textfield-"+(num+1);
    modules[num][2]=[];
    modules[num][2][0]="Text-Area-"+(num+1);
    text[num][1]="";
    text[num][2]=[];
    text[num][2][0]="";
    
    el = document.createElement("div");
    el.setAttribute("name", modules[num][1]);
    el.setAttribute("id", modules[num][1]);
    el.setAttribute("onclick", "getFocus2("+String(num)+",0)");

    elem = document.createElement("textarea");
    elem.setAttribute("class","textarea form-control");
    elem.setAttribute("name", modules[num][2][0]);
    elem.setAttribute("id", modules[num][2][0]);
    elem.disabled=true;
    elem.setAttribute("placeholder", "Click to edit value.");

    el.appendChild(elem);
    document.getElementById(par).appendChild(el);
}

function genCheck(par) //Generates a checkbox area form component
{
    genLabel(par);

    modules[num][1]="Checkbox-Set-"+(num+1);
    text[num][1]="";
    elem = document.createElement("div");
    elem.setAttribute("class","checkarea");
    elem.setAttribute("name", modules[num][1]);
    elem.setAttribute("id", modules[num][1]);
    modules[num][2] = [];
    text[num][1] = "";
    text[num][2] = [];
    internals[num] = [];
    document.getElementById(par).appendChild(elem);
    addCheckBox(modules[num][1]);
}
function addCheckBox(par) //Generates individual checkboxes
{
    //console.log(par);
    if (par === "SS" || par == undefined)
        par = modules[foc][1];
    //console.log(foc+" "+modules[foc][1]+" ["+modules+"]");
    if(modules[foc][1].length < 13 || modules[foc][1].substring(0,8) !== "Checkbox")
        return;
    l = modules[foc][2].length;
    modules[foc][2][l]="Checkbox-"+(foc+1)+"-"+(l+1);
    text[foc][2][l]="";
    elem = document.createElement("div");
    elem.setAttribute("class","checkbox");
    elem.setAttribute("id",modules[foc][2][l]);
    el = document.createElement("input");
    el.type = "checkbox";
    //el.setAttribute("class", "form-control");
    el.setAttribute("name", "Checkbox-"+(foc+1));
    el.setAttribute("id", modules[foc][2][l]+"-T");
    el.disabled = true;
    el.value = "";
    elem.appendChild(el);
    internals[foc][l] = elem.innerHTML + " ";
    elem.innerHTML = internals[foc][l]+"Click to edit value.";
    elem.setAttribute("onclick", "getFocus2("+foc+","+l+")");
    document.getElementById(par).appendChild(elem);
}

function genRadio(par) //Generates a radiobutton area form component
{
    genLabel(par);

    modules[num][1]="Radiobutton-Set-"+(num+1);
    text[num][1]="";
    elem = document.createElement("div");
    elem.setAttribute("class","radioarea");
    elem.setAttribute("name", modules[num][1]);
    elem.setAttribute("id", modules[num][1]);
    modules[num][2] = [];
    text[num][1] = "";
    text[num][2] = [];
    internals[num] = [];
    document.getElementById(par).appendChild(elem);
    addRadioBtn(modules[num][1]);
}
function addRadioBtn(par) //Generates individual radiobtns
{
    console.log(par);
    if (par == undefined)
        par = modules[foc][1];
    console.log(foc+" "+modules[foc][1]+" ["+modules+"]");
    if(modules[foc][1].length < 13 || modules[foc][1].substring(0,11) !== "Radiobutton")
        return;
    console.log("if crossed");
    l = modules[foc][2].length;
    modules[foc][2][l]="Radiobutton-"+(foc+1)+"-"+(l+1);
    text[foc][2][l]="";
    elem = document.createElement("div");
    elem.setAttribute("class","radiobutton");
    elem.setAttribute("id",modules[foc][2][l]);
    el = document.createElement("input");
    el.type = "radio";
    //el.setAttribute("class", "form-control");
    el.setAttribute("name", "Radiobutton-"+(foc+1));
    el.setAttribute("id", modules[foc][2][l]+"-T");
    el.disabled = true;
    el.value = "";
    elem.appendChild(el);
    internals[foc][l] = elem.innerHTML + " ";
    elem.innerHTML = internals[foc][l]+"Click to edit value.";
    elem.setAttribute("onclick", "getFocus2("+foc+","+l+")");
    document.getElementById(par).appendChild(elem);
}




function getFocus2(el, item) //When Item is clicked
{
    console.log("child triggered");
    getFocus(el);
    if (labelEdit)
        setEdit();
    foc_i = item;
    document.getElementById(modules[foc][1]).style.backgroundColor = "#ffffcc";
    document.getElementById(modules[foc][2][foc_i]).style.backgroundColor = "#ffe6e6";
    document.getElementById("editor").value = "";
    document.getElementById("editor").value = text[el][2][item];
    console.log("\t\t"+labelEdit);
}
function getFocus(el) //When label is clicked, or through getFocus2()
{
    if (document.getElementById("editor").disabled == true)
        document.getElementById("editor").disabled = false;
    console.log(foc);
    try{document.getElementById(modules[act][0]).style.backgroundColor = "";
        document.getElementById(modules[act][1]).style.backgroundColor = "";
        document.getElementById(modules[act][2][foc_i]).style.backgroundColor = "";}
    catch (error){;}
    foc = el;
    act = el;
    foc_i = -1;
    document.getElementById(modules[foc][0]).style.backgroundColor = "#ccf5ff";
    //console.log("\t"+foc+" "+text[el]);
    document.getElementById("editor").value = "";
    document.getElementById("editor").value = text[el][((labelEdit)?0:1)];
    if(!labelEdit)
        setEdit();
    if(modules[foc][1].length > 13 && (modules[foc][1].substring(0,8) === "Checkbox" || modules[foc][1].substring(0,11) === "Radiobutton"))
        enable("add_item");
    else
        disable("add_item");
    document.getElementById("editor").focus();
}



function edit()
{
    console.log("\t"+labelEdit);
    //console.log(foc + "\t" + modules[foc]);
    if (labelEdit)
    {
        text[foc][0] = document.getElementById("editor").value;
        var dat =  text[foc][0];
        document.getElementById(modules[foc][0]).innerHTML = dat;
        if (dat == "")
            document.getElementById(modules[foc][0]).innerText="<Empty>";
    }

    else if(modules[foc][1].length > 13 && (modules[foc][1].substring(0,8) === "Checkbox" || modules[foc][1].substring(0,11) === "Radiobutton"))
    {
        console.log("Checkbox triggered.");
        var dat = document.getElementById("editor").value;
        text[foc][2][foc_i] = dat;
        elem = document.getElementById(modules[foc][2][foc_i]+"-T");
        elem.parentNode.innerHTML = internals[foc][foc_i] + dat;
        if (dat == "")
            elem.parentNode.innerHTML = internals[foc][foc_i] + "Empty";
        elem.value = dat;
    }

    else
    {
        console.log("Textbox triggered.");
        text[foc][2][0] = document.getElementById("editor").value;
        text[foc][1] = text[foc][2][0];
        var dat =  text[foc][2][0];
        document.getElementById(modules[foc][2][0]).setAttribute("placeholder", dat);
    }

    document.getElementById("editor").focus();
}
