// import { braintreeTokenController } from '../../controllers/productController';

// describe('braintreeTokenController', () => {
//   let req, res, mockGateway;

//   beforeEach(() => {
//     req = {};
//     res = {
//       send: jest.fn(),
//       status: jest.fn(() => res),
//     };

//     mockGateway = {
//       clientToken: {
//         generate: jest.fn(),
//       },
//     };
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   /**
//    * Test the braintreeTokenController function for generating a client token.
//    */
//   it('should send a Braintree client token when successful', async () => {
//     // Configure the mock clientToken generation
//     mockGateway.clientToken.generate.mockImplementation((_, callback) => {
//       callback(null, 'mockedClientToken');
//     });

//     // Call the controller function
//     await braintreeTokenController(req, res, mockGateway);

//     // Assertions
//     expect(res.status).not.toHaveBeenCalled();
//     expect(res.send).toHaveBeenCalledWith('mockedClientToken');
//   });
// });
