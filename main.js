/**
 * Created by Wagle on 12/9/2018.
 */


// JSON data retrieval
let data = {
    resource_id: '38625c3d-5388-4c16-a30f-d105432553a4', // the resource id
    //limit: 5,
    q: 'ky' // query for state 'ky'
};
$.ajax({

    url: 'https://inventory.data.gov/api/action/datastore_search',
    data: data,
    dataType: 'json',
    success: function(data) {

        // Create the table upon successful ajax call
        var tblSect = document.getElementById('tablesection'),
         tbl = document.createElement('table'),
         thead = document.createElement('thead'),
         thr = document.createElement('tr'),
         thColmns = ['Name', 'Title', 'Phone', 'Web Addr'],
         tbody = document.createElement('tbody');

        var searchSect = document.createElement('div');
        searchSect.setAttribute('id', 'searchSect');
        tblSect.appendChild(searchSect);

        // create and add search bar to table section
        var searchBar = document.createElement('input');
        searchBar.setAttribute('type', 'text');
        searchBar.setAttribute('id', 'searchInput');
        searchBar.setAttribute('onkeyup', 'searchFunction()');
        searchBar.setAttribute('placeholder', 'Search...');
        searchSect.appendChild(searchBar);

        // create search filter
        var searchBy = document.createElement('select');
        var options = '<option value="0">Name</option><option value="1">Title</option><option value="2">Phone</option><option value="3">Web</option>';
        searchBy.setAttribute('id', 'searchBy');
        searchBy.innerHTML = options;
        searchSect.appendChild(searchBy);


        // add class name for sorting function
        tbl.setAttribute("id", "table");
        tbl.classList.add('sortable');

        // add created table tags
        tblSect.appendChild(tbl);
        tbl.appendChild(thead);
        thead.appendChild(thr);
        tbl.appendChild(tbody);

        // create table header items
        thColmns.forEach(function(item){
            var h = document.createElement('th');
            h.appendChild(document.createTextNode(item));
            thr.appendChild(h);
        });

        // create array of each record then create table rows and data
        for (i = 0; i < data.result.records.length; i++) {

            var tr = document.createElement('tr');
            tbody.appendChild(tr);

            var contentArray = [data.result.records[i].CHFNM, data.result.records[i].CHFTITLE, data.result.records[i].GENTELE, data.result.records[i].WEBADDR];

            contentArray.forEach(function(item){

                var t = document.createElement('td');
                t.appendChild(document.createTextNode(item));
                tr.appendChild(t);

            });

        }

        // use sortable script
        var newTableObject = document.getElementById('table');
        sorttable.makeSortable(newTableObject);

    },

});


function searchFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    var searchByTag = document.getElementById('searchBy');
    var searchOption = searchByTag.options[searchByTag.selectedIndex].value;

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[searchOption];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

