// компонент страницы изменения профиля
import './Profile.css';

function Profile() {
  return(
    <section className="profile">
      <h2 className="profile__header">Привет, Виталий!</h2>
      <form className="profile__form">
        <div className="profile__form-wrap">
          <label for="name" className="profile__label">Имя</label>
          <input
            id="name" 
            name="name" 
            type="name"
            minLength="2"
            maxLength="30"
            defaultValue={"Виталий" || ""}
            className="profile__form-input"
            required
          />
        </div>
        <div className="profile__form-wrap">
          <label for="email" className="profile__label">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={"pochta@yandex.ru" || ""}
            className="profile__form-input"
            required
          />
        </div>
      </form>

      <button type="button" className="profile__edit-button button">Редактировать</button>
      <button type="button" className="profile__exit-button">Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;