const initialState = {
  cartGoods: [],
  totalCount: 0,
  totalPrice: 0,
};

function reduceCartTotal(arr) {
  return arr.reduce((sum, elem) => elem.quantity + sum, 0);
}

function reduceCartPrice(arr) {
  return arr.reduce((sum, elem) => elem.quantity * elem.price + sum, 0);
}

function findProdById(arr, id) {
  return arr.find((elem) => elem.id === id);
}

function toTrashFilter(arr, id) {
  return arr.filter((elem) => elem.id !== id);
}

const cartReduce = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GOODS_CART': {
      const goods = findProdById(state.cartGoods, action.goods.id);
      goods === undefined ? state.cartGoods.push(action.goods) : (goods.quantity += 1);
      state.cartGoods.map((item) => (item.isInCart = true));
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
    case 'TO_TRASH': {
      var newArray = toTrashFilter(state.cartGoods, action.id);
      const totalCount = reduceCartTotal(newArray);
      const totalPrice = reduceCartPrice(newArray);
      return {
        ...state,
        cartGoods: newArray,
        totalCount,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

export default cartReduce;
