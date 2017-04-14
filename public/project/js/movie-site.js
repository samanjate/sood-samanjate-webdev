function onClick(element) {
    document.getElementById("actor_photo").src = element.src;
    document.getElementById("modal").style.display = "block";
}

var index = $('#tabs a[href="#home"]').parent().index();
$('#tabs').tabs('select', index);
