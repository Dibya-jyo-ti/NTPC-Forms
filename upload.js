var ind = 0;
var cnt = 0;
var str = "";
var Items = [];
var Attrs = [];


function createForm()
{
    str += "<html>\n\t<head>\n\t\t<title>"+document.getElementById("form-name").value+"</title>\n\t";
    str += "\t<meta charset='UTF-8'></meta>\n\t"+
            "\t<meta http-equiv='X-UA-Compatible' content='IE=edge'>\n\t"+
            "\t<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n\t"+
            "\t<link rel='stylesheet' type='text/css' href='styles/style.css' />\n\t"+
            "\t<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi' crossorigin='anonymous'>\n\t"+
            "</head>\n\t<body>\n\t\t";
    str += "<form method = 'post' action='../submit-form.php'>\n\t\t";
    do
    {
        if(hidden[ind][0])
            continue;
        if(modules[ind][1].length < 1) //Adding labels
        {
            Items[cnt]="Label-"+cnt;
            Attrs[cnt]="";
            str += "\t<label name='"+Items[cnt]+"'>"+text[ind][0]+"</label>";
            str += "</br>\n\t\t";
        }
        else if(modules[ind][2][0].length > 8 && modules[ind][2][0].substring(0,8) === "Text-Box") //Adding textboxes
        {
            Items[cnt]="Textbox-"+cnt;
            Attrs[cnt]=text[ind][0];
            str += "\t<label>"+Attrs[cnt]+"</label></br>\n\t\t";
            str += "\t<input type='text' name='"+Items[cnt]+"' placeholder ='"+text[ind][2][0]+"'/>";
            str += "</br></br>\n\t\t";
        }
        else if(modules[ind][2][0].length > 9 && modules[ind][2][0].substring(0,9) === "Text-Area") //Adding textareas
        {
            Items[cnt]="Textarea-"+cnt;
            Attrs[cnt]=text[ind][0];
            str += "\t<label>"+Attrs[cnt]+"</label></br>\n\t\t";
            str += "\t<textarea name='"+Items[cnt]+"' placeholder ='"+text[ind][2][0]+"'></textarea>";
            str += "</br></br>\n\t\t";
        }
        else if(modules[ind][1].length > 8 && modules[ind][1].substring(0,8) === "Checkbox") //Adding checkbox groups
        {
            Items[cnt]="Checkbox-Set-"+cnt;
            Attrs[cnt]=text[ind][0];
            str += "\n\t<label>"+Attrs[cnt]+"</label></br>\n\t\t";
            for (var i = 0; i < modules[ind][2].length; i++)
            {
                if (hidden[ind][2][i])
                    continue;
                str += "\t<input type='checkbox' name='"+Items[cnt]+"' value='"+text[ind][2][i]+"'> "+text[ind][2][i]+"</br>\n\t\t";
            }
            str += "</br>\n\t\t";
        }
        else if(modules[ind][1].length > 11 && modules[ind][1].substring(0,11) === "Radiobutton") //Adding radiobutton groups
        {
            Items[cnt]="Radio-Set-"+cnt;
            Attrs[cnt]=text[ind][0];
            str += "\n\t<label>"+Attrs[cnt]+"</label></br>\n\t\t";
            for (var i = 0; i < modules[ind][2].length; i++)
            {
                if (hidden[ind][2][i])
                    continue;
                str += "\t<input type='radio' name='"+Items[cnt]+"' value='"+text[ind][2][i]+"'> "+text[ind][2][i]+"</br>\n\t\t";
            }
            str += "</br>\n\t\t";
        }
        cnt++;
    }
    while(++ind <= num);
    str += "\t<input type='submit' value='submit' name='submit'/></br>\n\t\t";
    str += "</form>\n\t"+
            "\t<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js' integrity='sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3' crossorigin='anonymous'></script>\n\t"+
            "</body>\n</html>";
    post(str,"form-code");

    var fs = require('fs');
    if (!fs.access("../forms/"+folderName))
        fs.mkdir("../forms/"+folderName);
    fs.writeFile("../forms/"+folderName+"/"+formName+".php", str, function(err){if (err) console.log(err);});
    // for (var i = 0; i < cnt; i++)
    // {

    // }
}
function post(data, name)
{
    var elem = document.createElement("form");
    elem.hidden = true;
    //elem.setAttribute("id","form");
    elem.setAttribute("method","POST");
    elem.setAttribute("action","publish.php")
    // Set Attribute "Action" for form tag. action = "submit-form.php"
    if (typeof(data) == String)
    {
        var tmp = document.createElement("textarea");
        tmp.value = data;
        tmp.setAttribute("name",name);
        elem.appendChild(tmp);
    }

    var el = document.createElement("input");
    el.type = "submit";
    el.setAttribute("name","submit");
    elem.appendChild(el);
    elem.submit();
}