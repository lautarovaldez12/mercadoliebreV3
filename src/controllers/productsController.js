const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


let descuentos = function(descuento,precio){
	let desc = (descuento / 100) * precio;
	return precio - desc

} 

const toThousand = n =>
        n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
        ".");



const controller = {
	// Root - Show all products
	root: (req, res) => {
		// Do the magic
		res.render('products',{
			products,
			descuentos,
			toThousand
		})

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let producto = products.find(productos => {
            return productos.id === Number(req.params.id)
        })
 
       

        

        
        res.render('detail', {
            producto,
            descuentos,
            toThousand
        })

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let lastId = 1
		products.forEach(producto => {
			if(producto.id > lastId){
				lastId = producto.id
			}
		});

		let {name,price,discount,category,description} = req.body;
		
		let producto = {
			id : Number(lastId + 1),
			name,
			price,
			discount,
			category,
			description
		}

		products.push(producto);
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2), 'utf-8');
		res.redirect('/');



	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let producto = products.find(productos => {
            return productos.id === Number(req.params.id)
		})
		
		res.render('product-edit-form',{
			producto
		})

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		
		let {name,price,discount,category,description} = req.body;

		products.forEach(producto => {
			if(producto.id === Number(req.params.id)){
				producto.name = name;
				producto.price = price;
				producto.discount = discount;
				producto.category = category;
				producto.description = description;

			}
		});

		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2), 'utf-8');
		res.redirect('/');

		

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		products.forEach(producto => {
			if(producto.id === Number(req.params.id)){
				let productDelete = products.indexOf(producto);
				products.splice(productDelete,1);

			}
		});
		fs.writeFileSync(productsFilePath,JSON.stringify(products,null,2), 'utf-8');
		res.redirect('/');

	}
};

module.exports = controller;