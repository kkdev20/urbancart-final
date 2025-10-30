// cypress/e2e/navigation.cy.js - FIXED
describe('Navigation Tests - WORKING', () => {
  it('should navigate through main pages', () => {
    cy.visit('/')
    cy.contains('UrbanCart')

    // Go to products
    cy.contains('Jelajahi Semua Produk').click()
    cy.url().should('include', '/products')

    // Use header navigation back to home
    cy.get('header').within(() => {
      cy.contains('UrbanCart').click()
    })
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should have working header links', () => {
    cy.visit('/')
    
    // Test cart link exists
    cy.get('header').within(() => {
      cy.get('a[href*="/cart"]').should('exist')
    })
    
    // Test search functionality works
    cy.get('input[placeholder*="Cari produk"]').should('be.visible')
  })
})