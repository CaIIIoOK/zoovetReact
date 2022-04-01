const initialState = {
  cartStatus: false,
  cartGoods: {},
  totalCount: 0,
  totalPrice: 0,
};
const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

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
      const currentGoodsItem = !state.cartGoods[action.goods.id]
        ? [action.goods]
        : [...state.cartGoods[action.goods.id].cartGoods, [action.goods]];

      const newGoods = {
        ...state.cartGoods,
        [action.goods.id]: {
          cartGoods: currentGoodsItem,
          totalPrice: [].concat
            .apply([], currentGoodsItem)
            .reduce((sum, obj) => obj.price + sum, 0),
        },
      };

      const cartGoods = Object.values(newGoods).map((obj) => obj.cartGoods);
      const allGoods = [].concat.apply([], cartGoods);
      const totalPrice = allGoods.reduce((sum, obj) => obj.price + sum, 0);

      console.log(allGoods);
      return {
        ...state,
        cartGoods: newGoods,
        totalCount: allGoods.length,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

export default cartReduce;
