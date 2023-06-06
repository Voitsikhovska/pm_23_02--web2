/* eslint-disable spaced-comment */
/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
/* eslint-disable brace-style */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable prefer-const */
/* eslint-disable indent */
'use strict'

const portModel = new Port() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#port-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const portData = {}
        formData.forEach((value, key) => {
            portData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            portModel.Update(portData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            portModel.Create(portData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#port-list').DataTable({
        data: portModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Country', data: 'country' },
            { title: 'Address', data: 'address'},
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 4
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('portsListDataChanged', function (e) {
        const dataTable = window.jQuery('#port-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})