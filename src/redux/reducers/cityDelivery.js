const initialState = {
  city: [],
  cityJustin: [],
  warehouse: [],
};

const cityDelivery = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CITY_DELIVERY':
      return {
        ...state,
        city: action.city,
      };
    case 'SET_CITY_DELIVERY_JUSTIN':
      return {
        ...state,
        cityJustin: action.cityJustin,
      };
    case 'SET_WAREHOUSE':
      return {
        ...state,
        warehouse: action.warehouse,
      };

    default:
      return state;
  }
};

export default cityDelivery;
