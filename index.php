<!DOCTYPE html>
<html lang="en">
<head>
    <title>Project</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <script src="site.js"></script>
    <header>
        Some Text
    </header>

    <div class="row">
        <div class = "col-lg-3">
            <button class="btn btn-primary" id="label_select" onclick="setEdit();">Click to edit Item</button>
            <button class="btn btn-primary" id="add_item" onclick="addCheckBox();" disabled="true" hidden>Add Item</button>
        </div>

        <div class = "col-lg-4" id = "mid">
            <button class="btn btn-primary" onclick="generate('label');">Add Label</button>
            <button class="btn btn-primary" onclick="generate('text');">Add Textfield</button>
            <button class="btn btn-primary" onclick="generate('checkbox');">Add Check-Area</button>
            <!--<script>generate("label");</script>-->
        </div>

        <div class = "col-lg-3">
            <input type="text" id="editor" oninput="edit();" placeholder="Click to edit value." disabled="true"/>
            <script>addEvent();</script>
        </div>
    </div>

    
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script> 
</body>
</html>