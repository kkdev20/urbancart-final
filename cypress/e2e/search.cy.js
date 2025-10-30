// cypress/e2e/search.cy.js - FIXED
describe('Search Functionality Tests - WORKING', () => {
  it('should search for products', () => {
    cy.visit('/')
    
    // Search for electronics
    cy.get('input[placeholder*="Cari produk"]').type('electronics{enter}')
    cy.url().should('include', '/search?q=electronics')
  })

  it('should clear search input', () => {
    cy.visit('/')
    cy.get('input[placeholder*="Cari produk"]').type('test')
    
    // Clear search
    cy.get('input[placeholder*="Cari produk"]').clear()
    cy.get('input[placeholder*="Cari produk"]').should('have.value', '')
  })
})