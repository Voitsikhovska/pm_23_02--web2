/* eslint-disable spaced-comment */
/* eslint-disable quote-props */
/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable brace-style */
/* eslint-disable keyword-spacing */
/* eslint-disable semi */
/* eslint-disable prefer-const */
/* eslint-disable indent */
'use strict'

const shipModel = new Ship() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#ship-add-form')
    form.addEventListener('submit', function (e) { // обробник подій на кожне натискання кнопки with submit(кнопки в паг файлах)
        e.preventDefault()

        const formData = new FormData(e.target) // беремо дані html форм і відправляємо їх
        const shipData = {}
        formData.forEach((value, key) => {
            shipData[key] = value
        })

        let hiddenInput = document.getElementById('update-item'); // оновити
        if(hiddenInput.value) {
            shipModel.Update(shipData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = ''; // очищуємо оновлені дані з форми
        }
        else {
            shipModel.Create(shipData); // створити
        }

        e.target.reset()
    })
}

function initList () { // block where data show разом з серч некст шов 10
    window.jQuery('#ship-list').DataTable({
        data: shipModel.Select(),
        columns: [
            { title: 'ID', data: 'id' }, // означую назви стовпців
            { title: 'Name', data: 'name' },
            { title: 'Country', data: 'country' },
            { title: 'Tonnage', data: 'tonnage' },
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
    document.addEventListener('shipsListDataChanged', function (e) {
        const dataTable = window.jQuery('#ship-list').DataTable()

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
function initDelete(row) {
    const formData = JSON.parse(row)
  
    itemModel.Delete(formData)
  }