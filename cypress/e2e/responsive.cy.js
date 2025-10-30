// cypress/e2e/responsive.cy.js
describe('Responsive Design Tests - WORKING', () => {
  it('should be responsive on mobile', () => {
    cy.viewport('iphone-x')
    cy.visit('/')
    
    cy.contains('UrbanCart').should('be.visible')
    cy.contains('Selamat Datang di UrbanCart').should('be.visible')
  })

  it('should display mobile layout on products page', () => {
    cy.viewport('iphone-x')
    cy.visit('/products')
    
    cy.contains('Semua Produk').should('be.visible')
    cy.contains('Filter').should('be.visible')
  })

  it('should maintain functionality on tablet', () => {
    cy.viewport('ipad-2')
    cy.visit('/')
    
    cy.contains('Jelajahi Semua Produk').click()
    cy.url().should('include', '/products')
  })
})