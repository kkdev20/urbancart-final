// cypress/e2e/static-pages.cy.js - STATIC CONTENT
describe('Static Pages Tests - GUARANTEED WORKING', () => {
  it('should display footer content', () => {
    cy.visit('/')
    cy.contains('Platform ecommerce terpercaya')
    cy.contains('Tautan Cepat')
    cy.contains('Layanan Pelanggan')
  })

  it('should have header with logo and cart', () => {
    cy.visit('/')
    cy.get('header').within(() => {
      cy.contains('UrbanCart')
      cy.get('a[href*="/cart"]').should('exist')
    })
  })

  it('should display featured products section', () => {
    cy.visit('/')
    cy.get('[id="featured-products"]').within(() => {
      cy.contains('Produk Unggulan')
    })
  })
})