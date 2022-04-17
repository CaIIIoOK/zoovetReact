const setCityDelivery = (city) => ({
  type: 'SET_CITY_DELIVERY',
  city,
});

const setDeliveryWarehouse = (warehouse) => ({
  type: 'SET_WAREHOUSE',
  warehouse,
});

export { setCityDelivery, setDeliveryWarehouse };
