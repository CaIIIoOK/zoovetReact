import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import fetchRandomGoods from '../back-end-request/fetchRandomGoods';
import Slider from 'react-slick';

function Main() {
  const dispatch = useDispatch();
  const { randomGoods } = useSelector(({ getGoods }) => getGoods);
  React.useEffect(() => {
    dispatch(fetchRandomGoods());
  }, []);
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'grey', borderRadius: 50, paddingTop: 1 }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'grey', borderRadius: 50, paddingTop: 1 }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="main-page">
      <div className="wraper_for_slider">
        <div className="slider">
          <Slider {...settings}>
            <div>
              <img src="./img/slider_1.jpg" alt="" />
            </div>
            <div>
              <NavLink to="/categorys">
                <img src="./img/slider-categoryUkr.jpg" alt="" />
              </NavLink>
            </div>
            <div>
              <NavLink to="/delivery_info">
                <img src="./img/slider_delivery.jpg" alt="" />
              </NavLink>
            </div>
          </Slider>
        </div>
      </div>
      <div className="wraper_for_random_goods">
        <h4>Товари які можуть вас зацікавити:</h4>
        <div className="main_random_goods">
          {randomGoods.length !== 0
            ? randomGoods.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={item.availability === 1 ? 'randomProd' : 'availability randomProd'}>
                    <NavLink to={'/goods-solo?&id=' + item.id}>
                      <img src={item.Img_prod} alt="Img_prod" />
                      <div className="price-name-price random_name_price">
                        <p>
                          Ціна: <b>{item.Price_prod}</b> грн.
                        </p>
                        <p>{item.Name_prod_ua}</p>
                      </div>
                    </NavLink>
                  </div>
                );
              })
            : ''}
        </div>
      </div>
      <section className="main-page-text">
        <center>
          <h4> ШАНОВНІ КЛІЄНТИ ! УВАЖНО ЧИТАЙТЕ УМОВИ ОФОРМЛЕННЯ ТА ВІДПРАВЛЕННЯ ЗАМОВЛЕНЬ.</h4>
        </center>
        <center>
          <p>Інтернет магазин Зооветагро</p>
        </center>
        <p>
          Умови безкоштовної доставки: обмовляється, при сумі замовлення від 3000грн (вага товару до
          5кг)
        </p>
        <p>
          Важливо – ми страхуємо ваші замовлення при надсиланні нової пошти. Кожна тисяча гривень
          страховки - це плюс 5грн до вартості доставки. Справа в тому, що товар дуже часто б'ється,
          псується, губиться і тд.
        </p>
        <p>
          Наприклад, флакон коштує 1000грн, ви зробили передоплату та за доставку без страховки ви
          заплатіть 35-40 грн. Якщо ми застрахуємо товар на 1000грн (оцінна вартість), то доставка
          коштуватиме 37-42грн. Якщо ви не бажаєте страхувати товар, просто скажіть нам чи вкажіть у
          коментарях. Замовлення без зазначення цієї інформації будуть страхуватися автоматично.
          Особливо, якщо це флакони, скло та інший крихкий товар.
        </p>
        <p>
          Також, зверніть увагу, ваші замовлення застраховані. Не соромтеся на пошті, якщо щось
          трапилося, дізнаватися про стан ваших замовлень. Усі перевіряйте при працівниках пошти.
          Зрозумійте, якщо трапився бій, наприклад, і ви промовчали при отриманні, то вдома ми вже
          нічого не доведемо. Все псування товару – це проблема перевізника. Не перекладайте все це
          на наші з вами плечі!
        </p>
        <b>
          <p>Повернення та обміну немає!</p>
        </b>
        <p>Замовлення приймаємо з 09-00 до 18,00, у робочі дні</p>
        <p>1. Відправлення товару: 1-3ня</p>
        <p>
          2. Чому у нас найприємніші ціни на ветеринарні препарати? Ми працюємо безпосередньо з
          виробниками ветеринарних препаратів - українськими та зарубіжними.
        </p>
        <p>
          3. При нескладних випадках хвороби тварин ми надаємо безкоштовні консультації. Зрозумійте
          нас правильно, якщо ваш улюблений вихованець сильно захворів, то онлайн-консультація – це
          ще більших збитків вашому вихованцю. А ось порадити хороші краплі від бліх чи таблетки від
          глистів, ми з радістю допоможемо.
        </p>
        <p>4. Для власників ВРХ та свиней за потребою можемо надати схему вирощування тварин.</p>
        <p>
          5. Якщо ви хочете купити ветеринарні препарати за гарною ціною, то вам потрібне до нас! У
          нас приємні ціни на ветеринарні препарати
        </p>
        <p>
          При виявленні шлюбу або пересортиці - ТІЛЬКИ В ОФІСІ ПЕРЕВЕЗЕННЯ - ви повинні скласти акт
          про виявлення дефекту. Обов'язково потрібно повідомити нас про такі випадки.
        </p>
        <p>
          Магазин залишає за собою право скасувати замовлення або не виконувати його без пояснень
          причини.
        </p>
        <b>
          <p>Способи оплати:</p>
        </b>
        <p>Переплата на картку Приват Банку</p>
        <p>Накладений платіж (Нова Пошта додатково стягує 20 грн. + 2% за пересилання грошей)</p>
      </section>
    </div>
  );
}

export default Main;
