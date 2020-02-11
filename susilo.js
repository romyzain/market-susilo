var arrProduct = [
    { id: 1579581080923, category: 'Fast Food', name: 'Noodle', price: 3500, stock: 9},
    { id: 1579581081130, category: 'Electronic', name: 'Headphone', price: 4300000, stock: 8},
    { id: 1579581081342, category: 'Cloth', name: 'Hoodie', price: 300000, stock: 7},
    { id: 1579581080977, category: 'Fruit', name: 'Apple', price: 10000, stock: 8},
]

var arrCategory = ['All', 'Fast Food', 'Electronic', 'Cloth', 'Fruit']

var showMenu = (idProduct) => {
    var listMenu = arrProduct.map((elem,index,) => {
        if(elem.id === idProduct){
        return (
            `
        <tr>
            <td>${elem.id}</td>
            <td><input type="text" value="${elem.name}" id="editNama"></td>
            <td>${elem.category}</td>
            <td><input type="number" value="${elem.price.toLocaleString(('id-ID'))}" id="editPrice"></td>
            <td><input type="number" value="${elem.stock}" id="editStock"></td>
            <td><input type="button" value="Cancel" onclick="cancelData()"></td>
            <td><input type="button" value="Save" onclick="SaveData(${index})"></td>
        </tr>

            `
        )}
        return(
            `
        <tr align="center">
            <td>${elem.id}</td>
            <td>${elem.name}</td>
            <td>${elem.category}</td>
            <td>${elem.price.toLocaleString(('id-ID'))}</td>
            <td>${elem.stock}</td>
            <td><input type="button" value="Add" onclick="buyStock(${elem.id})"></td>
            <td><input type="button" value="Delete" onclick="deleteData(${elem.id})"></td>
            <td><input type="button" value="Edit" onclick="editData(${elem.id})"></td>
        </tr>
            `   
        )
    })

    document.querySelector('#output').innerHTML = listMenu.join('')

    var listOption = arrCategory.map((elem) => {
        return (
            `
                <option value="${elem}">${elem}</option>
            `
        )
    })
    document.querySelector('#categoryInput').innerHTML = listOption.join('')
    document.querySelector('#categoryInput2').innerHTML = listOption.join('')
}

var addData = () => {
    var nama = document.querySelector('#nama').value;
    var harga = document.querySelector('#harga').value;
    var stock = document.querySelector('#stock').value;
    var category = document.querySelector('#categoryInput').value;
    var time = new Date()

    var newProduct = {
        id: time.getTime(),
        name: nama,
        price: harga,
        stock,
        category
    }

    arrProduct.push(newProduct)
    showMenu()
}

var showFilterResult = (hasilFilter) => {
    var result = hasilFilter.map((val) => {
        return (
            `
                <tr>
                    <td>${val.id}</td>
                    <td>${val.name}</td>
                    <td>${val.category}</td>
                    <td>${val.price.toLocaleString(('id-ID'))}</td>
                    <td>${val.stock}</td>
                    <td><input type="button" value="Add" onclick="buyStock(${val.id})"></td>
                </tr>
            `
        )
    })
    return document.getElementById('output').innerHTML = result.join('')
}

var filterNama = () => {
    var namaInput =  document.querySelector('#namaFilter').value
    console.log(namaInput)
    var output = arrProduct.filter((val) => {
        return val.name.toUpperCase().includes(namaInput.toUpperCase())
    })
    showFilterResult(output)
}


var filterHarga = () => {
    if(document.querySelector('#hargaMin').value && document.querySelector('#hargaMax').value){
        var hargaMin = document.querySelector('#hargaMin').value
        var hargaMax = document.querySelector('#hargaMax').value
        var output = arrProduct.filter((val) => {
            return val.price >= hargaMin && val.price <= hargaMax
        })
    showFilterResult(output)
    }
}

var filterCategory = () => {
    var category = document.querySelector('#categoryInput2').value
    if(category === 'All'){
        showMenu()
    }else{
        var output = arrProduct.filter((val) => {
            return val.category === category
        })
        showFilterResult(output)
    }
}

var deleteData = (idProduct) => {
    console.log(idProduct)
    arrProduct = arrProduct.filter((val) => {
        return val.id !== idProduct

    })
    showMenu()
}

var editData = (id) => {
    showMenu(id)
}

var cancelData = () =>{
    showMenu()

}

var SaveData =(index) => {
    // var nama=document.getElementById('editNama').value
    // var price=document.getElementById('editPrice').value
    // var nama=document.getElementById('editStock').value
    arrProduct[index].name =document.getElementById('editNama').value
    arrProduct[index].price =document.getElementById('editPrice').value
    arrProduct[index].stock =document.getElementById('editStock').value
    // arrProduct[index],- {
    // name : nama,
    // price,
    // stock
    // }
     showMenu()
}

var showCart = (arr) => {
    var cartMenu = arr.map((elem, index) => {
        return (
            `
                 <tr>
                    <td>${elem.id}</td>
                    <td>${elem.name}</td>
                    <td>${elem.category}</td>
                    <td>${elem.price}</td>
                    <td><input type="button" value="Remove" onclick="deleteCart(${index})"></td>
                </tr>
            `
        )
    })
    return document.getElementById('Cart').innerHTML = cartMenu.join('')
}

var buyProduct = []

var buyStock = (idProduk) => {
    for(i=0;i<arrProduct.length;i++) {
        if(arrProduct[i].id === idProduk){
            buyProduct.push(arrProduct[i])
        }
    }showCart(buyProduct)
}

var deleteCart = (id) => {
    buyProduct.splice(id, 1)
    showCart(buyProduct)
}

var resetFilter = () => {
    document.querySelector('#namaFilter').value = ''
    document.querySelector('#hargaMax').value = ''
    document.querySelector('#hargaMin').value = ''
    document.querySelector('#categoryInput2').value = 'All'
    showMenu()
}

showMenu()