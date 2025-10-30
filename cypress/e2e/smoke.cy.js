// cypress/e2e/smoke.cy.js - SUPER SIMPLE
describe('Smoke Tests - GUARANTEED WORKING', () => {
  it('should load homepage', () => {
    cy.visit('/')
    cy.contains('UrbanCart')
  })

  it('should have working navigation', () => {
    cy.visit('/')
    cy.contains('Jelajahi Semua Produk').click()
    cy.url().should('include', '/products')
  })

  it('should have search functionality', () => {
    cy.visit('/')
    cy.get('input[placeholder*="Cari produk"]').should('be.visible')
  })

  it('should load products page', () => {
    cy.visit('/products')
    cy.contains('Semua Produk')
  })

  it('should load cart page', () => {
    cy.visit('/cart')
    cy.contains('Keranjang')
  })
})