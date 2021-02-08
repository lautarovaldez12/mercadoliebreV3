const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let descuentos = function(descuento,precio){
	let desc = (descuento / 100) * precio;
	return precio - desc

}

const controller = {
	root: (req, res) => {
		
		let productVisited = products.filter(producto => {
			return producto.category == "visited"
		});

		let productSale = products.filter(producto => {
			return producto.category == "in-sale"
		})

        let descuentos = function(descuento,precio){
            let desc = (descuento / 100) * precio;
            return precio - desc

        } 

        const toThousand = n =>
        n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,
        ".");

        
        res.render('index', {
			productVisited,
			productSale,
            descuentos,
            toThousand
        })
		
	},
	search: (req, res) => {
		// Do the magic
		
		
		let filterProducts = products.filter(producto => {
			return producto.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim())
		})

		res.render('results', {
			titulo : req.query.keywords,
			filterProducts,
			toThousand,
			descuentos
		})
		
		
		
		
	}
};

module.exports = controller;
