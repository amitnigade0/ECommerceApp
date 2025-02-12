const { getProduct } = require('../../controllers/productController');
const Product = require('../../models/productModel');
const chai = require('chai');
const sinon = require('sinon');;
const { expect } = chai;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

// Use dynamic imports for ESM packages like chai and sinon-chai
describe('Product controller', () => {

    let productMock;

    beforeEach(() => {
        productMock = {
            id: '66a264c7db23c876182f9c7b',
            title: 'Essence Mascara Lash Princess'
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('Get product', () => {
        it('Should return product for given id', async () => {
            const product = sinon.stub(Product.prototype, 'findById').resolves(productMock);

            const req = { params: { id: '66a264c7db23c876182f9c7b' } };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };

            await getProduct(req, res);
            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(productMock);
        });

        it('Should throw Product not found error', async() => {
            sinon.stub(Product.prototype, 'findById').resolves(undefined);
            const req = { params: { id: '66a264c7db23c876182f9c7b' } };
            const res = {
                status: sinon.spy(),
                json: sinon.spy(),
            };

            await getProduct(req, res);
            expect(res.status).to.have.been.calledWith(404);
        })
    });
});
