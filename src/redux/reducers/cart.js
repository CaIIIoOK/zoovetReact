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
function reduceCartTotal(arr) {
  return arr.reduce((sum, elem) => elem.quantity + sum, 0);
}

function reduceCartPrice(arr) {
  return arr.reduce((sum, elem) => elem.quantity * elem.price + sum, 0);
}

function findProdById(arr, id) {
  return arr.find((elem) => elem.id === id);
}

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
      const goods = findProdById(state.cartGoods, action.goods.id);
      goods === undefined ? state.cartGoods.push(action.goods) : (goods.quantity += 1);
      const totalCount = reduceCartTotal(state.cartGoods);
      const totalPrice = reduceCartPrice(state.cartGoods);
      return {
        ...state,
        cartGoods: state.cartGoods,
        totalCount,
        totalPrice,
      };
    }
    case 'MINUS_CART': {
      const goods = findProdById(state.cartGoods, action.id);
      goods.quantity > 1 && (goods.quantity -= 1);
      const totalCount = reduceCartTotal(state.cartGoods);
      const totalPrice = reduceCartPrice(state.cartGoods);
      return {
        ...state,
        cartGoods: state.cartGoods,
        totalCount,
        totalPrice,
      };
    }
    case 'PLUS_CART': {
      const goods = findProdById(state.cartGoods, action.id);
      goods.quantity += 1;
      const totalCount = reduceCartTotal(state.cartGoods);
      const totalPrice = reduceCartPrice(state.cartGoods);
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
