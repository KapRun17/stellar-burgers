import Cypress from 'cypress';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const ID_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const ID_ANOTHER_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const ID_FILLING = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;

beforeEach(() => {
  cy.intercept('GET', `${BASE_URL}/ingredients`, { fixture: 'ingredients.json' });
  cy.intercept('POST', `${BASE_URL}/auth/login`, { fixture: 'user.json' });
  cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' });
  cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'orderResponse.json' });

  cy.visit('/');
  cy.viewport(1440, 800);
  cy.get('#modals').as('modal');
});

describe('Добавление ингредиентов в заказ', () => {
  it('Увеличение счётчика ингредиента при добавлении', () => {
    cy.get(ID_FILLING).children('button').click();
    cy.get(ID_FILLING).find('.counter__num').contains('1');
  });

  describe('Добавление булок и начинок', () => {
    it('Добавление булки и начинки в заказ', () => {
      cy.get(ID_BUN).children('button').click();
      cy.get(ID_FILLING).children('button').click();
    });

    it('Добавление булки после добавления начинки', () => {
      cy.get(ID_FILLING).children('button').click();
      cy.get(ID_BUN).children('button').click();
    });
  });

  describe('Замена булки', () => {
    it('Замена одной булки на другую при пустом списке начинок', () => {
      cy.get(ID_BUN).children('button').click();
      cy.get(ID_ANOTHER_BUN).children('button').click();
    });

    it('Замена одной булки на другую при наличии начинки', () => {
      cy.get(ID_BUN).children('button').click();
      cy.get(ID_FILLING).children('button').click();
      cy.get(ID_ANOTHER_BUN).children('button').click();
    });
  });
});

describe('Оформление заказа', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', 'ipsum');
    cy.setCookie('accessToken', 'lorem');
    cy.getAllLocalStorage().should('not.be.empty');
    cy.getCookie('accessToken').should('not.be.empty');
  });

  afterEach(() => {
    window.localStorage.clear();
    cy.clearAllCookies();
    cy.getAllLocalStorage().should('be.empty');
    cy.getAllCookies().should('be.empty');
  });

  it('Отправка заказа и проверка номера заказа', () => {
    cy.get(ID_BUN).children('button').click();
    cy.get(ID_FILLING).children('button').click();
    cy.get(`[data-cy='order-button']`).click();
    cy.get('@modal').find('h2').contains('38483');
  });
});

describe('Модальные окна ингредиентов', () => {
  it('Открытие модального окна с информацией об ингредиенте', () => {
    cy.get('@modal').should('be.empty');
    cy.get(ID_FILLING).children('a').click();
    cy.get('@modal').should('not.be.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa0941');
  });

  it('Закрытие модального окна по нажатию на кнопку закрытия', () => {
    cy.get(ID_FILLING).children('a').click();
    cy.get('@modal').find('button').click();
    cy.get('@modal').should('be.empty');
  });

  it('Закрытие модального окна по нажатию на оверлей', () => {
    cy.get(ID_FILLING).children('a').click();
    cy.get(`[data-cy='overlay']`).click({ force: true });
    cy.get('@modal').should('be.empty');
  });

  it('Закрытие модального окна по нажатию клавиши Escape', () => {
    cy.get(ID_FILLING).children('a').click();
    cy.get('body').trigger('keydown', { key: 'Escape' });
    cy.get('@modal').should('be.empty');
  });
});
