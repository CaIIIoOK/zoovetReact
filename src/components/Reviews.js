import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import fetchSetReviews from '../back-end-request/fetchSetReviews';
import fetchReviews from '../back-end-request/fetchReviews';
import ReCAPTCHA from 'react-google-recaptcha';
import fetchDeleteReview from '../back-end-request/fetchDeleteReview';

const Reviews = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = React.useState(false);
  const textRef = React.useRef();
  const { name, secondname, email, permission } = useSelector(
    ({ userDataReduser }) => userDataReduser,
  );
  const { reviews } = useSelector(({ getGoods }) => getGoods);
  const [btnAct, setBtnAct] = React.useState(true);
  React.useEffect(() => {
    dispatch(fetchReviews(props.id));
  }, []);
  let [cookie, ,] = React.useState(
    document.cookie.replace(/(?:(?:^|.*;\s*)user\s*=\s*([^;]*).*$)|^.*$/, '$1'),
  );
  const sendReview = () => {
    const data = {
      textValue: textRef.current.value,
      user: cookie,
      idProd: props.id,
      name: name + ' ' + secondname,
    };
    dispatch(fetchSetReviews(data));
  };

  const onChange = () => {
    setBtnAct(false);
  };
  const deleteReview = (id) => {
    let conf = window.confirm('Ви впевнені що хочете видалити відгук?');
    if (conf) {
      dispatch(fetchDeleteReview(id));
    } else {
      return;
    }
  };
  return (
    <div className="reviews">
      <div className="button_block">
        <p>Залишити відгук про цей товар</p>
        <button className="review_btn" onClick={() => setShowModal(true)}>
          Залишити відгук
        </button>
      </div>
      {showModal && (
        <>
          {cookie !== '' ? (
            <div className="review_modal">
              <i
                className="fas fa-times"
                onClick={() => setShowModal(false)}
                style={{ position: 'absolute', right: 10, cursor: 'pointer' }}></i>
              <h3>Написати відгук</h3>
              <div className="modal_container">
                <p>Коментарій:</p>
                <textarea ref={textRef}></textarea>
                <label htmlFor="userName">
                  Ваше імя і прізвище
                  <input
                    type="text"
                    name="userName"
                    defaultValue={name + ' ' + secondname}
                    readOnly
                  />
                </label>
                <label htmlFor="userName">
                  Електронна адреса
                  <input type="text" name="email" defaultValue={email} readOnly />
                </label>
                <div className="modal_buttons">
                  <button
                    onClick={() => setShowModal(false)}
                    style={{ backgroundColor: 'grey', opacity: 0.7 }}>
                    Відміна
                  </button>
                  <button onClick={() => sendReview()} disabled={btnAct}>
                    Залишити відгук
                  </button>
                </div>
                <div className="recaptcha">
                  <ReCAPTCHA
                    sitekey="6LcrXFQgAAAAANG6VLeB0r1fuo2vkwelxTYZJ_7q"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="review_modal">
              <i
                className="fas fa-times"
                onClick={() => setShowModal(false)}
                style={{ position: 'absolute', right: 10, cursor: 'pointer' }}></i>
              <h3>
                Для того, щоб залишити відгук потрібно бути авторизованим, або{' '}
                <NavLink to={'/registration'}>зареєструватися</NavLink>
              </h3>
            </div>
          )}
          <div className="shadow" onClick={() => setShowModal(false)}></div>
        </>
      )}
      <h4 style={{ textAlign: 'right', width: '70%' }}>Відгуки покупців про "{props.prodName}"</h4>
      {reviews.map((elem) => {
        return (
          <div className="review_block" key={elem.id}>
            <div className="review_user_date">
              {elem.user_name}
              <span style={{ position: 'absolute', right: 5, opacity: 0.5, fontSize: 12 }}>
                {elem.date.slice(0, 10)}
              </span>
              {permission === 'admin' ? (
                <i
                  className="fas fa-trash-alt trash"
                  onClick={() => deleteReview(elem.id)}
                  style={{
                    fontSize: 11,
                    bottom: 3,
                    right: 3,
                    position: 'absolute',
                    cursor: 'pointer',
                  }}></i>
              ) : (
                ''
              )}
            </div>
            <div className="review_text">{elem.review}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
