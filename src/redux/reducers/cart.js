const initialState = {
  cartStatus: false,
  cartGoods: [],
  totalCount: 0,
  totalPrice: 0,
};

// class CartProd {
//   constructor(price, name, id, img) {
//     this.price = price;
//     this.name = name;
//     this.id = id;
//     this.img = img;
//     this.quantity = 1;
//   }
//   price;
//   name;
//   id;
//   img;
//   quantity = 0;

//   getTotalPricee() {
//     return this.price * this.quantity;
//   }
// }

const cartReduce = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CART':
      return {
        ...state,
        cartStatus: action.open,
      };
    case 'CLOSE_CART':
      return {
        ...state,
        cartStatus: action.close,
      };
    case 'ADD_GOODS_CART': {
      const goods = state.cartGoods.find((elem) => elem.id === action.goods.id);
      goods === undefined ? state.cartGoods.push(action.goods) : (goods.quantity += 1);
      const totalCount = state.cartGoods.reduce((sum, elem) => elem.quantity + sum, 0);
      const totalPrice = state.cartGoods.reduce((sum, elem) => elem.quantity * elem.price + sum, 0);

      return {
        ...state,
        cartGoods: state.cartGoods,
        totalCount,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

export default cartReduce;
