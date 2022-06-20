import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchCategory from '../back-end-request/fetchCategory';
import fetchNewProduct from '../back-end-request/fetchNewProduct';

const NewGoodsModal = (props) => {
  const dispatch = useDispatch();
  const newModalRef = React.useRef();
  const { categorysName } = useSelector(({ categorys }) => categorys);

  const closeModal = () => {
    return props.modalShow(false);
  };
  React.useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const addNewProd = () => {
    if (
      newModalRef.current.category.value === '' ||
      newModalRef.current.image.value === '' ||
      newModalRef.current.nameProd.value === '' ||
      newModalRef.current.codeProd.value === '' ||
      newModalRef.current.price.value === '' ||
      newModalRef.current.availability.value === '' ||
      newModalRef.current.producer.value === '' ||
      newModalRef.current.producingCountry.value === '' ||
      newModalRef.current.description.value === ''
    ) {
      alert('Усі поля повинні бути заповнені');
      return;
    }

    const newProd = {
      categoryID: newModalRef.current.category.value,
      categoryName: newModalRef.current.category.selectedOptions[0].label,
      image: newModalRef.current.image.value,
      name: newModalRef.current.nameProd.value,
      code: newModalRef.current.codeProd.value,
      price: newModalRef.current.price.value,
      availability: newModalRef.current.availability.value,
      description: newModalRef.current.description.value,
      producer: newModalRef.current.producer.value,
      producingCountry: newModalRef.current.producingCountry.value,
    };
    dispatch(fetchNewProduct(newProd));
  };
  return (
    <>
      <div className="newGoodsModal">
        <i
          className="fas fa-times"
          style={{ position: 'absolute', right: 10, top: 10 }}
          onClick={closeModal}></i>
        <form ref={newModalRef} className="formNewGoods">
          <select defaultValue="" name="category">
            <option value="" label="Оберіть категорію" disabled></option>
            {categorysName.map((item) => {
              return (
                <option
                  value={item.ID_category}
                  key={item.ID_category}
                  label={item.Category_UA}></option>
              );
            })}
          </select>
          <label htmlFor="image">
            Фото товару:
            <input type="text" name="image" />
          </label>
          <label htmlFor="nameProd">
            Назва товару:
            <input type="text" name="nameProd" />
          </label>
          <label htmlFor="codeProd">
            Код товару:
            <input type="text" name="codeProd" />
          </label>
          <label htmlFor="price">
            Ціна:
            <input type="text" name="price" />
          </label>
          <label htmlFor="availability">
            Наявність:
            <input type="text" name="availability" />
          </label>
          <label htmlFor="producer">
            Виробник:
            <input type="text" name="producer" />
          </label>
          <label htmlFor="producingCountry">
            Країна виробник:
            <input type="text" name="producingCountry" />
          </label>
          <label htmlFor="description">
            Опис:
            <textarea type="text" name="description" />
          </label>
        </form>
        <button
          style={{
            textAlign: 'center',
            fontSize: 15,
            padding: 5,
            backgroundColor: 'rgb(64, 252, 233)',
            borderRadius: 10,
            width: 150,
          }}
          onClick={() => addNewProd()}>
          Додати новий товар
        </button>
      </div>
      ;<div className="shadow" onClick={closeModal}></div>
    </>
  );
};

export default NewGoodsModal;
