$(document).ready(function () {

    // inject ellipsis plugin into DataTable's api
    $.fn.dataTable.render.ellipsis = ellipsis;

    $('#table_id').DataTable({
        columnDefs: [{
            targets: 1,
            render: $.fn.dataTable.render.ellipsis(20, true)
        }]
    });
});