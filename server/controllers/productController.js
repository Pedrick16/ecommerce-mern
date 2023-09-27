const Product = require('../model/product')

const getAllProducts = async(request, response) => {
    try {
        const allProducts = await Product.find().sort({ _id: -1 })
        return response.json(allProducts)
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Internal Server Error' });
    }

}

const getActiveproducts = async(request, response) => {
    try {
        const allProducts = await Product.find({status:'active'}).sort({ _id: -1 })
        return response.json(allProducts)
    } catch (error) {
        console.log(error)
        response.status(500).json({ error: 'Internal Server Error' });
    }

}



const AddProduct = async (request, response) => {
    const { product_name, description, price, status } = request.body;

    try {
        // Assuming Product is a model or schema for your database
        const product = new Product({
            product_name,
            description,
            price,
            status
          
        });

       
        await product.save();

       
        return response.json(product);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProduct = async (request, response) => {
    try {
      const item = await Product.findById(request.params.id); 
      if (!item) {
        return response.status(404).json({ message: 'Item not found' }); 
      }
      response.json(item);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server error' });
    }
  };

  
  const EditProduct = async (request, response) => {
    try {
      const item = await Product.findById(request.params.id); 
      if (!item) {
        return response.status(404).json({ message: 'Item not found' }); 
      }
      response.json(item);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Server error' });
    }
  };

  const UpdateProduct = async (request, response) => {
    const productId = request.params.id;
    const { product_name, description, price, status } = request.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                product_name,
                description,
                price,
                status
            },
            { new: true } 
        );

        if (!updatedProduct) {
            return response.status(404).json({ message: 'Product not found' });
        }

        response.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Server error' });
    }
};

const DeleteProduct = async (request, response) => {
    const id = request.params.id;
  
    try {
      // Create a filter object to match the document by its _id field.
      const filter = { _id: id};
      
      // Assuming that Product is your MongoDB collection.
      const result = await Product.deleteOne(filter);
  
      if (result.deletedCount === 1) {
        console.log(`Deleted product with _id: ${id}`);
        response.json({ message: 'Product deleted successfully' });
      } else {
        console.log(`No product found with _id: ${id}`);
        response.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  





 







module.exports = {
    getAllProducts,
    AddProduct,
    getProduct,
    getActiveproducts,
    EditProduct,
    UpdateProduct,
    DeleteProduct

  
}