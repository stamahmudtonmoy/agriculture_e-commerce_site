/**
 * Mocked Braintree Gateway for testing purposes.
 * @type {Object}
 */
const mockGateway = {
  clientToken: {
    /**
     * Generates a mocked client token for testing.
     * @function
     * @param {string} _ - A placeholder parameter for the mock.
     * @param {Function} callback - A callback function to handle the generated client token.
     */
    generate: jest.fn((_, callback) => {
      callback(null, 'mockedClientToken');
    }),
  },
};

/**
 * Mocked Braintree module for testing purposes.
 * @type {Object}
 */
export default {
  /**
   * A mocked constructor function for creating a Braintree Gateway instance.
   * @function
   * @returns {Object} Mocked Braintree Gateway instance.
   */
  BraintreeGateway: jest.fn(() => mockGateway),
  Environment: {
    Sandbox: 'sandbox',
  },
};
