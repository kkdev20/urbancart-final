// cypress/e2e/cart-simple.cy.js
describe('Simple Cart Tests - WORKING', () => {
  it('should show empty cart state', () => {
    cy.visit('/cart')
    cy.contains('Keranjang Anda kosong')
    cy.contains('Lanjutkan Belanja').should('exist')
  })

  it('should navigate from cart back to home', () => {
    cy.visit('/cart')
    cy.contains('Lanjutkan Belanja').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})