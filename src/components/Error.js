function Error() {
  return (
    <div className="errors" style={{ margin: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Ошибка 404</h1>
      <span>
        Возможно, Вы ввели некорректно URL адресс , пожалуйста вернитесь на главную страницу.
      </span>
    </div>
  );
}

export default Error;
