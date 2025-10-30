// cypress/e2e/basic.cy.js
describe('UrbanCart Basic Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load homepage successfully', () => {
    cy.contains('UrbanCart')
    cy.contains('Selamat Datang di UrbanCart')
  })

  it('should navigate to products page', () => {
    cy.contains('Jelajahi Semua Produk').click()
    cy.url().should('include', '/products')
  })

  it('should search for products', () => {
    cy.get('input[placeholder*="Cari produk"]').type('electronics{enter}')
    cy.url().should('include', '/search?q=electronics')
  })
})