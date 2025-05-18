import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems: burgerItems,
  orderRequest,
  price,
  orderModalData: orderInfo,
  onOrderClick,
  closeOrderModal
}) => (
  <section className={styles.burger_constructor}>
    {burgerItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`}>
        <ConstructorElement
          type='top'
          isLocked
          text={`${burgerItems.bun.name} (верх)`}
          price={burgerItems.bun.price}
          thumbnail={burgerItems.bun.image}
        />
      </div>
    ) : (
      <div className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}>
        Выберите булки
      </div>
    )}

    <ul className={styles.elements}>
      {burgerItems.ingredients.length > 0 ? (
        burgerItems.ingredients.map((ingredient: TConstructorIngredient, index: number) => (
          <BurgerConstructorElement
            ingredient={ingredient}
            index={index}
            totalItems={burgerItems.ingredients.length}
            key={ingredient.id}
          />
        ))
      ) : (
        <div className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}>
          Выберите начинку
        </div>
      )}
    </ul>

    {burgerItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`}>
        <ConstructorElement
          type='bottom'
          isLocked
          text={`${burgerItems.bun.name} (низ)`}
          price={burgerItems.bun.price}
          thumbnail={burgerItems.bun.image}
        />
      </div>
    ) : (
      <div className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}>
        Выберите булки
      </div>
    )}

    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='large'
        onClick={onOrderClick}
        data-cy='order-button'
      >
        Оформить заказ
      </Button>
    </div>

    {orderRequest && (
      <Modal onClose={closeOrderModal} title='Оформляем заказ...'>
        <Preloader />
      </Modal>
    )}

    {orderInfo && (
      <Modal
        onClose={closeOrderModal}
        title={orderRequest ? 'Оформляем заказ...' : ''}
      >
        <OrderDetailsUI orderNumber={orderInfo.number} />
      </Modal>
    )}
  </section>
);
