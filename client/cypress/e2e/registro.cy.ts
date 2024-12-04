describe('Registro de Usuário', () => {
  beforeEach(() => {
    // Visita a página de registro
    cy.visit('http://localhost:3000/registro')
  })

  it('Deve mostrar mensagem de erro se os campos estiverem vazios ao submeter', () => {
    cy.get('button[type="submit"]').click()
    cy.contains('Todos os campos são obrigatórios.')
  })

  it('Deve mostrar mensagem de erro para email inválido', () => {
    cy.get('[data-test="email"]').type('emailinvalido')
    cy.get('[data-test="senha"]').type('senha123')
    cy.get('[data-test="csenha"]').type('senha123')
    cy.get('button[type="submit"]').click()
    cy.contains('Por favor, insira um email válido.')
  })

  it('Deve mostrar mensagem de erro se a senha for curta', () => {
    cy.get('[data-test="email"]').type('usuario@example.com')
    cy.get('[data-test="senha"]').type('123')
    cy.get('[data-test="csenha"]').type('123')
    cy.get('button[type="submit"]').click()
    cy.contains('A senha deve ter pelo menos 6 caracteres.')
  })

  it('Deve mostrar mensagem de erro se as senhas não coincidirem', () => {
    cy.get('[data-test="email"]').type('usuario@example.com')
    cy.get('[data-test="senha"]').type('senha123')
    cy.get('[data-test="csenha"]').type('diferente123')
    cy.get('button[type="submit"]').click()
    cy.contains('As senhas não coincidem.')
  })

  it('Deve registrar usuário com dados válidos e mostrar mensagem de sucesso', () => {
    cy.get('[data-test="email"]').type('usuario@example.com')
    cy.get('[data-test="senha"]').type('senha123')
    cy.get('[data-test="csenha"]').type('senha123')
    cy.get('button[type="submit"]').click()
    cy.contains('Sua conta foi criada com sucesso!')
  })
})
