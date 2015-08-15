jQuery.fn.getFormDataJSON = function() {
    var jsonData = {};
    $.each($(this).serializeArray(), function(i, jsonObject) {
        jsonData[jsonObject.name] = jsonObject.value;
    });
    return JSON.stringify(jsonData);
}