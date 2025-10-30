// cypress/support/e2e.js
// Import commands.js or define commands here
Cypress.Commands.add('addProductToCart', (productId = 1) => {
  cy.visit(`/products/${productId}`)
  cy.contains('Tambah ke Keranjang').click()
  cy.contains('Ditambahkan', { timeout: 10000 })
})