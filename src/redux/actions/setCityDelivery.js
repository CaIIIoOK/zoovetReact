const setCityDelivery = (city) => ({
  type: 'SET_CITY_DELIVERY',
  city,
});

const setDeliveryWarehouse = (warehouse) => ({
  type: 'SET_WAREHOUSE',
  warehouse,
});

const setCityDeliveryJustin = (cityJustin) => ({
  type: 'SET_CITY_DELIVERY_JUSTIN',
  cityJustin,
});

export { setCityDelivery, setDeliveryWarehouse, setCityDeliveryJustin };
